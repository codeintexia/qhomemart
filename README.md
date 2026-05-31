# MAS QHomemart Retail OS

MAS QHomemart Retail OS adalah AI-Assisted Retail Operating System untuk mendukung operasi retail, inquiry pelanggan, package recommendation, service coordination, staff follow-up, automation governance, dan audit trail.

Project ini memiliki dua entry point penting:

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

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

## Known Limitations

- Tidak ada live inventory.
- Tidak ada live price sync.
- Tidak ada WhatsApp API.
- Tidak ada payment.
- Tidak ada production auth.
- Tidak ada backend database.
- Tidak ada supplier sync.
- Model routing multi-agent masih routing preview; hanya Customer Triage Agent yang memiliki jalur LLM-assisted saat konfigurasi tersedia.
