# MAS QHomemart Retail OS

MAS QHomemart adalah **AI-Assisted Retail Operating System** untuk membantu alur kerja retail: klasifikasi inquiry pelanggan, rekomendasi paket, koordinasi layanan, staff follow-up, governance automation, dan Audit Log.

## Konteks AI Agent Competition

Project ini dibuat untuk AI Agent Competition. Fokus utamanya adalah **Multi-Agent Workflow**, Reasoning antar Agent, kolaborasi Agent, output terstruktur, Audit Log, Fallback, Human Review, dan reproducibility.

Dashboard bukan klaim live integration. Dashboard adalah observability layer untuk melihat bagaimana Workflow berjalan dan bagaimana keputusan dapat diaudit.

## Masalah Bisnis

Pelanggan sering menjelaskan kebutuhan dalam bahasa natural, bukan dalam format SKU. Contoh: `kamar mandi licin untuk lansia` atau `pipa dapur bocor`. MAS QHomemart mengubah inquiry tersebut menjadi demand cluster, risk assessment, rekomendasi paket, service dependency, staff summary, business insight, dan final decision yang dapat ditinjau manusia.

## Important URLs

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Provider-Agnostic LLM-Assisted Mode

Deterministic mode adalah default. Mode ini berjalan tanpa API Key dan cocok untuk demo lokal yang reproducible.

LLM-assisted mode bersifat opsional. Provider yang didukung:

- OpenAI
- Gemini
- Sumopod-compatible endpoint

Satu API Key cukup untuk beberapa Agent yang memakai LLM. Tidak perlu 6 API Key untuk 6 Agent. Jika API Key kosong, credential invalid, atau provider call gagal, Workflow otomatis Fallback ke deterministic mode.

Agent yang dapat memakai LLM:

- Agent Klasifikasi Permintaan Pelanggan (Customer Triage Agent)
- Agent Sintesis Keputusan (Decision Synthesizer Agent)

Agent lain tetap deterministic untuk reproducibility dan auditability.

Dashboard preview tetap deterministic by default. Async workflow/script execution dapat dipakai untuk inspeksi LLM-assisted triage dan decision synthesis jika credential provider valid.

## API Key Strategy

API Key harus server-side only. Jangan memakai `NEXT_PUBLIC_` untuk secret. Jangan commit `.env.local`. API Key tidak dimasukkan ke `next.config`, tidak ditampilkan di UI, dan tidak dicatat di log.

## Daftar Agent

- Agent Klasifikasi Permintaan Pelanggan (Customer Triage Agent)
- Agent Konteks dan Risiko (Context & Risk Agent)
- Agent Pencocokan Produk (Product Match Agent)
- Agent Pencocokan Layanan (Service Match Agent)
- Agent Strategi Paket Solusi (Bundle Strategy Agent)
- Agent Rekomendasi Tindak Lanjut Staf (Staff & Insight Agent)
- Agent Sintesis Keputusan (Decision Synthesizer Agent)

## Workflow Files

- `mas/workflows/bathroom-safety-workflow.ts`
- `mas/workflows/plumbing-leak-workflow.ts`
- `mas/workflows/run-user-inquiry-workflow.ts`
- `mas/workflows/interaction-logger.ts`

## Catatan Penamaan Workflow

`runRetailInquiryWorkflow` adalah workflow generik untuk menjalankan input dari Public Home melalui pipeline Agent yang sama. `runUserInquiryWorkflow` memilih atau membentuk output berdasarkan klaster `bathroom-safety`, `plumbing-leak`, `lighting`, atau `generic-home-improvement`. `runBathroomSafetyWorkflow` tetap ada sebagai compatibility wrapper dari skenario awal kamar mandi licin; nama lama ini tidak berarti seluruh sistem hanya mendukung kasus kamar mandi.

## Skenario Demo

- `bathroom-safety`: kamar mandi licin untuk lansia.
- `plumbing-leak`: kebocoran pipa bawah sink dapur.
- `lighting`: lampu garasi redup atau pencahayaan rumah.
- `generic-home-improvement`: kebutuhan rekomendasi produk atau renovasi ringan.

Semua skenario melewati Multi-Agent Workflow yang sama.

## Interaction Log dan Auditability

Workflow menghasilkan `agentOutputs`, `interactionLog`, `finalDecision`, `businessImpact`, dan `reproducibilityNote`. Log mencatat source Agent, target Agent, requested/effective execution mode, `usedLLM`, Confidence Score, reasoning basis, decision dependency, Fallback reason, warnings, dan Human Review status.

## Human Review dan Fallback Governance

Customer-facing output membutuhkan Human Review. Kasus high-risk, service uncertainty, atau conflict arbitration ditandai untuk review manusia. Jika LLM-assisted mode diminta tetapi provider tidak tersedia, Workflow tetap berjalan melalui deterministic Fallback dan mencatat alasannya.

## Local Demo Bridge

Public Home (`/`) dapat menghasilkan demo inquiry event saat user mencapai layar hasil/rekomendasi. Operations Dashboard (`/operations`) membaca event terbaru tersebut melalui `localStorage`.

Event dibuat dari input user dan memuat customer need, selected problems, detected cluster, scenario ID, final recommendation, recommended package, service recommendation, Human Review status, Audit status, dan ringkasan Interaction Log.

Tujuannya untuk menunjukkan alur **User App → Multi-Agent Workflow → Dashboard Operasional → Audit Log** dalam demo lomba. Bridge ini hanya untuk kredibilitas demo lokal: tidak memakai backend, database, API Key, atau event queue. Ini bukan production sync. Implementasi production membutuhkan API/database/event queue, autentikasi, validasi server-side, dan governance data yang sesuai.

Contoh skenario yang didukung:

- `Kamar mandi licin untuk lansia` → `bathroom-safety`
- `Pipa bocor di dapur` → `plumbing-leak`
- `Lampu garasi redup` → `lighting`
- `Butuh rekomendasi renovasi ringan` → `generic-home-improvement`

## Alur Demo yang Disarankan untuk Juri

1. Buka Public Home.
2. Masukkan contoh kebutuhan pelanggan: `kamar mandi licin untuk lansia`, `pipa bocor di dapur`, atau `lampu garasi redup`.
3. Lihat rekomendasi, paket, layanan, dan ringkasan staff yang berubah sesuai input.
4. Buka Operations Dashboard.
5. Lihat permintaan terbaru dari Public Home pada Dashboard dan antrean Inquiry / Permintaan.
6. Buka Audit Log atau AI & Automation untuk melihat jejak Agent, Workflow, Fallback, dan Human Review.

## Local Development

Dari root repository:

```bash
npm install --prefix mas
npm --prefix mas run build
npm --prefix mas run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/operations

Inspect deterministic Workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, mode: run.effectiveMode, steps: run.interactionLog.length })));"
```

## Optional LLM Setup

Demo lokal deterministic tidak membutuhkan `.env.local`.

```bash
cd mas
cp .env.example .env.local
```

OpenAI:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.4-mini
```

Gemini:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3-flash-preview
```

Sumopod-compatible endpoint:

```bash
AGENT_EXECUTION_MODE=llm-assisted
LLM_PROVIDER=sumopod
SUMOPOD_BASE_URL=your_sumopod_base_url
SUMOPOD_MODEL=your_sumopod_model
SUMOPOD_API_KEY=your_key_here
```

Lalu jalankan:

```bash
npm run build
npm run dev
```

## Struktur Repository

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

## Batasan Saat Ini

- Dashboard preview dapat berjalan deterministic by default.
- LLM-assisted mode bersifat opsional dan bergantung pada credential provider yang valid.
- Agent bisnis downstream tetap deterministic untuk reproducibility dan auditability.
- Product catalog, stock sync, WhatsApp integration, payment integration, price sync, auth, dan database belum live integration.
- Sistem tidak melakukan autonomous full decision-making; Human Review tetap eksplisit.

## Competition Evidence

1. **Kualitas Reasoning Agent**: setiap Agent memiliki peran, input, output, Confidence Score, `reasoningBasis`, `decisionCriteria`, `rejectedAlternatives`, dan `structuredOutput`.
2. **Kolaborasi Antar Agent**: output Agent sebelumnya menjadi input Agent berikutnya. Decision Synthesizer menyatukan hasil Agent. Interaction Log mencatat komunikasi antar Agent.
3. **Dampak Dunia Nyata**: sistem membantu klasifikasi inquiry pelanggan, rekomendasi paket, koordinasi layanan, staff follow-up, dan efisiensi operasional retail.
4. **Kejelasan Arsitektur Sistem**: source dipisahkan ke `agents/`, `workflows/`, `data/`, `types/`, `ai/`, dan dashboard observability.
5. **Reproducibility**: deterministic mode berjalan tanpa API Key, dua skenario demo tersedia, dan Build lokal dapat dijalankan.
