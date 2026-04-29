import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY || "dummy";

export const askQuestion = async (req, res, products) => {
  // If no productId is passed, default to the first product
  const productId = req.body.productId || (products.length > 0 ? products[0].id : null);
  const { question, lang = 'en' } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'question is required' });
  }

  const product = products.find(p => String(p.id) === String(productId)) || products[0];
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  console.log(`\n[AI REQUEST] Incoming question: "${question}"`);

  // Advanced Safety Pre-check
  const questionLower = question.toLowerCase();
  const medicalKeywords = ['rash', 'cure', 'medical', 'injury', 'diagnose', 'treatment', 'health', 'doctor'];
  const isMedical = medicalKeywords.some(kw => questionLower.includes(kw));

  // 1) Rule-Based Safety Interception
  // Immediately block dangerous queries before even hitting the LLM
  if (isMedical) {
    console.log(`[AI SAFETY] Intercepted medical query: "${question}"`);
    return res.json({
      is_compatible: null,
      confidence_score: 95,
      safety_flag: true,
      response_en: "I cannot provide medical advice. Please consult a qualified pediatrician.",
      response_ar: "لا أستطيع تقديم نصيحة طبية. يرجى استشارة طبيب أطفال مؤهل.",
      source: "safety-policy"
    });
  }

  const systemPrompt = `You are a safety-first ecommerce AI assistant for parents.
You are evaluating: ${product.product_name} (${product.brand}).

--- PRODUCT CONTEXT ---
Specs: ${JSON.stringify(product.technical_specs)}
Compatibility: ${JSON.stringify(product.compatibility)}
Climate Notes: ${product.climate_notes}
Safety Notes: ${product.safety_notes}
Manual: ${JSON.stringify(product.manual_snippets)}
Reviews: ${JSON.stringify(product.customer_reviews)}
-----------------------

INSTRUCTIONS:
1. Answer ONLY using provided product context.
2. Never hallucinate.
3. If context is missing, clearly state that it is unknown and set confidence_score lower (e.g., 50).
4. For exaggerated claims like "safest in world": respond carefully with uncertainty.

STRICT JSON OUTPUT ONLY:
{
  "is_compatible": true | false | null,
  "confidence_score": <0-100>,
  "safety_flag": <boolean>,
  "response_en": "<clear grounded answer in English>",
  "response_ar": "<natural Arabic translation>",
  "source": "<spec/manual/review/unknown>"
}`;

  const makeOpenRouterRequest = async (modelName) => {
    console.log(`[AI REQUEST] Using model: ${modelName}`);
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Mumz AI PDP Safety Advisor",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Question (preferred language: ${lang}): ${question}` }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API Error (${response.status}): ${errText}`);
    }

    return response.json();
  };

  try {
    let data;
    try {
      // Primary model
      data = await makeOpenRouterRequest("meta-llama/llama-3.1-8b-instruct");
    } catch (primaryErr) {
      console.error(`[AI ERROR] Primary model failed:`, primaryErr.message);
      // Fallback model
      data = await makeOpenRouterRequest("mistralai/mistral-7b-instruct");
    }

    const aiMessage = data.choices[0].message.content;
    console.log(`[AI RESPONSE] Raw response:\n${aiMessage}`);

    let jsonResponse;
    try {
        jsonResponse = JSON.parse(aiMessage);
    } catch(e) {
        const cleaned = aiMessage.replace(/```json/g, '').replace(/```/g, '').trim();
        jsonResponse = JSON.parse(cleaned);
    }

    console.log(`[AI SUCCESS] Parsed JSON:\n`, JSON.stringify(jsonResponse, null, 2));
    if (!res.headersSent) {
      return res.json(jsonResponse);
    }

  } catch (error) {
    console.error("[AI FATAL ERROR] All OpenRouter requests failed:", error.message);
    
    
    // Fallback safe response with safety patch
    if (!res.headersSent) {
      return res.status(500).json({
        is_compatible: null,
        confidence_score: 0,
        safety_flag: isMedical,
        response_en: isMedical 
            ? "I cannot provide medical advice. Please consult a pediatrician." 
            : "Service temporarily unavailable. Please try again later.",
        response_ar: isMedical
            ? "لا يمكنني تقديم استشارة طبية. يرجى استشارة طبيب أطفال."
            : "الخدمة غير متوفرة مؤقتاً. يرجى المحاولة مرة أخرى لاحقاً.",
        source: "error_fallback"
      });
    }
  }
};
