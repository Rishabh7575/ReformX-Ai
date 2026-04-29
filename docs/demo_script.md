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
> *"The main danger with AI for ecommerce is generating hallucinated medical advice. I created a hardcoded safety interception mechanism."*
- Type: **"I have a rash on my baby. Does this cloth treat the rash?"**
- Hit Enter.
- When the response comes, click the red **SAFETY WARNING** message in the chat.
- *"The server detected the medical terminology, identified it, and gracefully denied it to protect the company from any potential liability issues. In order to test this feature thoroughly at a large scale, I developed a completely automated Node evaluation framework, which evaluates 10 corner cases against the API."*

**End of Presentation.**