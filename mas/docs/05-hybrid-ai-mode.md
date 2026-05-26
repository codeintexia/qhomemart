# 05 — Hybrid AI Mode

## What Is the Hybrid AI Mode?

MAS QHomemart is designed with a two-mode triage architecture:

| Mode | Description | When Active |
|------|-------------|-------------|
| **Deterministic fallback** | Triage logic runs as a local TypeScript function. Output is reproducible across all environments. | Default — always active in the public demo |
| **LLM-assisted triage** | An LLM provider classifies the customer's problem and returns structured JSON. | Optional — requires provider environment variables |

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
│  1. getLLMTriageAvailability()              │
│     ai/llm-triage-adapter.ts               │
│     → reads SUMOPOD_API_KEY, etc.           │
│     → returns aiAvailable: true/false       │
│                                             │
│  2a. If not available:                      │
│      runCustomerTriageAgent() ─────────────▶│ HybridTriageOutput
│      (deterministic, sync)                  │  + aiMeta.aiMode = "deterministic-fallback"
│                                             │
│  2b. If available (future):                 │
│      runOptionalLLMTriage()                 │
│      → buildTriagePrompt(input)             │
│        ai/triage-prompt.ts                  │
│      → [provider fetch — not yet impl.]     │
│      → normalize LLM response              │
│      → fallback to deterministic if invalid │
└─────────────────────────────────────────────┘
     │
     │ HybridTriageOutput (triage + aiMeta)
     ▼
runBathroomSafetyWorkflow()
  → all downstream agents remain deterministic
  → aiMeta propagated to WorkflowRunResult
  → aiMeta surfaced in Screen 8 UI badge
```

---

## File Map

| File | Role |
|------|------|
| `ai/triage-prompt.ts` | Builds the Indonesian-language LLM prompt for triage |
| `ai/llm-triage-adapter.ts` | Provider-safe adapter; reads env vars; contains the provider TODO |
| `agents/customer-triage-agent.ts` | `runCustomerTriageAgent()` (sync, deterministic) + `runHybridCustomerTriageAgent()` (async, hybrid) |
| `workflows/bathroom-safety-workflow.ts` | `runBathroomSafetyWorkflow()` (sync, UI-safe) + `runBathroomSafetyWorkflowAsync()` (async, for future LLM) |
| `types/mas-types.ts` | `AIMode`, `AIExecutionMetadata`, `LLMTriageCandidate`, `HybridTriageOutput` |

---

## Environment Variables

All three variables must be set to enable LLM mode. They are **optional** —
the system works without them.

| Variable | Description | Example |
|----------|-------------|---------|
| `SUMOPOD_API_KEY` | API key for the LLM provider | `sk-...` |
| `SUMOPOD_BASE_URL` | Base URL of the provider endpoint | `https://api.example.com` |
| `SUMOPOD_MODEL` | Model identifier | `llama-3-8b-instruct` |

> **None of these variables are required for the public demo or build.**
> The build passes with zero environment variables configured.

---

## Adding a Provider Implementation

When a finalized provider API contract is available:

1. Open `ai/llm-triage-adapter.ts`
2. Find the `TODO: Provider implementation` comment block
3. Replace the placeholder `return` with the actual `fetch()` call
4. Validate the LLM JSON response against `LLMTriageCandidate`
5. The rest of the pipeline picks it up automatically

No other files need to change. The downstream agents remain deterministic.

---

## What the Current Demo Shows

Screen 8 ("Log kerja multi-agent") displays a badge showing the triage mode
used in the current run:

- **"Mode: deterministic fallback"** — always shown in the public demo
- **"Mode: LLM-assisted triage"** — shown only if a provider implementation responds successfully

---

## Safety Limitations

> **This is not a production autonomous AI system.**
> - No real QHomemart production integration.
> - No real inventory, pricing, or WhatsApp API.
> - No guaranteed service availability.
> - LLM integration, when added, will require validation before use in production.
> - The deterministic fallback ensures the demo always works, regardless of provider status.
