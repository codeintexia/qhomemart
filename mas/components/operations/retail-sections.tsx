import { ArrowRight, Settings } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";

const customerRows = [
  ["INQ-001", "Kamar mandi licin untuk lansia", "Keamanan kamar mandi", "Caregiver household", "Hemat dulu", "Tinggi", "Selesai"],
  ["INQ-002", "Pipa bocor di bawah wastafel", "Kebocoran air", "Repair shopper", "Sedang", "Tinggi", "Perlu follow-up"],
  ["INQ-003", "Bingung memilih cat kamar anak", "Pemilihan cat", "Family planner", "Sedang", "Sedang", "Dalam intake"],
  ["INQ-004", "Pompa air lemah dan sering mati", "Pompa & plumbing", "Home maintenance", "Hemat dulu", "Sedang", "Butuh layanan"],
  ["INQ-005", "Ingin renovasi dapur kecil", "Renovasi dapur", "Project planner", "Lengkap", "Sedang", "Perlu konsultasi"],
  ["INQ-006", "Lampu rumah kurang terang", "Pencahayaan rumah", "Energy saver", "Hemat dulu", "Rendah", "Rekomendasi siap"],
];

const journeyRows = [
  ["Input masalah", "128", "Rendah", "Masalah pelanggan terkumpul", "Masuk dari guided intake"],
  ["Intake terpandu", "34", "Sedang", "Konteks dan preferensi", "Beberapa sesi butuh staf"],
  ["Triage AI", "32", "Rendah", "Kategori masalah", "Customer Triage dapat LLM-assisted saat configured"],
  ["Normalisasi", "32", "Rendah", "Canonical state", "Membuat matching stabil"],
  ["Paket solusi", "18", "Sedang", "Bundle kandidat", "Perlu review category"],
  ["Staff handoff", "11", "Sedang", "Ringkasan staf", "Terkait layanan"],
  ["Insight bisnis", "8", "Rendah", "Keputusan prioritas", "Siap dibahas manajemen"],
];

const bundleRows = [
  ["Paket Kamar Mandi Aman", "Safety", "Kamar mandi licin", "Anti-slip mat, grab bar", "Lampu terang, rak rendah", "Instalasi pegangan", "Prioritas"],
  ["Paket Anti Bocor", "Plumbing", "Kebocoran air", "Sealant, fitting pipa", "Kunci pipa, tape", "Repair follow-up", "Perlu layanan"],
  ["Paket Cat Ruangan", "Paint", "Pemilihan cat", "Cat interior", "Primer, roller, kuas", "Konsultasi warna", "Siap campaign"],
  ["Paket Pompa & Plumbing", "Pump", "Pompa air lemah", "Pompa air", "Pipa, valve, fitting", "Survey ringan", "Perlu review"],
  ["Paket Dapur Praktis", "Kitchen", "Renovasi dapur", "Sink, storage", "Lighting, organizer", "Konsultasi project", "Dalam pengembangan"],
  ["Paket Pencahayaan Hemat Energi", "Lighting", "Rumah kurang terang", "LED bulb, fixture", "Sensor, extension", "Instalasi opsional", "Siap"],
];

const serviceRows = [
  ["Instalasi pegangan kamar mandi", "Keamanan kamar mandi", "11", "Staff follow-up", "Hubungi pelanggan", "Prioritas"],
  ["Repair kebocoran ringan", "Kebocoran air", "9", "Review teknis", "Validasi kebutuhan", "Pantau"],
  ["Konsultasi cat", "Pemilihan cat", "7", "Staff toko", "Bantu pilih warna", "Siap"],
  ["Survey pompa air", "Pompa & plumbing", "6", "Staff teknis", "Cek kapasitas layanan", "Perlu review"],
  ["Konsultasi dapur", "Renovasi dapur", "5", "Project staff", "Jadwalkan diskusi", "Dalam pengembangan"],
  ["Instalasi lighting", "Pencahayaan rumah", "4", "Staff follow-up", "Tawarkan opsi", "Siap"],
];

const insightRows = [
  ["Safety bundle kuat", "32 input safety", "Peluang campaign dan basket safety", "Prioritaskan Paket Kamar Mandi Aman", "P1", "Siap"],
  ["Plumbing berulang", "24 input leakage/plumbing", "Butuh mapping produk dan layanan", "Perkaya knowledge mapping plumbing", "P2", "Dalam pengembangan"],
  ["Paint butuh konsultasi", "21 input cat", "Mendorong assisted selling", "Buat alur konsultasi cat", "P2", "Siap dibuat"],
  ["Layanan meningkat", "11 follow-up layanan", "Risiko antrean operasional", "Review kapasitas staf layanan", "P1", "Pantau"],
  ["Staff script dibutuhkan", "Cluster minat tinggi", "Kualitas respons lebih konsisten", "Siapkan skrip toko", "P2", "Siap dibuat"],
];

const operationRows = [
  ["Workflow health", "Operational", "Rendah", "Pertahankan deterministic workflow", "Sehat"],
  ["Service follow-up", "Antrean naik", "Sedang", "Review kapasitas layanan", "Pantau"],
  ["Staff readiness", "Ringkasan siap", "Rendah", "Gunakan skrip assisted selling", "Siap"],
  ["Knowledge mapping", "Perlu update", "Sedang", "Update plumbing dan cat", "Dalam pengembangan"],
  ["Fallback readiness", "Aktif", "Rendah", "Pertahankan governance", "Sehat"],
];

export function CustomersSection() {
  return (
    <RetailSection eyebrow="Pelanggan" title="Tabel Input Pelanggan" description="Daftar ringkas input pelanggan dari beberapa klaster kebutuhan.">
      <DataTable headers={["ID", "Ringkasan Input", "Klaster Masalah", "Segmen", "Budget Signal", "Urgensi", "Status Workflow"]} rows={customerRows} />
    </RetailSection>
  );
}

export function JourneysSection({ workflow }: { workflow: WorkflowRunResult }) {
  const stages = ["Input masalah", "Intake terpandu", "Triage AI", "Normalisasi", "Paket solusi", "Staff handoff", "Insight bisnis"];
  return (
    <RetailSection eyebrow="Alur Pelanggan" title="Funnel Journey dan Status Workflow" description="Funnel agregat dari banyak input pelanggan. Bathroom safety hanya satu contoh kasus terpilih.">
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <div className="flex min-w-[920px] items-center overflow-x-auto pb-2">
          {stages.map((stage, index) => (
            <div key={stage} className="flex flex-1 items-center">
              <div className="min-h-20 w-full rounded-lg border border-white/10 bg-slate-950/35 p-4">
                <p className="text-xs font-semibold text-slate-500">Stage {index + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{stage}</p>
              </div>
              {index < stages.length - 1 && <ArrowRight className="mx-2 h-4 w-4 shrink-0 text-red-200/70" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
      <DataTable title="Tabel Status Journey" headers={["Stage", "Jumlah Sesi", "Drop-off / Risiko", "Output", "Catatan"]} rows={journeyRows} />
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contoh kasus terpilih</p>
        <p className="mt-2 text-lg font-semibold text-white">Kamar mandi licin untuk lansia</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{workflow.scenario.userStory}</p>
      </div>
    </RetailSection>
  );
}

export function ProductsBundlesSection() {
  return (
    <RetailSection eyebrow="Produk & Paket" title="Tabel Peluang Paket" description="Dashboard kategori untuk melihat kandidat paket, cross-sell, dan linkage layanan.">
      <DataTable headers={["Paket", "Kategori Produk", "Masalah Pelanggan", "Produk Utama", "Produk Pendukung", "Layanan Terkait", "Status"]} rows={bundleRows} />
    </RetailSection>
  );
}

export function ServicesSection() {
  return (
    <RetailSection eyebrow="Layanan" title="Tabel Permintaan Layanan" description="Sinyal layanan dari kebutuhan instalasi, repair, konsultasi, dan project request.">
      <DataTable headers={["Layanan", "Sumber Masalah", "Jumlah Sinyal", "Kebutuhan Staff", "Follow-up", "Status"]} rows={serviceRows} />
    </RetailSection>
  );
}

export function InsightsSection() {
  return (
    <RetailSection eyebrow="Insight Bisnis" title="Tabel Insight & Keputusan" description="Decision support untuk manajemen, operasional, category, marketing, dan training staf.">
      <DataTable headers={["Insight", "Bukti Data", "Dampak Bisnis", "Rekomendasi", "Prioritas", "Status"]} rows={insightRows} />
    </RetailSection>
  );
}

export function RetailOperationsSection() {
  return (
    <RetailSection eyebrow="Operasional" title="Tabel Status Operasional" description="Status area operasional yang perlu dipantau oleh tim internal.">
      <DataTable headers={["Area", "Kondisi", "Risiko", "Tindakan Disarankan", "Status"]} rows={operationRows} />
    </RetailSection>
  );
}

export function SettingsSection() {
  const sections = [
    ["Provider & API", [["API Provider", "Configurable"], ["Current provider", "Sumopod"], ["API Key", "configured / hidden"]]],
    ["Model selection", [["Active model", "Gemini 2.0 Flash"], ["Model selection", "configurable"]]],
    ["Routing policy", [["Routing policy", "local preview"], ["Live multi-model execution", "under construction"]]],
    ["Fallback policy", [["Fallback policy", "enabled"], ["Deterministic fallback", "active"]]],
    ["Knowledge mapping", [["Catalog mapping", "under construction"], ["Service mapping", "under construction"]]],
    ["Notification rules", [["Staff alert", "under construction"], ["Follow-up notification", "under construction"]]],
    ["Access control", [["Role management", "under construction"], ["Permission model", "under construction"]]],
  ];

  return (
    <RetailSection eyebrow="Pengaturan" title="Area Pengaturan Admin" description="Form shell internal. Tidak menyimpan data dan tidak menampilkan API key asli.">
      <div className="grid gap-4 xl:grid-cols-2">
        {sections.map(([title, rows]) => (
          <div key={title as string} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <div className="mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4 text-red-200" aria-hidden="true" />
              <h3 className="text-base font-semibold text-white">{title as string}</h3>
            </div>
            <div className="space-y-3">
              {(rows as string[][]).map(([label, value]) => (
                <label key={label} className="grid gap-2 md:grid-cols-[180px_1fr] md:items-center">
                  <span className="text-sm text-slate-400">{label}</span>
                  <input disabled value={value} className="rounded-lg border border-white/10 bg-slate-950/45 px-3 py-2 text-sm text-slate-200 disabled:opacity-100" readOnly />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RetailSection>
  );
}

function RetailSection({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function DataTable({ title, headers, rows }: { title?: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
      {title && (
        <div className="border-b border-white/10 px-5 py-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
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
