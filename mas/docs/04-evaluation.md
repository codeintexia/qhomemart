# 04 — Evaluation Criteria Mapping

## How MAS QHomemart Maps to Competition Evaluation Criteria

This document maps the system design and implementation to the criteria typically used to evaluate multi-agent system prototypes in a competition context. Each criterion is explained in terms of what the system demonstrates and where to look for evidence in the codebase.

---

## 1. Quality of Agent Reasoning

**What it means:** Each agent should demonstrate purposeful, context-aware decision-making — not just data pass-through.

**How MAS QHomemart addresses it:**

| Agent | Reasoning Capability (Current Prototype) |
|-------|------------------------------------------|
| Customer Triage Agent | Intended to classify free-text problem descriptions into structured categories with urgency scoring |
| Context & Risk Agent | Intended to identify discrete risk factors (slip hazard, no grab bar) and calculate a composite risk score |
| Product Match Agent | Intended to rank products by relevance score derived from risk context tags and severity |
| Service Match Agent | Intended to suggest optional service guidance if installation or light renovation support is needed and available |
| Bundle Strategy Agent | Intended to apply rule-based composition with priority ordering to build a coherent, budget-aware package |
| Staff & Insight Agent | Intended to generate natural-language staff briefing and structured business insight from the aggregated context |

**Where to look:**
- `agents/` folder — each agent file documents its reasoning approach
- `data/bundle-rules.ts` — rule logic for bundle composition
- `logs/sample-bathroom-run.ts` — static sample of the intended end-to-end agent outputs

---

## 2. Collaboration Between Agents

**What it means:** Agents should work together in a meaningful pipeline where the output of one agent informs the next.

**How MAS QHomemart addresses it:**

The pipeline is explicitly sequential with typed data passing:

```
CustomerInput → TriageSummary → RiskContext → ProductMatchResult + ServiceMatchResult → BundleRecommendation → StaffInsightOutput → InteractionLogEntry
```

- Each agent receives typed inputs from upstream agents — **no shared global state**.
- The Bundle Strategy Agent is designed to **synthesise two upstream outputs** (Product Match + Service Match) into a single package.
- The Staff & Insight Agent **consumes the full context** (bundle + risk) to personalise the briefing.

**Where to look:**
- `workflows/bathroom-safety-workflow.ts` — the orchestrator that wires agents together
- `docs/02-agent-workflow.md` — visual pipeline diagram

---

## 3. Real-World Business Impact

**What it means:** The system should solve a real, demonstrable business or social problem — not a toy scenario.

**How MAS QHomemart addresses it:**

| Dimension | Evidence |
|-----------|----------|
| **Social impact** | Addresses fall prevention for elderly occupants — a significant public health issue in Indonesia |
| **Commercial value** | Demonstrates potential basket-building through product bundles and optional service guidance if available |
| **Staff efficiency** | Reduces the time a QHomemart associate needs to formulate a recommendation from scratch |
| **Scalability** | Architecture supports multiple problem verticals (bathroom safety is the demo; staircases, lighting, ergonomics can follow) |
| **Data signal** | Business insight output (`BusinessInsight`) feeds management with demand-pattern signals |

**Where to look:**
- `data/demo-scenario.ts` — the realistic persona and problem statement
- `agents/staff-insight-agent.ts` — the `BusinessInsight` type and output
- `README.md` — project purpose statement

---

## 4. System Architecture Clarity

**What it means:** A judge should be able to understand the system structure quickly — where is the UI, where are the agents, where is the data?

**How MAS QHomemart addresses it:**

The folder structure is self-documenting:

```
agents/      ← all agent logic, one file per agent
data/        ← all demo data, clearly separated from business logic
workflows/   ← orchestration, clearly separated from individual agents
logs/        ← interaction records, clearly separated from runtime code
docs/        ← human-readable documentation (this folder)
app/         ← UI only (Next.js App Router)
```

**Design decisions that support clarity:**
- Kebab-case file names for instant identification
- PascalCase TypeScript interfaces for type safety
- camelCase exported functions following JavaScript conventions
- Each file starts with a clear JSDoc block explaining its role

**Where to look:**
- `docs/01-architecture.md` — the full architecture overview
- Any agent file header — concise role description at the top

---

## 5. Reproducibility

**What it means:** A judge should be able to clone the repository, run three commands, and see the prototype working.

**How MAS QHomemart addresses it:**

```bash
npm install    # install dependencies
npm run build  # verify TypeScript passes
npm run dev    # start the dev server at localhost:3000
```

- **No external APIs** — zero network calls required.
- **No environment variables** — no `.env` file needed.
- **No database** — all data is in-memory TypeScript objects.
- **No login** — the prototype is accessible immediately.

**Where to look:**
- `docs/03-reproducibility.md` — step-by-step guide
- `README.md` — quick-start section

---

## Summary Table

| Criterion | Evidence Location | Status |
|-----------|-------------------|--------|
| Agent reasoning quality | `agents/`, `data/bundle-rules.ts` | Architecture scaffold ready; logic to be implemented |
| Agent collaboration | `workflows/bathroom-safety-workflow.ts` | Pipeline scaffolded; data flow defined |
| Business impact | `data/demo-scenario.ts`, `agents/staff-insight-agent.ts` | Scenario and insight types defined |
| Architecture clarity | `docs/01-architecture.md`, folder structure | Documentation scaffold available |
| Reproducibility | `docs/03-reproducibility.md`, `README.md` | Initial 3-command setup documented |
