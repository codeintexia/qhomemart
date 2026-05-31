import { AlertTriangle, CheckCircle2, ClipboardList, PackageCheck, Timer, Users, Wrench } from "lucide-react";

const kpis = [
  ["42", "Inquiry terbuka", "12 minat tinggi", "warning"],
  ["7", "Follow-up melewati SLA", "Risiko lewat SLA", "danger"],
  ["18", "Peluang minat tinggi", "+5 dari kemarin", "good"],
  ["82%", "Kapasitas layanan berisiko", "Tim instalasi mendekati batas", "warning"],
  ["9", "Risiko terkait stok", "3 risiko habis", "warning"],
  ["4", "Keputusan menunggu persetujuan", "Review CEO / Ops", "neutral"],
];

const decisionRows = [
  ["P1", "Layanan", "Follow-up instalasi naik pada klaster keselamatan dan plumbing", "Review kapasitas teknisi dan SLA hari ini", "Menurunkan risiko antrean layanan", "Ops Manager", "Butuh persetujuan"],
  ["P1", "Paket", "Klaster keamanan kamar mandi menjadi sinyal permintaan terkuat", "Prioritaskan Paket Kamar Mandi Aman", "Meningkatkan conversion untuk basket minat tinggi", "Category Manager", "Siap"],
  ["P2", "Stok", "Pompa dan fitting pipa terkait beberapa inquiry urgent", "Pantau stok pump/plumbing dan siapkan substitusi", "Mengurangi risiko rekomendasi kosong", "Product Manager", "Sedang direview"],
  ["P2", "Knowledge", "Pertanyaan plumbing dan paint berulang belum lengkap mapping-nya", "Update knowledge mapping plumbing dan paint", "Rekomendasi lebih konsisten dan auditable", "Technical Admin", "Berjalan"],
];

const workQueueRows = [
  ["INQ-001", "09:12", "Kamar mandi licin untuk lansia", "Keamanan kamar mandi", "Paket Kamar Mandi Aman", "Hari ini 14:00", "3j 10m", "Rina", "Hubungi pelanggan dan konfirmasi kebutuhan instalasi", "P1"],
  ["INQ-002", "09:35", "Pipa dapur bocor", "Kebocoran air", "Paket Anti Bocor", "Hari ini 13:00", "2j 47m", "Agus", "Validasi cakupan repair", "P1"],
  ["INQ-003", "10:05", "Bingung memilih cat", "Pemilihan cat", "Paket Cat Ruangan", "Hari ini 16:00", "2j 17m", "Maya", "Kirim alur konsultasi warna", "P2"],
  ["INQ-004", "10:28", "Pompa air lemah", "Pump & plumbing", "Paket Pompa & Plumbing", "Besok 10:00", "1j 54m", "Budi", "Cek stok pompa dan slot layanan", "P2"],
  ["INQ-005", "11:02", "Renovasi dapur", "Kitchen renovation", "Paket Dapur Praktis", "Besok 13:00", "1j 20m", "Sari", "Jadwalkan konsultasi project", "P2"],
  ["INQ-006", "11:24", "Lampu rumah redup", "Peningkatan pencahayaan", "Paket Pencahayaan Hemat Energi", "Besok 15:00", "58m", "Dika", "Rekomendasikan paket hemat energi", "P3"],
];

const demandRows = [
  ["Keamanan kamar mandi", "32", "Tinggi", "Paket Kamar Mandi Aman", "Stok grab bar perlu dipantau", "Follow-up instalasi", "Prioritaskan guided safety bundle"],
  ["Kebocoran air", "24", "Tinggi", "Paket Anti Bocor", "Sealant/fitting perlu dipantau", "Arahan repair", "Petakan pertanyaan kebocoran berulang"],
  ["Pemilihan cat", "21", "Sedang", "Paket Cat Ruangan", "Aman", "Alur konsultasi", "Siapkan skrip konsultasi cat"],
  ["Pump & plumbing", "18", "Sedang", "Paket Pompa & Plumbing", "Risiko habis pada pump populer", "Survey ringan", "Review produk substitusi"],
  ["Kitchen renovation", "17", "Sedang", "Paket Dapur Praktis", "Belum terhubung", "Konsultasi project", "Arahkan ke staff project"],
  ["Peningkatan pencahayaan", "16", "Rendah", "Paket Pencahayaan Hemat Energi", "Aman", "Instalasi opsional", "Dorong cross-sell hemat energi"],
];

const alertRows = [
  ["Antrean follow-up melewati SLA", "Layanan", "Tinggi", "7 tiket melewati SLA", "Tugaskan staff cadangan sebelum closing", "Ops Manager", "Open"],
  ["Kapasitas layanan mendekati batas", "Layanan", "Sedang", "Permintaan instalasi meningkat", "Review slot instalasi dan coverage staff", "Ops Manager", "Monitoring"],
  ["Risiko rekomendasi terkait stok", "Produk & Stok", "Sedang", "Item pump/plumbing flagged", "Siapkan daftar produk substitusi", "Product Manager", "Sedang direview"],
  ["Gap knowledge mapping", "AI & Automation", "Sedang", "Input plumbing dan paint berulang", "Update aturan mapping dan catatan Audit", "Technical Admin", "Berjalan"],
  ["Fallback policy sehat", "AI & Automation", "Rendah", "Jalur LLM opsional", "Pertahankan downstream Workflow deterministik", "Technical Admin", "Operational"],
];

export function CommandOverview() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Ringkasan Komando Operasional</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Tampilan terkini untuk permintaan pelanggan, risiko follow-up, kesiapan paket, kapasitas layanan, dan keputusan bisnis.
            </h1>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Update terakhir: Hari ini 11:42 WIB</span>
              <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Sumber data: pratinjau lokal, contoh inquiry pelanggan, Workflow terkonfigurasi</span>
              <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Versi Workflow: MAS Retail OS v0.4</span>
              <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Human review: wajib untuk keputusan P1</span>
            </div>
          </div>
          <div className="rounded-lg border border-amber-300/20 bg-amber-400/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">Sinyal Permintaan Teratas</p>
            <p className="mt-3 text-lg font-semibold leading-7 text-white">
              Klaster keamanan kamar mandi saat ini menjadi sinyal pelanggan berminat tinggi yang paling kuat.
            </p>
            <p className="mt-2 text-sm leading-6 text-amber-100/80">
              AI membantu klasifikasi, dukungan rekomendasi, status Fallback, dan traceability Audit.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        {kpis.map(([value, label, note, status], index) => {
          const icons = [ClipboardList, Timer, PackageCheck, Wrench, AlertTriangle, CheckCircle2];
          const Icon = icons[index] ?? Users;
          return (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-start justify-between gap-3">
                <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
                <StatusBadge status={status} />
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
            </div>
          );
        })}
      </div>

      <DataTable title="Antrean Keputusan" headers={["Prioritas", "Area Keputusan", "Temuan Bisnis", "Rekomendasi Tindakan", "Dampak Bisnis", "Owner", "Status"]} rows={decisionRows} />
      <DataTable title="Antrean Kerja Operasional" headers={["Inquiry ID", "Dibuat", "Kebutuhan Pelanggan", "Klaster Permintaan", "Paket Rekomendasi", "SLA Due", "Aging", "PIC", "Next Action", "Prioritas"]} rows={workQueueRows} />
      <DataTable title="Sinyal Permintaan" headers={["Klaster", "Jumlah Inquiry", "Level Minat", "Peluang Paket", "Dependensi Stok", "Dependensi Layanan", "Aksi Disarankan"]} rows={demandRows} />
      <DataTable title="Alert Risiko dan Exception" headers={["Alert", "Area", "Level Risiko", "Trigger", "Rekomendasi Tindakan", "Owner", "Status"]} rows={alertRows} />
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes = {
    good: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
    warning: "border-amber-300/30 bg-amber-400/10 text-amber-200",
    danger: "border-red-300/30 bg-red-400/10 text-red-200",
    neutral: "border-white/10 bg-white/10 text-slate-300",
  }[status] ?? "border-white/10 bg-white/10 text-slate-300";

  const label = {
    good: "On track",
    warning: "Pantau",
    danger: "Berisiko",
    neutral: "Review",
  }[status] ?? "Status";

  return <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${classes}`}>{label}</span>;
}

function DataTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")} className="transition hover:bg-white/[0.045]">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className={`px-4 py-4 leading-6 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`}>
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
