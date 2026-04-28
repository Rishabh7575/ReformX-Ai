import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "dummy",
});

export const askQuestion = async (req, res, products) => {
  // If no productId is passed, default to the first product to support Phase 2 easy testing
  const productId = req.body.productId || (products.length > 0 ? products[0].id : null);
  const { question, lang = 'en' } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'question is required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const systemPrompt = `You are a strict, professional AI Safety Advisor for a premium baby product ecommerce store.
You are evaluating the product: ${product.product_name} (${product.brand}).

--- PRODUCT DATA CONTEXT ---
Technical Specs: ${JSON.stringify(product.technical_specs)}
Compatibility: ${JSON.stringify(product.compatibility)}
Climate Notes: ${product.climate_notes}
Safety Notes: ${product.safety_notes}
Manual Snippets: ${JSON.stringify(product.manual_snippets)}
Customer Reviews: ${JSON.stringify(product.customer_reviews)}
----------------------------

INSTRUCTIONS:
1. Retrieval-Augmented Generation (RAG): Answer ONLY using the provided Product Data Context. Do not hallucinate or use outside knowledge.
2. If the answer is unknown or not explicitly covered in the data, clearly state it is unknown and set "is_compatible" to null.
3. Safety Refusal Handling:
   - Medical / Health Advice: Never provide medical advice.
   - Legal Claims: Never make guarantees about crash safety.
   - Dangerous Queries: Any unsafe modifications or usage.
   -> If the user asks a medical, health, or dangerous query, set "safety_flag": true and politely refuse to answer.

STRICT JSON OUTPUT:
You MUST output ONLY a valid JSON object. No markdown, no extra text.
Schema:
{
  "is_compatible": true/false/null,
  "confidence_score": <number 0-100>,
  "safety_flag": <boolean>,
  "response_en": "<clear grounded answer in English>",
  "response_ar": "<natural Arabic translation of the response>",
  "source": "<one of: spec/manual/review/unknown>"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Question (preferred language code: ${lang}): ${question}` }
      ],
      response_format: { type: "json_object" }
    });

    const aiMessage = completion.choices[0].message.content;
    let jsonResponse;
    try {
        jsonResponse = JSON.parse(aiMessage);
    } catch(e) {
        const cleaned = aiMessage.replace(/```json/g, '').replace(/```/g, '').trim();
        jsonResponse = JSON.parse(cleaned);
    }

    res.json(jsonResponse);

  } catch (error) {
    console.error("AI API Error:", error);
    // Strong error handling with fallback JSON
    res.status(500).json({
      is_compatible: null,
      confidence_score: 0,
      safety_flag: false,
      response_en: "I apologize, but I am currently experiencing technical difficulties. Please try again later.",
      response_ar: "أعتذر، لكني أواجه حالياً صعوبات فنية. يرجى المحاولة مرة أخرى لاحقاً.",
      source: "unknown"
    });
  }
};
