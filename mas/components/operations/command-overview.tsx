import { AlertTriangle, Bot, BriefcaseBusiness, PackageCheck, UserRoundCheck, Users, Wrench } from "lucide-react";

const kpis = [
  ["Interaksi pelanggan", "128"],
  ["Sesi rekomendasi aktif", "34"],
  ["Peluang paket", "18"],
  ["Permintaan layanan", "11"],
  ["Alert operasional", "4"],
  ["Kesehatan AI", "Operational"],
];

const problemRows = [
  ["1", "Keamanan kamar mandi", "32", "Tinggi", "Paket Kamar Mandi Aman", "Siapkan guided bundle"],
  ["2", "Kebocoran air", "24", "Tinggi", "Paket Anti Bocor", "Review follow-up layanan"],
  ["3", "Pemilihan cat", "21", "Sedang", "Paket Cat Ruangan", "Buat alur konsultasi warna"],
  ["4", "Pompa & plumbing", "18", "Sedang", "Paket Pompa & Plumbing", "Mapping pertanyaan berulang"],
  ["5", "Renovasi dapur", "17", "Sedang", "Paket Dapur Praktis", "Validasi cross-sell"],
  ["6", "Pencahayaan rumah", "16", "Rendah", "Paket Pencahayaan Hemat Energi", "Siapkan rekomendasi fixture"],
];

const decisionRows = [
  ["P1", "Campaign", "Cluster safety paling kuat", "Prioritaskan paket keamanan kamar mandi", "Marketing + Category", "Siap dibahas"],
  ["P2", "Operasional", "Antrean layanan meningkat", "Review kapasitas instalasi dan repair", "Ops Manager", "Perlu review"],
  ["P3", "Produk", "Banyak pertanyaan plumbing", "Perkaya knowledge mapping plumbing", "Category Manager", "Dalam pengembangan"],
  ["P4", "Staf toko", "Butuh assisted selling", "Siapkan skrip penjualan berbantuan staf", "Store Lead", "Siap dibuat"],
];

const alertRows = [
  ["High intent cluster detected", "Peluang campaign safety", "Sedang", "Prioritaskan bundle safety", "Aktif"],
  ["Service follow-up queue rising", "Risiko antrean staf", "Tinggi", "Review kapasitas layanan", "Pantau"],
  ["Knowledge mapping needs update", "Rekomendasi bisa kurang konsisten", "Sedang", "Update mapping plumbing dan cat", "Dalam pengembangan"],
  ["Fallback policy healthy", "Workflow tetap berjalan", "Rendah", "Pertahankan governance", "Operational"],
];

export function CommandOverview() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Panduan Membaca Dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Mulai dari kebutuhan peran Anda</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          <PersonaCard title="Direktur / Manajemen" text="Lihat peluang bisnis dan keputusan prioritas." menu="Ringkasan, Insight Bisnis" />
          <PersonaCard title="Manajer Operasional" text="Lihat alur kerja, antrean layanan, dan risiko operasional." menu="Operasional, Layanan" />
          <PersonaCard title="Product / Category Manager" text="Lihat pola kebutuhan pelanggan dan peluang paket." menu="Pelanggan, Produk & Paket" />
          <PersonaCard title="Reviewer Teknis" text="Lihat Agent, Model, Fallback, Workflow, dan Audit." menu="Sistem AI, Log & Audit" />
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827_0%,#0c1220_52%,#231014_100%)] p-6 shadow-2xl shadow-black/30">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Ringkasan Retail OS</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              Dashboard internal untuk membaca kebutuhan pelanggan dan keputusan bisnis berikutnya.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              AI digunakan untuk memahami bahasa pelanggan. Workflow deterministik menjaga hasil tetap stabil dan dapat diaudit.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Keputusan prioritas</p>
            <p className="mt-3 text-xl font-semibold leading-7 text-white">
              Prioritaskan paket keamanan kamar mandi dan review kapasitas layanan instalasi.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Contoh kasus terpilih: kamar mandi licin untuk lansia.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        {kpis.map(([label, value], index) => {
          const icons = [Users, UserRoundCheck, PackageCheck, Wrench, AlertTriangle, Bot];
          const Icon = icons[index] ?? Users;
          return (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
              <p className="mt-4 text-sm text-slate-400">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
            </div>
          );
        })}
      </div>

      <DataTable title="Tabel Pola Kebutuhan Pelanggan" headers={["No", "Klaster Masalah", "Jumlah Input", "Urgensi", "Potensi Paket", "Tindak Lanjut"]} rows={problemRows} />
      <DataTable title="Tabel Keputusan Prioritas" headers={["Prioritas", "Area Bisnis", "Temuan", "Rekomendasi Keputusan", "PIC Internal", "Status"]} rows={decisionRows} />
      <DataTable title="Tabel Alert Operasional" headers={["Alert", "Dampak", "Level Risiko", "Rekomendasi", "Status"]} rows={alertRows} />
    </section>
  );
}

function PersonaCard({ title, text, menu }: { title: string; text: string; menu: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
      <BriefcaseBusiness className="h-5 w-5 text-red-200" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Menu: {menu}</p>
    </div>
  );
}

function DataTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")} className="transition hover:bg-white/[0.045]">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className={`px-4 py-4 leading-6 ${index === 1 ? "font-semibold text-white" : "text-slate-300"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
