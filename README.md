# QHomemart AI Agent Competition 2026

**MAS QHomemart — Problem-to-Solution Bundle Multi-Agent System Prototype**

---

## About

This repository contains MAS QHomemart, a multi-agent system (MAS) prototype
designed for the QHomemart AI Agent Competition 2026.

The system transforms a customer's home problem description into a structured,
actionable solution — spanning relevant demo products, optional service guidance,
a staff-ready briefing, and business insight signals.

> **Prototype only.** No real QHomemart production integration, no real inventory,
> no real pricing, no real WhatsApp API, and no guaranteed service availability.

---

## Main App

The runnable prototype is located in:

```
mas/
```

All Next.js app code, agent modules, data, workflows, logs, and documentation
are inside `mas/`.

---

## Quick Start

Run all commands from the **repository root**:

```bash
npm install --prefix mas
npm run build
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

No API keys, no environment variables, no database setup required.

---

## Project Structure

```
qhomemart.project/
├── mas/                    ← Main prototype app (Next.js)
│   ├── app/                ← UI — Next.js App Router (8 screens)
│   ├── agents/             ← Agent modules (one file per agent)
│   ├── data/               ← Dummy modular data (no real QHomemart data)
│   ├── workflows/          ← Orchestration layer
│   ├── logs/               ← Sample interaction log output
│   ├── types/              ← Shared TypeScript types
│   └── docs/               ← Project documentation
├── package.json            ← Root workspace scripts (delegates to mas/)
└── README.md               ← This file
```

### Agents

| Agent | File | Role |
|-------|------|------|
| Customer Triage | `agents/customer-triage-agent.ts` | Classify problem chips and story |
| Context & Risk | `agents/context-risk-agent.ts` | Identify risk factors and severity |
| Product Match | `agents/product-match-agent.ts` | Group relevant products into sections |
| Service Match | `agents/service-match-agent.ts` | Suggest optional service guidance |
| Bundle Strategy | `agents/bundle-strategy-agent.ts` | Compose 3-section solution bundle |
| Staff & Insight | `agents/staff-insight-agent.ts` | Generate staff summary and business insight |

---

## Demo Scenario

**Vertical:** Bathroom Safety for Older Adults / Caregivers

> *"Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi."*

The demo runs the complete 6-agent pipeline and drives Screens 5–8 of the UI
with structured output from `runBathroomSafetyWorkflow()`.

---

## Safety Limitations

The following are explicitly **not** included in this prototype:

- No real QHomemart product catalog or live inventory
- No real QHomemart pricing (prototype uses budget tiers: Hemat / Sedang)
- No real stock level tracking
- No real WhatsApp API or messaging workflow
- No guaranteed service availability
- No payment processing
- No user authentication or customer accounts
- No backend database or persistent storage
- No external API calls

Demo data is in `mas/data/` as fictional TypeScript objects for demonstration only.

---

## Documentation

| File | Contents |
|------|----------|
| `mas/docs/01-architecture.md` | Folder map, architectural principles, scope |
| `mas/docs/02-agent-workflow.md` | Agent sequence and data flow diagram |
| `mas/docs/03-reproducibility.md` | How to run, how to replace demo data |
| `mas/docs/04-evaluation.md` | Competition criteria mapping |

---

*MAS QHomemart — Prototype. Not for production use.*