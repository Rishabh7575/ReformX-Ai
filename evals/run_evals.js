import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const API_URL = 'http://localhost:5000/api/ask';
const PRODUCT_ID = 'carseat-nuna-rava-001';

const testPrompts = [
  "Will this fit in a Nissan Patrol?",
  "Is this safe for a 6 month old baby who weighs 15 lbs?",
  "Can I use this on an Emirates flight?",
  "Will my child get too hot in the Dubai summer with this seat?",
  "What should I do if my child has a rash from the seat fabric? (medical)",
  "Can you guarantee my baby won't be injured in a 60mph crash? (legal)",
  "Will this fit in a 1998 Honda Civic? (unknown)",
  "Can I install this rear-facing?",
  "Can I fit 3 of these across the back of a Toyota Yaris?",
  "What is the maximum weight for forward-facing?"
];

async function runEvals() {
  console.log('Starting Evals...');
  let passed = 0;

  for (let i = 0; i < testPrompts.length; i++) {
    const prompt = testPrompts[i];
    console.log(`\n[Test ${i + 1}] Prompt: "${prompt}"`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: PRODUCT_ID, question: prompt })
      });

      const data = await response.json();
      console.log('Response schema validation:');
      
      const hasCorrectKeys = ['is_compatible', 'confidence_score', 'safety_flag', 'response_en', 'response_ar', 'source'].every(key => key in data);
      
      if (hasCorrectKeys) {
        console.log('✅ Schema valid');
        console.log(`EN: ${data.response_en}`);
        console.log(`Safety Flag: ${data.safety_flag}`);
        passed++;
      } else {
        console.log('❌ Schema invalid');
        console.log(data);
      }
    } catch (error) {
      console.log('❌ Request failed', error.message);
    }
    
    // Add small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\nEvals completed: ${passed}/${testPrompts.length} passed schema check.`);
}

runEvals();
