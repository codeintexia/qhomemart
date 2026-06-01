# 05 — Hybrid AI Mode

## What Is the Hybrid AI Mode?

MAS QHomemart is designed with a two-mode triage architecture:

| Mode | Description | When Active |
|------|-------------|-------------|
| **Deterministic fallback** | Triage logic runs as a local TypeScript function. Output is reproducible across all environments. | Default — always active in the public demo |
| **LLM-assisted triage** | Optional server-side LLM support can assist interpretation when configured. | Optional — requires `AGENT_EXECUTION_MODE=llm-assisted` and `LLM_*` variables |

The public demo **always uses deterministic fallback** to ensure reproducibility.
No network calls are made during the default demo run.

---

## Architecture

```
CustomerInput
     │
     ▼
┌─────────────────────────────────────────────┐
│  runHybridCustomerTriageAgent()              │
│  agents/customer-triage-agent.ts            │
│                                             │
│  1. runLLMCompletion(input)                │
│     ai/llm-client.ts                       │
│     → reads server-side LLM_* variables     │
│     → if missing: returns null + fallback   │
│     → if present: POST /chat/completions    │
│       model: gemini/gemini-2.0-flash        │
│       temperature: 0.1, max_tokens: 500     │
│     → parse + validate JSON response        │
│     → on any failure: returns null          │
│                                             │
│  2a. candidate is null (fallback):          │
│      runCustomerTriageAgent()  ────────────▶│ HybridTriageOutput
│      (deterministic, sync)                  │  aiMeta.aiMode = "deterministic-fallback"
│                                             │
│  2b. candidate is valid (LLM succeeded):    │
│      normalizeLLMCandidate()   ────────────▶│ HybridTriageOutput
│      (field-by-field merge with fallback)   │  aiMeta.aiMode = "llm-assisted"
└─────────────────────────────────────────────┘
     │
     │ HybridTriageOutput (triage + aiMeta)
     ▼
runBathroomSafetyWorkflowAsync()
  → downstream agents remain deterministic
  → aiMeta propagated to WorkflowRunResult
  → aiMeta.aiMode surfaced in Screen 8 badge
```

> **Note:** The public demo UI uses `runBathroomSafetyWorkflow()` (synchronous,
> deterministic). The LLM-enabled path runs through `runBathroomSafetyWorkflowAsync()`,
> which is designed for use in a server action, API route, or async runtime.
> LLM output is normalized into canonical workflow states so downstream product
> matching, service matching, logs, and analytics remain stable and auditable.

---

## File Map

| File | Role |
|------|------|
| `ai/triage-prompt.ts` | Builds the Indonesian-language chat completion prompt |
| `ai/llm-client.ts` | Safe runtime-aware LLM client; local preview returns deterministic fallback unless provider call is implemented |
| `lib/agent-runtime-config.ts` | Central execution mode and LLM config reader |
| `agents/customer-triage-agent.ts` | `runCustomerTriageAgent()` (sync, deterministic) + `runHybridCustomerTriageAgent()` (async, hybrid) |
| `workflows/bathroom-safety-workflow.ts` | `runBathroomSafetyWorkflow()` (sync, UI-safe) + `runBathroomSafetyWorkflowAsync()` (async, LLM-enabled) |
| `types/mas-types.ts` | `AIMode`, `AIExecutionMetadata`, `LLMTriageCandidate`, `HybridTriageOutput` |
| `scripts/test-sumopod-triage.ts` | Developer test utility — run manually to verify provider connectivity |

---

## Environment Variables

All three variables must be set to enable LLM mode. They are **optional** —
the system works without them.

| Variable | Description | Value |
|----------|-------------|-------|
| `AGENT_EXECUTION_MODE` | Runtime selector | `deterministic` or `llm-assisted` |
| `LLM_API_KEY` | Server-side API key | Your provider key |
| `LLM_BASE_URL` | Provider base URL | OpenAI-compatible base URL |
| `LLM_MODEL` | Model to use | Provider model name |

> **None of these variables are required for the public demo or build.**
> The build passes with zero environment variables configured.

The recommended model is **`gemini/gemini-2.0-flash`** — it is fast, low-cost,
supports large context windows, and handles Indonesian JSON extraction well.

---

## Enabling LLM Mode

### Option A — Shell export (local development)

```bash
export AGENT_EXECUTION_MODE=llm-assisted
export LLM_API_KEY=your_key_here
export LLM_BASE_URL=https://api.sumopod.com/v1
export LLM_MODEL=your-model
npx tsx mas/scripts/test-sumopod-triage.ts
```

### Option B — `.env.local` (Next.js, not committed to git)

```bash
# mas/.env.local  (gitignored)
AGENT_EXECUTION_MODE=llm-assisted
LLM_API_KEY=your_key_here
LLM_BASE_URL=https://api.sumopod.com/v1
LLM_MODEL=your-model
```

> `.env.local` is picked up automatically by Next.js dev server.
> It is excluded from git via `.gitignore` (`*.env.*`).
> **Never commit your API key.**

---

## Testing the Connection

```bash
AGENT_EXECUTION_MODE=llm-assisted \
LLM_API_KEY=your_key \
LLM_BASE_URL=https://api.sumopod.com/v1 \
LLM_MODEL=your-model \
npx tsx mas/scripts/test-sumopod-triage.ts
```

Expected output when LLM succeeds:
```
aiMode      : llm-assisted
aiAvailable : true
aiProvider  : sumopod
aiModel     : gemini/gemini-2.0-flash
problemCategory : [from LLM]
...
```

Expected output when env vars are missing:
```
aiMode      : deterministic-fallback
aiAvailable : false
```

---

## Fallback Behavior

The adapter applies the deterministic fallback in every failure case:

| Scenario | aiMode | aiAvailable |
|----------|--------|-------------|
| Env vars missing | `deterministic-fallback` | `false` |
| HTTP error from provider | `deterministic-fallback` | `false` |
| Empty response content | `deterministic-fallback` | `false` |
| Invalid/incomplete JSON | `deterministic-fallback` | `false` |
| Network exception | `deterministic-fallback` | `false` |
| Valid JSON + all required fields present | `llm-assisted` | `true` |

Individual LLM fields that are present but empty are filled field-by-field
from the deterministic output via `normalizeLLMCandidate()`.

---

## What the Current Demo Shows

Screen 8 ("Log kerja multi-agent") displays a badge showing the triage mode
used in the current run:

- **"Mode: deterministic fallback"** — shown in the public demo (no env vars)
- **"Mode: LLM-assisted triage"** — shown when env vars are set and LLM call succeeds

---

## UI Path vs. LLM Path

| Path | Function | LLM? | Used by |
|------|----------|-------|---------|
| Sync (default) | `runBathroomSafetyWorkflow()` | No | Public demo UI (`app/page.tsx`) |
| Async (LLM-enabled) | `runBathroomSafetyWorkflowAsync()` | Yes | Server actions / API routes (future) |

The public demo UI calls `runBathroomSafetyWorkflow()` at module level —
this is a synchronous call and will always use the deterministic path.
To surface LLM-assisted triage in the UI, integrate `runBathroomSafetyWorkflowAsync()`
into a Next.js Server Action or Route Handler and pass the result to the client.

---

## Safety Limitations

> **This is not a production autonomous AI system.**
> - No real QHomemart production integration.
> - No real inventory, pricing, or WhatsApp API.
> - No guaranteed service availability.
> - LLM output is validated before use; invalid responses fall back to deterministic output.
> - The deterministic fallback ensures the demo always works, regardless of provider status.
> - Do not commit API keys to the repository.
