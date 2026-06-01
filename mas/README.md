# MAS QHomemart Retail OS

MAS QHomemart adalah AI-Assisted Retail Operating System untuk mengubah masalah pelanggan menjadi workflow retail yang dapat ditindaklanjuti: triage kebutuhan, risk assessment, product match, service guidance, package recommendation, staff follow-up, business insight, governance, dan audit trail.

## Project Overview

Dashboard bersifat business-first dan table-first. AI automation adalah salah satu layer observability, bukan identitas tunggal produk. Source code menunjukkan workflow multi-agent yang reproducible dan dapat diaudit.

## AI Agent Competition Context

Project ini disiapkan untuk AI Agent Competition dengan fokus pada kualitas reasoning agent, kolaborasi antar agent, dampak dunia nyata, kejelasan arsitektur, reproducibility, auditability, fallback governance, dan human review.

## Business Problem

Pelanggan retail sering menjelaskan kebutuhan dengan bahasa natural. Sistem ini mengubah inquiry menjadi demand cluster, risk assessment, rekomendasi paket, service dependency, staff summary, business insight, dan audit trail.

## Important URLs

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Provider-Agnostic LLM-Assisted Mode

Deterministic Mode:
- Default mode.
- Tidak membutuhkan API key.
- Cocok untuk local judging dan reproducibility.
- Downstream business agents tetap deterministic/rule-based.

LLM-Assisted Mode:
- Diaktifkan dengan `AGENT_EXECUTION_MODE=llm-assisted`.
- Provider yang didukung: `sumopod`, `openai`, dan `gemini`.
- Optional dan hanya berlaku untuk selected agents.
- Jika `LLM_API_KEY`, `LLM_BASE_URL`, atau `LLM_MODEL` tidak tersedia, workflow fallback ke deterministic mode tanpa crash.
- Dashboard preview menggunakan deterministic workflow by default. Async workflow/script dapat dipakai untuk inspeksi hybrid mode.

## API Key Strategy

Satu `LLM_API_KEY` dapat mendukung selected agent roles. Separate API key per agent tidak diperlukan. Secret harus server-side only, tidak memakai `NEXT_PUBLIC_`, tidak masuk `next.config`, dan tidak ditampilkan di UI/log.

## Actual Agent List

| Agent | File | Mode |
| --- | --- | --- |
| Customer Triage Agent | `agents/customer-triage-agent.ts` | Deterministic default, optional LLM-assisted interpretation |
| Context & Risk Agent | `agents/context-risk-agent.ts` | Deterministic |
| Product Match Agent | `agents/product-match-agent.ts` | Deterministic |
| Service Match Agent | `agents/service-match-agent.ts` | Deterministic |
| Bundle Strategy Agent | `agents/bundle-strategy-agent.ts` | Deterministic |
| Staff & Insight Agent | `agents/staff-insight-agent.ts` | Deterministic |
| Decision Synthesizer / Arbitration Agent | `agents/decision-synthesizer-agent.ts` | Deterministic default, optional LLM-assisted narrative synthesis in async workflow |

## Actual Workflow Files

- `workflows/bathroom-safety-workflow.ts`
- `workflows/plumbing-leak-workflow.ts`
- `workflows/interaction-logger.ts`

Optional LLM-assisted mode is available for Customer Triage Agent and Decision Synthesizer Agent. The dashboard preview remains deterministic by default for reproducibility, while async workflow/script execution can be used to inspect LLM-assisted triage and decision synthesis when valid provider credentials are configured. Other business-rule agents remain deterministic by design.

## Demo Scenarios

- `bathroom-safety`: kamar mandi licin untuk lansia.
- `plumbing-leak`: kebocoran pipa bawah sink dapur.

Both scenarios run through the same multi-agent workflow.

## Interaction Log and Auditability

Workflow output includes `agentOutputs`, `interactionLog`, `finalDecision`, `businessImpact`, `reproducibilityNote`, requested/effective execution mode, `usedLLM`, fallback status, fallback reason, warnings, and human review status.

## Human Review and Fallback Governance

Human review is required for high-risk cases, service uncertainty, or arbitration conflicts. If LLM-assisted mode is requested but unavailable, deterministic fallback is used and recorded in logs.

## Local Development

From repository root:

```bash
npm install --prefix mas
npm --prefix mas run build
npm --prefix mas run dev
```

From `mas/`:

```bash
npm install
npm run build
npm run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/operations

Inspect workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, mode: run.effectiveMode, steps: run.interactionLog.length })));"
```

## Optional LLM Setup

No `.env.local` is required for deterministic local run.

```bash
cd mas
cp .env.example .env.local
```

Edit `.env.local`:

OpenAI optional:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.4-mini
```

Gemini optional:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3-flash-preview
```

Sumopod optional:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=sumopod
SUMOPOD_BASE_URL=your_sumopod_base_url
SUMOPOD_MODEL=your_sumopod_model
SUMOPOD_API_KEY=your_key_here
```

Then:

```bash
npm run build
npm run dev
```

## Actual Project Structure

```text
mas/
├── app/
├── components/
├── lib/
├── data/
├── ai/
├── types/
├── scripts/
├── agents/
├── workflows/
├── hooks/
├── package.json
├── package-lock.json
├── tsconfig.json
└── .env.example
```

## Known Limitations

- Dashboard preview may run deterministic workflow by default.
- LLM-assisted mode is optional and depends on valid provider credentials. The system supports OpenAI, Gemini, and Sumopod-compatible provider calls through the provider-agnostic LLM client. If credentials are missing, invalid, or the provider call fails, the workflow falls back safely to deterministic mode.
- Downstream business agents are deterministic by design.
- Product catalog, stock, WhatsApp, price, payment, auth, and database are not live integrations.
- No autonomous full decision-making; human review remains explicit.

## Competition Evidence

1. Kualitas Reasoning Agent: `agentOutputs` includes reasoning basis, confidence, decision criteria, rejected alternatives, structured output, and selected LLM-assisted metadata where available.
2. Kolaborasi Antar Agent: sequential workflow records output dependency, interaction logs, and Decision Synthesizer arbitration.
3. Dampak Dunia Nyata: supports inquiry triage, package recommendation, service dependency, staff follow-up, and operational efficiency.
4. Kejelasan Arsitektur Sistem: source is separated into `agents/`, `workflows/`, `data/`, `types/`, runtime config, and dashboard observability.
5. Reproducibility: deterministic mode runs without API key, includes two scenarios, and is validated with install/build/dev commands.
