# System Architecture

## Data Flow Overview

Mumz AI PDP Safety Advisor keeps the AI layer from any internet hallucinations by forcing it through a strict RAG process that only works within the context of our e comm product schema.

```
Input -> Backend -> Product Context -> LLM -> JSON -> UI
```

### 1. User Input (UI Layer)
User provides a query about the product (e.g., "Does it fit Nissan Patrol?") from the Product Detail Page. Langage is detected via `i18next` library.

### 2. Backend (Node/Express)
Express backend receives the `POST /api/ask` endpoint request.
- **Rate Limiting**: Check `express-rate-limit` for protection against abuses.
- **Validation**: Cuts off queries over 500 characters long.
- **Safety Pre-Check**: Detects trigger words such as "rash", "diagnose", "medical". Sets internal `isMedical = true` flag.

### 3. Context Injection (RAG)
Backend pulls up the product schema `product_catalog.json` that has:
- `technical_specs`
- `compatibility`
- `safety_notes`
- `manual_snippets`

And injects it directly into the `System Prompt`.

### 4. LLM Output Generation (OpenRouter)
Backend passes the modified prompt to OpenRouter API with `meta-llama/llama-3.1-8b-instruct`.
- We enforce `response_format: { type: "json_object" }` on LLM.
- In case of failure or timeout from the first-choice model, falls back automatically to `mistralai/mistral-7b-instruct`.

### 5. JSON Parsing & Safety Enforcement
The LLM returns a JSON object.
- The backend parses this JSON.
- **Safety Enforcement**: If `isMedical` was true, the backend overrides the LLM's `safety_flag` to `true` guarnteeing a safe refusal, regardless of what the LLM generated.

### 6. UI Rendering
The frontend receives the JSON and dynamically renders visual Trust Badges (Compatible or Not Compatible), updates the animated Confidence Score progress bar, and displays the Arabic or English text depending on the user's toggle state.
