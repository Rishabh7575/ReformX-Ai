# TRADEOFFS

## Objective

Document the engineering and product decisions made while building MumzMatch under limited time.

---

## Key Decisions

### 1. JSON Catalog Instead of Database

Used a local JSON product catalog for faster prototyping, easier iteration, and simple product grounding.

### 2. Product Detail Page Focus

Focused on the Product Detail Page because it is the highest purchase-intent surface in ecommerce.

### 3. API Model Instead of Training Custom Model

Used LLM APIs through OpenRouter for faster deployment, multilingual support, and lower development overhead.

### 4. Curated Product Set Instead of Full Marketplace

Added selected baby gear products to simulate realistic shopping scenarios while keeping scope manageable.

### 5. Rule-Based Safety Layer + LLM Responses

Combined prompt logic with UI warnings for better handling of medical or uncertain prompts.

---

## Constraints Considered

- Time-boxed assessment timeline
- Need for working end-to-end prototype
- Balance between UI polish and backend intelligence
- Need for multilingual support

---

## If Given More Time

- Connect live inventory APIs
- Personalized recommendations by child age
- Voice assistant support
- Real analytics dashboard
- Deeper Arabic localization
- Admin product management panel

---

## Final Reflection

The goal was to prioritize a functional, user-focused prototype that demonstrates how AI can improve trust and conversions in parenting ecommerce.