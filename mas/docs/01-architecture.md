# 01 — Architecture Overview

## MAS QHomemart: Agent-Oriented Modular Architecture

MAS QHomemart is a multi-agent system (MAS) prototype that transforms a customer's home problem description into a structured, actionable solution bundle — including product recommendations, optional service guidance if available, a staff briefing, and business insight signals.

The system is built on an **Agent-Oriented Modular Architecture**: each concern (classification, risk assessment, product matching, service matching, bundling, and staff briefing) is owned by a dedicated, independently testable agent module.

---

## Folder Map

```
mas/                          ← Next.js project root
├── app/                      ← UI (Next.js App Router)
│   ├── layout.tsx            ← Root layout
│   ├── page.tsx              ← All 8 prototype screens
│   └── globals.css           ← Global styles
│
├── agents/                   ← Agent modules (one file per agent)
│   ├── customer-triage-agent.ts
│   ├── context-risk-agent.ts
│   ├── product-match-agent.ts
│   ├── service-match-agent.ts
│   ├── bundle-strategy-agent.ts
│   └── staff-insight-agent.ts
│
├── data/                     ← Dummy / demo data (no real QHomemart data)
│   ├── demo-scenario.ts      ← Canonical demo scenario seed
│   ├── products.ts           ← Demo product catalog
│   ├── services.ts           ← Demo service catalog
│   └── bundle-rules.ts       ← Bundle composition rules
│
├── workflows/                ← Orchestration layer
│   ├── bathroom-safety-workflow.ts   ← End-to-end pipeline for the demo
│   └── interaction-logger.ts        ← Log entry factory
│
├── logs/                     ← Interaction log snapshots
│   └── sample-bathroom-run.ts       ← Static sample log (human-readable)
│
├── docs/                     ← Project documentation
│   ├── 01-architecture.md    ← This file
│   ├── 02-agent-workflow.md  ← Agent sequence and data flow
│   ├── 03-reproducibility.md ← How to run the prototype
│   └── 04-evaluation.md      ← Competition criteria mapping
│
├── components/               ← Shared React components (shadcn/ui + custom)
└── hooks/                    ← Custom React hooks
```

---

## Architectural Principles

| Principle | Implementation |
|-----------|----------------|
| **Single Responsibility** | Each agent file owns exactly one concern in the pipeline |
| **Explicit Data Flow** | Agent outputs use basic type contracts and are passed explicitly to downstream agents — no shared global state |
| **Modular Data** | All demo data lives in `data/`; swap files to integrate real QHomemart catalog |
| **Observable Pipeline** | Every run produces a structured `InteractionLogEntry` captured in `logs/` |
| **UI Separation** | The Next.js UI in `app/` is intentionally decoupled from agent logic in the current prototype phase |

---

## Scope and Safety Limitations

> **This prototype uses dummy modular data and is NOT connected to any production QHomemart system.**

Specifically:

- **No real product data** — `data/products.ts` contains fictional SKUs and illustrative prices.
- **No real service availability** — `data/services.ts` contains fictional service guidance entries and demo rate signals.
- **No real stock** — inventory levels are not tracked.
- **No real pricing** — the prototype uses simple budget tiers such as Hemat or Sedang for demonstration.
- **No real WhatsApp API** — the WhatsApp workflow shown in the UI is a UI mockup only.
- **No backend or database** — all data is in-memory TypeScript objects.
- **No authentication** — there is no login, user management, or session system.

These integrations are explicitly out of scope for this architecture-preparation phase and will be addressed in a separate production integration phase.
