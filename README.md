# MAS QHomemart Retail OS

MAS QHomemart Retail OS adalah AI-Assisted Retail Operating System untuk retail inquiry triage, package recommendation, service coordination, staff follow-up, automation governance, dan audit trail.

## AI Agent Competition Context

Project ini disiapkan untuk AI Agent Competition dengan fokus pada multi-agent reasoning, structured collaboration, business impact, reproducibility, auditability, human review, dan fallback governance. Dashboard adalah observability layer; produk utamanya adalah workflow retail multi-agent.

## Business Problem

Customer sering menjelaskan masalah rumah dalam bahasa natural, bukan SKU. MAS QHomemart mengubah inquiry seperti `kamar mandi licin` atau `pipa dapur bocor` menjadi demand cluster, risk assessment, rekomendasi paket, service guidance, staff summary, business insight, dan audit trail.

## Important URLs

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Provider-Agnostic LLM-Assisted Mode

Deterministic Mode:
- Default mode.
- Tidak membutuhkan API key.
- Customer Triage Agent dan downstream agents memakai deterministic/rule-based workflow.
- Cocok untuk local judging dan reproducibility.

LLM-Assisted Mode:
- Diaktifkan dengan `AGENT_EXECUTION_MODE=llm-assisted`.
- Provider yang didukung: `sumopod`, `openai`, dan `gemini`.
- Hanya selected agents yang boleh memakai LLM-assisted support.
- Jika `LLM_API_KEY` atau konfigurasi LLM tidak tersedia, sistem fallback ke deterministic mode tanpa crash.
- Dashboard preview tetap deterministic by default; async workflow/script dapat dipakai untuk inspeksi hybrid mode.

## API Key Strategy

Satu `LLM_API_KEY` dapat mendukung selected agent roles. Separate API key per agent tidak diperlukan. API key harus server-side only, tidak memakai `NEXT_PUBLIC_`, tidak dimasukkan ke `next.config`, dan tidak dicatat di log/UI.

## Actual Agent List

1. Customer Triage Agent
2. Context & Risk Agent
3. Product Match Agent
4. Service Match Agent
5. Bundle Strategy Agent
6. Staff & Insight Agent
7. Decision Synthesizer / Arbitration Agent

Optional LLM-assisted mode is available for Customer Triage Agent and Decision Synthesizer Agent. The dashboard preview remains deterministic by default for reproducibility, while async workflow/script execution can be used to inspect LLM-assisted triage and decision synthesis when valid provider credentials are configured. Downstream business agents remain deterministic by design.

## Actual Workflow Files

- `mas/workflows/bathroom-safety-workflow.ts`
- `mas/workflows/plumbing-leak-workflow.ts`
- `mas/workflows/interaction-logger.ts`

## Demo Scenarios

- `bathroom-safety`: kamar mandi licin untuk lansia.
- `plumbing-leak`: kebocoran pipa bawah sink dapur.

Both scenarios run through the same multi-agent workflow.

## Interaction Log and Auditability

Workflow output includes `agentOutputs`, `interactionLog`, `finalDecision`, `businessImpact`, and `reproducibilityNote`. Logs include source agent, target agent, requested/effective execution mode, `usedLLM`, confidence, reasoning basis, decision dependency, fallback reason, warnings, and human review status.

## Human Review and Fallback Governance

Human review is required for high-risk cases, service uncertainty, or arbitration conflicts. If LLM-assisted mode is requested but unavailable, deterministic fallback is used and recorded in workflow metadata.

## Local Development

From repository root:

```bash
npm install --prefix mas
npm --prefix mas run build
npm --prefix mas run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/operations

Inspect deterministic workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, mode: run.effectiveMode, steps: run.interactionLog.length })));"
```

## Optional LLM Setup

No `.env.local` is required for deterministic local run.

Optional LLM-assisted setup:

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

## Actual Repository Structure

```text
qhomemart.project/
├── README.md
└── mas/
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

1. Kualitas Reasoning Agent: agent outputs include reasoning basis, confidence, decision criteria, rejected alternatives, structured output, and selected LLM-assisted interpretation metadata where available.
2. Kolaborasi Antar Agent: sequential workflow records output dependency, source/target agent, interaction logs, and Decision Synthesizer arbitration.
3. Dampak Dunia Nyata: workflow supports inquiry triage, package recommendation, service dependency, staff follow-up, and operational efficiency.
4. Kejelasan Arsitektur Sistem: source is separated into `agents/`, `workflows/`, `data/`, `types/`, runtime config, and dashboard observability.
5. Reproducibility: deterministic mode runs without API key, includes two scenarios, and is validated with install/build/dev commands.
