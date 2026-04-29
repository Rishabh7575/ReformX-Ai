# 2-Minute Recruiter Demo Walkthrough

**Goal:** Demonstrate full-stack capability, product-minded UX, and safe AI integration to a recruiter or engineering manager.

## Setup Before Demo
1. Have the Backend running in terminal 1 (`npm run dev`).
2. Have the Frontend running in terminal 2 (`npm run dev`).
3. Have the browser open to `http://localhost:5173`.
4. Open the Backend terminal window on the side so they can see logs streaming in real time.

## 0:00 - 0:30 | The Problem & The UI
> *"Hi! I built the Mumz AI Safety Advisor. The problem with baby ecommerce is that parents suffer extreme anxiety over safety and vehicle compatibility. Static manuals don't help. This is a premium Product Details Page I designed using React and Tailwind to solve that."*
- Scroll through the beautiful UI. Point out the rounded cards, the "Trust Badges", and expand the "Technical Specs" to show the rich product data.

## 0:30 - 1:00 | The RAG Chat Widget
> *"On the right is our embedded AI Advisor. It's not a generic chatbot. It uses RAG (Retrieval-Augmented Generation) constrained strictly to the product specs on the left."*
- Click the suggested prompt: **"Will this fit Nissan Patrol?"**
- Watch the animated loading dots.
- Point to the backend terminal: *"You can see the backend routing the query to LLaMA 3.1 via OpenRouter, injecting the specific product manual into the prompt."*
- Look at the UI when it responds. Point out the **"Compatible" Badge**, the high **Confidence Score** bar, and the **Source** citation. 

## 1:00 - 1:30 | The Bilingual Capabilities
> *"Because this targets the Middle East, localization is essential."*
- Scroll up to the navbar and click **العربية (AR)**.
- Show how the entire UI flips to RTL (Right-to-Left) and the AI text instantly shows the Arabic translation (which was generated simultaneously in the same JSON payload).
- Flip back to **English (EN)**.

## 1:30 - 2:00 | The Medical Safety Guardrails
> *"The biggest risk with AI in ecommerce is hallucinating medical advice. I built a hardcoded safety interception layer."*
- Type: **"My baby has a rash, will this fabric cure it?"**
- Hit Enter.
- When it replies, point to the red **SAFETY WARNING** banner in the chat.
- *"The backend intercepted the medical keywords, flagged it, and forced a graceful refusal, protecting the brand from legal liability. To ensure this works reliably at scale, I also built a fully automated Node evaluation engine that tests 10 edge cases against the API."*

**End of Demo.**
