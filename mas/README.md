# MAS QHomemart Retail OS

MAS QHomemart adalah AI-Assisted Retail Operating System untuk mengubah masalah pelanggan menjadi workflow retail yang dapat ditindaklanjuti: triage kebutuhan, risk assessment, product match, service guidance, package recommendation, staff follow-up, business insight, governance, dan audit trail.

## Important URLs

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Local Reproducibility

Run dari folder repository root:

```bash
npm install --prefix mas
npm --prefix mas run build
npm --prefix mas run dev
```

Run dari folder `mas/`:

```bash
npm install
npm run build
npm run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/operations

Inspect demo workflow:

```bash
npm --prefix mas exec tsx -- -e "import { runAllDemoWorkflows } from './workflows/bathroom-safety-workflow'; console.log(runAllDemoWorkflows().map((run) => ({ scenarioId: run.scenarioId, steps: run.interactionLog.length, finalDecision: run.finalDecision.finalRecommendation })));"
```

## Project Overview

MAS QHomemart menunjukkan bagaimana multi-agent workflow dapat membantu internal retail operation tanpa menjadikan AI sebagai pusat produk. Dashboard bersifat business-first: inquiry pelanggan, paket, layanan, follow-up, risiko operasional, dan keputusan stakeholder ditampilkan lebih dulu. AI automation dan agent detail berada di modul khusus.

## AI Agent Competition Context

Project ini disiapkan untuk evaluasi AI Agent Competition. Fokus evidence ada pada kualitas reasoning agent, kolaborasi antar agent, dampak operasional retail, kejelasan arsitektur source code, reproducibility, auditability, fallback governance, dan human review.

## Problem Statement

Pelanggan sering menjelaskan masalah rumah dalam bahasa natural, bukan dalam kategori produk. Staff dan manajemen perlu mengubah cerita tersebut menjadi:

- demand cluster
- risiko operasional atau risiko keselamatan
- rekomendasi produk dan paket
- arahan layanan opsional
- ringkasan staff
- business insight
- audit trail

## Business Impact

- CEO dapat melihat risiko bisnis dan prioritas keputusan.
- Operations Manager dapat melihat follow-up, SLA, PIC, dan alert.
- Product Manager dapat melihat demand cluster, package opportunity, dan dependency stok/layanan.
- Technical Reviewer dapat melihat agent workflow, fallback, reasoning metadata, dan auditability.

## Multi-Agent Architecture

Agent modules berada di `agents/`. Workflow orchestration berada di `workflows/bathroom-safety-workflow.ts`.

| Agent | File | Role |
| --- | --- | --- |
| Customer Triage Agent | `agents/customer-triage-agent.ts` | Mengubah bahasa pelanggan menjadi structured triage output. LLM-assisted bila konfigurasi tersedia; deterministic fallback selalu ada. |
| Context & Risk Agent | `agents/context-risk-agent.ts` | Menentukan risiko, severity, dan prioritas. |
| Product Match Agent | `agents/product-match-agent.ts` | Mencocokkan risiko dengan product mapping lokal. |
| Service Match Agent | `agents/service-match-agent.ts` | Memberi arahan layanan opsional tanpa mengklaim availability live. |
| Bundle Strategy Agent | `agents/bundle-strategy-agent.ts` | Menyusun rekomendasi paket berlapis. |
| Staff & Insight Agent | `agents/staff-insight-agent.ts` | Membuat staff summary dan business insight. |
| Decision Synthesizer / Arbitration Agent | `agents/decision-synthesizer-agent.ts` | Membandingkan output agent, mendeteksi konflik, memilih rekomendasi akhir, menghitung confidence, dan menentukan human review. |

Actual workflow files:

- `workflows/bathroom-safety-workflow.ts`
- `workflows/plumbing-leak-workflow.ts`
- `workflows/interaction-logger.ts`

## Workflow Orchestration

Setiap skenario melewati urutan yang sama:

Customer input -> Customer Triage -> Context & Risk -> Product Match -> Service Match -> Bundle Strategy -> Staff & Insight -> Decision Synthesizer -> Audit Log

Setiap agent output dibungkus dengan reasoning metadata:

- agentName
- inputSummary
- outputSummary
- confidence
- reasoningBasis
- decisionCriteria
- rejectedAlternatives
- requiresHumanReview
- structuredOutput

## Interaction Log

Interaction log menyimpan:

- step number
- source agent
- target agent
- input
- output
- confidence
- reasoning basis
- decision dependency
- timestamp reproducible
- fallback status
- human review status

Log ini ditampilkan di Operations Dashboard pada modul `Audit Log`.

## Human Review & Fallback Governance

Customer Triage Agent dapat memakai LLM-assisted triage jika konfigurasi provider tersedia. Jika provider tidak tersedia atau output tidak valid, deterministic fallback digunakan. Downstream agents tetap rule-based/deterministic untuk menjaga stabilitas rekomendasi, reproducibility, dan auditability. Kasus dengan risiko tinggi, dependency layanan, atau conflict arbitration ditandai untuk human review.

## Supported Scenarios

Current scope mendukung minimal dua scenario seed:

- Bathroom safety / elderly safety: customer membutuhkan solusi untuk `kamar mandi licin`.
- Plumbing leak: customer membutuhkan arahan untuk `kebocoran pipa dapur`.

Keduanya menggunakan workflow multi-agent yang sama.

## Routes

- `/`: public home / customer-facing entry.
- `/operations`: internal operations dashboard untuk QHomemart Retail OS.

## Hybrid AI Mode

Customer Triage Agent memiliki jalur LLM-assisted via provider yang dapat dikonfigurasi. Jika env tidak tersedia atau output tidak valid, workflow memakai deterministic fallback.

Downstream agents tetap deterministic untuk menjaga stabilitas, reproducibility, governance, dan auditability.

Env opsional:

```bash
SUMOPOD_API_KEY=your_key_here
SUMOPOD_BASE_URL=https://ai.sumopod.com/v1
SUMOPOD_MODEL=gemini/gemini-2.0-flash
```

Tanpa env tersebut, project tetap buildable dan runnable.

## Competition Evidence

1. Kualitas Reasoning Agent: workflow menyimpan `agentOutputs` berisi `confidence`, `reasoningBasis`, `decisionCriteria`, `rejectedAlternatives`, `requiresHumanReview`, dan `structuredOutput`.
2. Kolaborasi Antar Agent: agent berjalan berurutan dari triage sampai arbitration, dan `interactionLog` mencatat source agent, target agent, dependency, fallback status, serta human review status.
3. Dampak Dunia Nyata: sistem membantu retail inquiry triage, package recommendation, service coordination, staff follow-up, dan operational decision support.
4. Kejelasan Arsitektur Sistem: source dipisah ke `agents/`, `workflows/`, `data/`, `types/`, dan dashboard observability di `components/operations/`.
5. Reproducibility: deterministic workflow dapat dijalankan tanpa secret eksternal melalui install/build/dev command dan dua skenario lokal.

## Actual Project Structure

```text
mas/
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

## Known Limitations

- Tidak menggunakan real QHomemart catalog.
- Tidak ada live stock, live price, WhatsApp API, payment, auth, database, atau supplier sync.
- Service guidance belum terhubung ke booking atau availability live.
- Model routing untuk semua agent selain Customer Triage adalah routing preview.
- Dashboard menggunakan sample data untuk current scope dan tidak mengklaim integrasi operasional live.
