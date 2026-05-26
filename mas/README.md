# MAS QHomemart

**Problem-to-Solution Bundle Multi-Agent System Prototype**

---

## Purpose

MAS QHomemart is a multi-agent system (MAS) prototype designed to transform a customer's description of a home problem into a structured, actionable solution concept — spanning relevant demo products or product categories, optional service guidance if available, a staff-ready briefing, and business insight signals.

The system demonstrates how a Multi-Agent System architecture can be applied to the retail home-improvement domain to:

- Suggest **relevant demo products or product categories** for a customer's specific home risk
- Pair products with **optional staff-guided service inquiry if installation or light renovation support is needed**
- Compose these into a **coherent, budget-aware bundle**
- Generate a **staff briefing** that helps staff understand customer needs faster as a prototype goal
- Produce **business insight** signals for management and analytics

---

## Demo Vertical

**Bathroom Safety for Older Adults & Caregivers**

> *"Kamar mandi lantai satu licin dan tidak ada pegangan. Ibu saya (75 tahun) sudah pernah hampir jatuh dua kali bulan lalu."*

The demo persona (Bu Sari, 75 tahun, fiktif) represents a high-urgency, budget-conscious household that wants to start from the most essential safety improvements first — a scenario that is representative, high-impact, and commercially relevant for QHomemart.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) App Router |
| UI Library | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Interaction Visuals | CSS-based flow animation |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Architecture

```
mas-qhomemart/
├── app/          ← UI — Next.js App Router (8 screens in page.tsx)
├── agents/       ← Agent modules (one file per agent)
├── data/         ← Dummy / demo data (no real QHomemart data)
├── workflows/    ← Orchestration layer
├── logs/         ← Interaction log snapshots
├── docs/         ← Project documentation
├── components/   ← Shared React components
└── hooks/        ← Custom React hooks
```

### Agents

| Agent | File | Role |
|-------|------|------|
| Customer Triage | `agents/customer-triage-agent.ts` | Classify problem, set urgency |
| Context & Risk | `agents/context-risk-agent.ts` | Identify risk factors, score severity |
| Product Match | `agents/product-match-agent.ts` | Rank relevant products |
| Service Match | `agents/service-match-agent.ts` | Recommend optional service guidance if available |
| Bundle Strategy | `agents/bundle-strategy-agent.ts` | Compose solution package |
| Staff & Insight | `agents/staff-insight-agent.ts` | Generate briefing + business signal |

Full pipeline diagram → [`docs/02-agent-workflow.md`](./docs/02-agent-workflow.md)

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Verify the build (TypeScript check)
npm run build

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No API keys, no environment variables, no database setup required.

Detailed guide → [`docs/03-reproducibility.md`](./docs/03-reproducibility.md)

---

## Documentation

| File | Contents |
|------|----------|
| [`docs/01-architecture.md`](./docs/01-architecture.md) | Folder map, architectural principles, scope |
| [`docs/02-agent-workflow.md`](./docs/02-agent-workflow.md) | Agent sequence, data flow diagram |
| [`docs/03-reproducibility.md`](./docs/03-reproducibility.md) | How to run, how to replace demo data |
| [`docs/04-evaluation.md`](./docs/04-evaluation.md) | Competition criteria mapping |

---

## Safety Limitations

> ⚠️ **This prototype is NOT connected to any real QHomemart production system.**

The following are explicitly out of scope:

- ❌ No real QHomemart product catalog or live inventory
- ❌ No real QHomemart pricing. The prototype uses simple budget tiers such as Hemat or Sedang for demonstration.
- ❌ No real stock level tracking
- ❌ No real WhatsApp API or messaging workflow
- ❌ No payment processing
- ❌ No user authentication or customer accounts
- ❌ No backend database or persistent storage
- ❌ No external API calls

Demo data is being organized in the `data/` folder as fictional TypeScript objects for demonstration purposes.

---

## Hybrid AI Mode

The system supports an optional LLM-assisted triage layer.
By default, the demo always uses deterministic fallback for reproducibility.

| Mode | Env vars required | Default |
|------|-------------------|---------|
| Deterministic fallback | None | Yes |
| LLM-assisted triage | `SUMOPOD_API_KEY`, `SUMOPOD_BASE_URL`, `SUMOPOD_MODEL` | No |

See `docs/05-hybrid-ai-mode.md` for architecture and how to add a provider.

Screen 8 shows a badge indicating which mode was used in the current run.

---

## Project Status

**Phase: Hybrid AI Credibility Patch v1.1**

- UI frozen: MAS QHomemart UI v1.0 with 8 screens
- Agent-oriented folder structure created
- Full agent reasoning logic implemented
- UI-to-agent workflow connection done
- Sample interaction log generated from workflow
- Shared types in types/mas-types.ts
- Hybrid AI triage architecture added (ai/ layer)
- Deterministic fallback always active by default
- AI mode badge on Screen 8
- Documentation updated (docs/05-hybrid-ai-mode.md)
- Real QHomemart data integration, future phase

---

*MAS QHomemart — Prototype. Not for production use.*
