# System Architecture

## High-Level Data Flow

The Mumz AI PDP Safety Advisor strictly isolates the AI layer from general internet hallucination by forcing it into a Retrieval-Augmented Generation (RAG) pipeline tightly bound to our e-commerce product schema.

```
Input -> Backend -> Product Context -> LLM -> JSON -> UI
```

### 1. User Input (UI Layer)
The user submits a question from the Product Details Page (e.g., "Will this fit Nissan Patrol?"). The language is also captured via `i18next` state.

### 2. Backend Interception (Node/Express)
The Express backend receives the `POST /api/ask` request.
- **Rate Limiting**: Checks `express-rate-limit` to prevent abuse.
- **Validation**: Prompts over 500 characters are truncated.
- **Safety Pre-check**: If keywords like "rash", "diagnose", or "medical" are found, an internal boolean `isMedical = true` is set.

### 3. Context Injection (RAG)
The backend loads the specific product's schema from `product_catalog.json` which contains:
- `technical_specs`
- `compatibility`
- `safety_notes`
- `manual_snippets`

These are injected directly into the `System Prompt`.

### 4. LLM Generation (OpenRouter)
The backend forwards the augmented prompt to OpenRouter using `meta-llama/llama-3.1-8b-instruct`.
- We force `response_format: { type: "json_object" }` to ensure strict programmatic output.
- If the primary model fails or times out, the backend auto-falls back to `mistralai/mistral-7b-instruct`.

### 5. JSON Parsing & Safety Enforcement
The LLM returns a JSON object.
- The backend parses this JSON.
- **Safety Enforcement**: If `isMedical` was true, the backend overrides the LLM's `safety_flag` to `true` guaranteeing a safe refusal, regardless of what the LLM generated.

### 6. UI Rendering
The frontend receives the JSON and dynamically renders visual Trust Badges (Compatible/Not Compatible), updates the animated Confidence Score progress bar, and displays the Arabic or English text depending on the user's toggle state.
