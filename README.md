# MAS QHomemart Retail OS

MAS QHomemart Retail OS adalah AI-Assisted Retail Operating System untuk mendukung operasi retail, inquiry pelanggan, package recommendation, service coordination, staff follow-up, automation governance, dan audit trail.

Project ini memiliki dua entry point penting:

- Public Home: https://qhomemart.vercel.app/
- Operations Dashboard: https://qhomemart.vercel.app/operations

## Local Development

Run dari repository root:

```bash
npm install --prefix mas
npm run dev
```

Alternatif langsung ke app Next.js:

```bash
npm --prefix mas run dev
```

Build production:

```bash
npm run build
```

## Routes

- `/`: public landing / home untuk customer-facing entry.
- `/operations`: internal operations dashboard untuk stakeholder QHomemart.

## Current Scope

Operations dashboard saat ini mencakup:

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
- Human review, fallback, governance, dan auditability harus eksplisit.
- Dashboard menampilkan local preview dan operational signal, bukan klaim production-ready penuh.

## Scope Notes

Beberapa bagian dashboard menggunakan data sample/local preview untuk menjelaskan alur operasi dan governance. Sistem ini tidak mengklaim integrasi live untuk hal-hal berikut jika belum terhubung:

- live inventory / stock
- live price sync
- WhatsApp API
- payment
- production auth
- backend database
- supplier sync

## Project Structure

```text
qhomemart.project/
├── mas/
│   ├── app/
│   │   ├── page.tsx
│   │   └── operations/
│   ├── components/
│   │   └── operations/
│   ├── workflows/
│   ├── data/
│   ├── types/
│   └── docs/
├── package.json
└── README.md
```

## Important Implementation Notes

- Customer-facing app tetap berada di `/`.
- Internal operations dashboard berada di `/operations`.
- `/operations` menggunakan local state untuk sidebar navigation dan dashboard controls.
- API key atau secret asli tidak ditampilkan di UI.
- Model routing, fallback policy, dan automation governance ditampilkan sebagai control/governance layer sesuai cakupan saat ini.
