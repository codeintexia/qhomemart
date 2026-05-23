# 02 — Agent Workflow & Data Flow

## Intended Pipeline Sequence

The MAS QHomemart pipeline processes a customer's home problem through six specialised agents, each adding progressively richer context before producing the final output rendered in the UI.

```
Customer Problem (Free-text or structured input)
        │
        ▼
┌─────────────────────────────┐
│  1. Customer Triage Agent   │  agents/customer-triage-agent.ts
│                             │
│  Input:  CustomerInput      │
│  Output: TriageSummary      │
│                             │
│  Role: Classifies problem   │
│  category, urgency, tags    │
└────────────┬────────────────┘
             │ TriageSummary
             ▼
┌─────────────────────────────┐
│  2. Context & Risk Agent    │  agents/context-risk-agent.ts
│                             │
│  Input:  TriageSummary      │
│  Output: RiskContext        │
│                             │
│  Role: Identifies env risk  │
│  factors, scores severity   │
└─────────┬───────────────────┘
          │ RiskContext
          ├──────────────────────────────┐
          ▼                              ▼
┌──────────────────────┐    ┌──────────────────────────┐
│  3. Product Match    │    │  4. Service Match Agent   │
│     Agent           │    │                           │
│                      │    │  agents/service-match-    │
│  agents/product-     │    │  agent.ts                 │
│  match-agent.ts      │    │                           │
│                      │    │  Input:  RiskContext       │
│  Input:  RiskContext  │    │  Output: ServiceMatch-    │
│  Output: ProductMatch│    │          Result           │
│          Result      │    │                           │
│                      │    │  Role: Suggests optional  │
│  Role: Surfaces most │    │  service guidance if      │
│  relevant SKUs from  │    │  available                │
│  product catalog     │    └────────────┬──────────────┘
└──────────┬───────────┘                 │
           │ ProductMatchResult          │ ServiceMatchResult
           └──────────────┬─────────────┘
                          │
                          ▼
             ┌────────────────────────────┐
             │  5. Bundle Strategy Agent  │  agents/bundle-strategy-agent.ts
             │                            │
             │  Input:  ProductMatchResult│
             │          ServiceMatchResult│
             │  Output: BundleRecommend-  │
             │          ation             │
             │                            │
             │  Role: Applies bundle rules│
             │  (data/bundle-rules.ts) to │
             │  compose optimal package   │
             └───────────┬────────────────┘
                         │ BundleRecommendation + RiskContext
                         ▼
             ┌────────────────────────────┐
             │  6. Staff & Insight Agent  │  agents/staff-insight-agent.ts
             │                            │
             │  Input:  BundleRecommend-  │
             │          ation + RiskContext│
             │  Output: StaffInsightOutput│
             │                            │
             │  Role: Generates staff     │
             │  briefing + business       │
             │  insight signal            │
             └───────────┬────────────────┘
                         │ StaffInsightOutput
                         ▼
             ┌────────────────────────────┐
             │  Interaction Logger        │  workflows/interaction-logger.ts
             │                            │
             │  Creates a structured      │
             │  InteractionLogEntry       │
             │  capturing all agent       │
             │  outputs for this run      │
             └───────────┬────────────────┘
                         │ InteractionLogEntry
                         ▼
             ┌────────────────────────────┐
             │  UI Output                 │  app/page.tsx
             │                            │
             │  Displays bundle,          │
             │  staff briefing, and       │
             │  business insight in the   │
             │  8-screen QHomemart UI     │
             └────────────────────────────┘
```

---

## Agent Responsibilities Summary

| # | Agent | File | Key Output Type |
|---|-------|------|-----------------|
| 1 | Customer Triage Agent | `agents/customer-triage-agent.ts` | `TriageSummary` |
| 2 | Context & Risk Agent | `agents/context-risk-agent.ts` | `RiskContext` |
| 3 | Product Match Agent | `agents/product-match-agent.ts` | `ProductMatchResult` |
| 4 | Service Match Agent | `agents/service-match-agent.ts` | `ServiceMatchResult` |
| 5 | Bundle Strategy Agent | `agents/bundle-strategy-agent.ts` | `BundleRecommendation` |
| 6 | Staff & Insight Agent | `agents/staff-insight-agent.ts` | `StaffInsightOutput` |

---

## Orchestration

The workflow orchestrator (`workflows/bathroom-safety-workflow.ts`) coordinates the full pipeline end-to-end. It:

1. Accepts optional `CustomerInput` (falls back to `data/demo-scenario.ts` defaults).
2. Calls agents in the sequence above.
3. Passes basic typed outputs between agents explicitly — no shared mutable state.
4. Calls `createInteractionLogEntry()` to produce a structured log.
5. Returns a `WorkflowRunResult` that the UI can render.

---

## Data Sources

| Agent | Data Source |
|-------|-------------|
| Product Match Agent | `data/products.ts` |
| Service Match Agent | `data/services.ts` |
| Bundle Strategy Agent | `data/bundle-rules.ts` |
| All agents (demo seed) | `data/demo-scenario.ts` |

---

## Current Phase Status

> All agent functions are **architecture placeholders** in this phase.
> They return stub objects that follow basic type contracts but do not implement real reasoning logic.
> Full agent logic will be implemented in the next phase.
