# MAS QHomemart Retail OS

MAS QHomemart adalah **AI-Assisted Retail Operating System** untuk mengubah masalah pelanggan menjadi Workflow retail yang dapat ditindaklanjuti: triage kebutuhan, risk assessment, product match, service guidance, package recommendation, staff follow-up, business insight, governance, dan Audit Log.

## Ringkasan Project

Dashboard bersifat business-first dan table-first. AI automation adalah salah satu layer observability, bukan identitas tunggal produk. Source code menunjukkan Multi-Agent Workflow yang reproducible, memiliki Reasoning antar Agent, output terstruktur, Fallback, Human Review, dan Audit Log.

## Konteks AI Agent Competition

Project ini disiapkan untuk AI Agent Competition dengan fokus pada kualitas Reasoning Agent, kolaborasi antar Agent, dampak dunia nyata, kejelasan arsitektur, reproducibility, auditability, Fallback governance, dan Human Review.

## Masalah Bisnis

Pelanggan retail sering menjelaskan kebutuhan dengan bahasa natural, bukan format SKU. Sistem ini mengubah inquiry menjadi demand cluster, risk assessment, rekomendasi paket, service dependency, staff summary, business insight, dan Audit Log yang bisa ditinjau ulang.

## Important URLs

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Mode Provider-Agnostic LLM-Assisted

Deterministic Mode:
- Default mode.
- Tidak membutuhkan API Key.
- Cocok untuk penilaian lokal dan reproducibility.
- Downstream business agents tetap deterministic/rule-based.

LLM-Assisted Mode:
- Diaktifkan dengan `AGENT_EXECUTION_MODE=llm-assisted`.
- Provider yang didukung: `sumopod`, `openai`, dan `gemini`.
- Opsional dan hanya berlaku untuk selected agents.
- Satu API Key cukup untuk beberapa LLM agents. Tidak perlu 6 API Key untuk 6 Agent.
- Jika API Key, base URL, model, atau provider call tidak tersedia, Workflow Fallback ke deterministic mode tanpa crash.
- Dashboard preview menggunakan deterministic Workflow by default. Async workflow/script dapat dipakai untuk inspeksi hybrid mode.

LLM agents:

- Agent Klasifikasi Permintaan Pelanggan (Customer Triage Agent)
- Agent Sintesis Keputusan (Decision Synthesizer Agent)

Agent lain tetap deterministic untuk menjaga reproducibility, stabilitas rekomendasi, dan auditability.

## Strategi API Key

Satu API Key dapat mendukung beberapa Agent yang memakai LLM. Separate API Key per Agent tidak diperlukan. Secret harus server-side only, tidak memakai `NEXT_PUBLIC_`, tidak masuk `next.config`, tidak di-commit melalui `.env.local`, dan tidak ditampilkan di UI/log.

## Daftar Agent

| Agent | File | Mode |
| --- | --- | --- |
| Agent Klasifikasi Permintaan Pelanggan (Customer Triage Agent) | `agents/customer-triage-agent.ts` | Deterministic default, optional LLM-assisted interpretation |
| Agent Konteks dan Risiko (Context & Risk Agent) | `agents/context-risk-agent.ts` | Deterministic |
| Agent Pencocokan Produk (Product Match Agent) | `agents/product-match-agent.ts` | Deterministic |
| Agent Pencocokan Layanan (Service Match Agent) | `agents/service-match-agent.ts` | Deterministic |
| Agent Strategi Paket Solusi (Bundle Strategy Agent) | `agents/bundle-strategy-agent.ts` | Deterministic |
| Agent Rekomendasi Tindak Lanjut Staf (Staff & Insight Agent) | `agents/staff-insight-agent.ts` | Deterministic |
| Agent Sintesis Keputusan (Decision Synthesizer Agent) | `agents/decision-synthesizer-agent.ts` | Deterministic default, optional LLM-assisted narrative synthesis melalui async Workflow |

## File Workflow

- `workflows/bathroom-safety-workflow.ts`
- `workflows/plumbing-leak-workflow.ts`
- `workflows/interaction-logger.ts`

Mode LLM-assisted tersedia secara opsional untuk Agent Klasifikasi Permintaan Pelanggan (Customer Triage Agent) dan Agent Sintesis Keputusan (Decision Synthesizer Agent). Dashboard preview tetap deterministic by default untuk reproducibility. Async Workflow/script execution dapat digunakan untuk inspeksi LLM-assisted triage dan decision synthesis saat provider credentials valid. Agent berbasis business rule lain tetap deterministic by design.

## Skenario Demo

- `bathroom-safety`: kamar mandi licin untuk lansia.
- `plumbing-leak`: kebocoran pipa bawah sink dapur.

Kedua skenario berjalan melalui Multi-Agent Workflow yang sama.

## Interaction Log dan Auditability

Workflow output mencakup `agentOutputs`, `interactionLog`, `finalDecision`, `businessImpact`, `reproducibilityNote`, requested/effective execution mode, `usedLLM`, Fallback status, Fallback reason, warnings, dan Human Review status.

## Human Review dan Fallback Governance

Human Review diperlukan untuk kasus high-risk, service uncertainty, atau arbitration conflicts. Customer-facing output tetap membutuhkan Human Review. Jika LLM-assisted mode diminta tetapi provider tidak tersedia, deterministic Fallback digunakan dan dicatat di log.

## Local Demo Bridge

Public Home (`/`) dapat menulis satu demo inquiry event ke `localStorage` saat user mencapai layar hasil/rekomendasi. Operations Dashboard (`/operations`) membaca event terbaru tersebut melalui `localStorage` dan menampilkannya sebagai **Local demo bridge**.

Bridge ini hanya untuk demo lokal dan tidak mengklaim production sync. Tidak ada backend, database, API Key, atau event queue yang dipakai. Implementasi production membutuhkan API/database/event queue, autentikasi, validasi server-side, dan governance data yang sesuai.

## Local Development

Dari root repository:

```bash
npm install --prefix mas
npm --prefix mas run build
npm --prefix mas run dev
```

Dari folder `mas/`:

```bash
npm install
npm run build
npm run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/operations

Inspect Workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, mode: run.effectiveMode, steps: run.interactionLog.length })));"
```

## Setup LLM Opsional

`.env.local` tidak dibutuhkan untuk deterministic local run.

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

Lalu:

```bash
npm run build
npm run dev
```

## Struktur Project Aktual

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

## Batasan Saat Ini

- Dashboard preview berjalan deterministic Workflow by default.
- LLM-assisted mode bersifat opsional dan bergantung pada provider credentials yang valid. Sistem mendukung OpenAI, Gemini, dan Sumopod-compatible provider calls melalui provider-agnostic LLM client. Jika credentials kosong, invalid, atau provider call gagal, Workflow Fallback dengan aman ke deterministic mode.
- Downstream business agents deterministic by design.
- Product catalog, stock, WhatsApp, price, payment, auth, dan database belum live integration.
- Tidak ada autonomous full decision-making; Human Review tetap eksplisit.

## Competition Evidence

1. **Kualitas Reasoning Agent**: setiap Agent memiliki peran, input, output, Confidence Score, `reasoningBasis`, `decisionCriteria`, `rejectedAlternatives`, dan `structuredOutput`.
2. **Kolaborasi Antar Agent**: output Agent sebelumnya menjadi input Agent berikutnya. Decision Synthesizer menggabungkan hasil Agent dan Interaction Log mencatat komunikasi antar Agent.
3. **Dampak Dunia Nyata**: sistem mendukung klasifikasi inquiry, package recommendation, service coordination, staff follow-up, dan efisiensi operasional retail.
4. **Kejelasan Arsitektur Sistem**: source dipisahkan ke `agents/`, `workflows/`, `data/`, `types/`, `ai/`, runtime config, dan dashboard observability.
5. **Reproducibility**: deterministic mode berjalan tanpa API Key, dua skenario demo tersedia, dan local Build dapat dijalankan.
