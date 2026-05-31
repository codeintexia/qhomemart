# MAS QHomemart Retail OS

MAS QHomemart Retail OS adalah AI-Assisted Retail Operating System untuk mendukung operasi retail, inquiry pelanggan, package recommendation, service coordination, staff follow-up, automation governance, dan audit trail.

Project ini memiliki dua entry point penting:

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## AI Agent Competition Context

Repository ini disiapkan untuk evaluasi AI Agent Competition dengan fokus pada reproducibility, multi-agent reasoning, agent collaboration, business impact, auditability, fallback governance, dan human review. Dashboard berfungsi sebagai observability layer; identitas utama sistem tetap retail operating workflow.

## Problem Statement

Customer retail sering datang dengan masalah rumah yang tidak langsung berbentuk SKU: kamar mandi licin, pipa bocor, bingung memilih cat, atau kebutuhan renovasi ringan. Staff perlu menerjemahkan masalah tersebut menjadi rekomendasi produk, paket, layanan opsional, follow-up, dan keputusan bisnis yang dapat diaudit.

## Business Impact

- Mengubah inquiry pelanggan menjadi demand cluster yang bisa ditindaklanjuti.
- Membantu Product Manager melihat peluang paket dan dependency stok/layanan.
- Membantu Operations Manager melihat follow-up, SLA, dan risiko operasional.
- Membantu Technical Reviewer melihat workflow, fallback, human review, dan auditability.

## Multi-Agent Architecture

Workflow utama berada di `mas/workflows/bathroom-safety-workflow.ts` dan menjalankan agent berikut:

1. Customer Triage Agent
2. Context & Risk Agent
3. Product Match Agent
4. Service Match Agent
5. Bundle Strategy Agent
6. Staff & Insight Agent
7. Decision Synthesizer / Arbitration Agent

Customer Triage Agent dapat menggunakan LLM-assisted triage jika dikonfigurasi. Downstream agents berjalan deterministic agar rekomendasi stabil, reproducible, dan auditable.

## Supported Demo Scenarios

- Bathroom safety / elderly safety: `Kamar mandi licin`
- Plumbing leak: `Kebocoran pipa dapur`

Kedua skenario melewati workflow multi-agent yang sama.

Workflow files yang tersedia:

- `mas/workflows/bathroom-safety-workflow.ts`
- `mas/workflows/plumbing-leak-workflow.ts`
- `mas/workflows/interaction-logger.ts`

## Routes

- `/`: public landing / customer-facing home.
- `/operations`: internal operations dashboard.

## Local Development

Run dari repository root:

```bash
npm install --prefix mas
npm --prefix mas run dev
npm --prefix mas run build
```

Alternatif:

```bash
npm install
npm run dev
npm run build
```

Inspect demo workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, steps: run.interactionLog.length, finalDecision: run.finalDecision.finalRecommendation })));"
```

## Current Scope

- Dashboard
- Pelanggan
- Inquiry / Permintaan
- Produk & Stok
- Paket & Bundling
- Layanan
- Staff Follow-up
- Insight Bisnis
- Operasional
- AI & Automation
- Audit Log
- Pengaturan

## Positioning

- Business first, AI second.
- Table-first internal retail dashboard.
- Agent hanya salah satu modul, bukan identitas utama produk.
- Human review, fallback, governance, reasoning metadata, dan auditability eksplisit.
- Tidak mengklaim live integration bila sistem belum connected.

## Actual Repository Structure

```text
qhomemart.project/
├── README.md
├── package.json
└── mas/
    ├── agents/
    ├── ai/
    ├── app/
    ├── components/
    ├── data/
    ├── docs/
    ├── hooks/
    ├── lib/
    ├── scripts/
    ├── styles/
    ├── types/
    └── workflows/
```

## Interaction Log & Auditability

Workflow menghasilkan `interactionLog` dan `agentOutputs` yang dapat ditelusuri. Setiap step mencatat source agent, target agent, input summary, output summary, confidence, reasoning basis, decision dependency, fallback status, dan human review status.

## Human Review & Fallback Governance

Customer Triage Agent memiliki optional LLM-assisted triage saat konfigurasi tersedia. Jika tidak tersedia atau output tidak valid, deterministic fallback digunakan. Downstream agents tetap rule-based/deterministic untuk menjaga stabilitas, reproducibility, dan auditability. Output customer-facing tetap memerlukan validasi human review pada kasus berisiko atau saat ada dependency layanan.

## Competition Evidence

1. Kualitas Reasoning Agent: setiap output agent dibungkus reasoning metadata berisi confidence, reasoning basis, decision criteria, rejected alternatives, dan structured output.
2. Kolaborasi Antar Agent: workflow berjalan berurutan dari Customer Triage sampai Decision Synthesizer, dengan dependency antar output tercatat di interaction log.
3. Dampak Dunia Nyata: sistem memetakan retail inquiry menjadi package recommendation, service coordination, staff follow-up, dan stakeholder decision support.
4. Kejelasan Arsitektur Sistem: source dipisah ke `agents/`, `workflows/`, `data/`, `types/`, dan dashboard observability di `components/operations/`.
5. Reproducibility: `npm install --prefix mas`, `npm --prefix mas run build`, dan `npm --prefix mas run dev` berjalan tanpa secret eksternal untuk deterministic workflow demo.

## Known Limitations

- Tidak ada live inventory.
- Tidak ada live price sync.
- Tidak ada WhatsApp API.
- Tidak ada payment.
- Tidak ada production auth.
- Tidak ada backend database.
- Tidak ada supplier sync.
- Model routing multi-agent masih routing preview; hanya Customer Triage Agent yang memiliki jalur LLM-assisted saat konfigurasi tersedia.
