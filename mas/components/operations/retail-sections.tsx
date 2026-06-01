import { Settings } from "lucide-react";

const segmentRows = [
  ["Rumah tangga caregiver", "32", "Keamanan kamar mandi", "Tinggi", "Hemat dulu", "Paket Kamar Mandi Aman", "Instalasi pegangan", "Tinggi", "Rina", "Konfirmasi kebutuhan instalasi dan risiko pengguna lansia", "Follow-up hari ini"],
  ["Pelanggan repair", "24", "Kebocoran air", "Tinggi", "Menengah", "Paket Anti Bocor", "Repair ringan", "Tinggi", "Agus", "Validasi lokasi bocor dan cakupan layanan", "Tugaskan staff layanan"],
  ["Perencana keluarga", "21", "Pemilihan cat", "Sedang", "Menengah", "Paket Cat Ruangan", "Konsultasi warna", "Sedang", "Maya", "Kirim panduan warna dan kebutuhan luas ruangan", "Perlu konsultasi"],
  ["Perawatan rumah", "18", "Pompa & plumbing", "Sedang", "Hemat dulu", "Paket Pompa & Plumbing", "Survey ringan", "Sedang", "Budi", "Cek stok pompa populer dan opsi substitusi", "Validasi kecocokan paket"],
  ["Perencana project", "17", "Renovasi dapur", "Sedang", "Lengkap", "Paket Dapur Praktis", "Konsultasi project", "Tinggi", "Sari", "Jadwalkan konsultasi kebutuhan project", "Perlu konsultasi"],
  ["Pencari hemat energi", "16", "Peningkatan pencahayaan", "Rendah", "Hemat dulu", "Paket Lighting Hemat Energi", "Instalasi opsional", "Sedang", "Dika", "Dorong cross-sell fixture dan lampu hemat energi", "Paket siap"],
  ["Pelanggan butuh arahan toko", "14", "Butuh arahan staff", "Sedang", "Belum jelas", "Paket Starter Perawatan Rumah", "Follow-up toko", "Sedang", "Store Lead", "Tentukan kategori utama sebelum rekomendasi paket", "Validasi kecocokan paket"],
];

const customerSummaryCards = [
  ["7", "Segmen pelanggan aktif", "Segmen yang memiliki inquiry berjalan", "Aman"],
  ["2", "Klaster urgency tinggi", "Keamanan kamar mandi dan kebocoran air", "Pantau"],
  ["11", "Follow-up terbuka", "Butuh tindak lanjut staff hari ini", "Aksi"],
  ["6", "Peluang paket terestimasi", "Paket siap dipetakan ke kebutuhan pelanggan", "Siap"],
];

const customerValidationBadges = [
  ["Sumber klasifikasi", "Assisted classification + deterministic package mapping"],
  ["Confidence", "Menengah-tinggi untuk klaster permintaan berulang"],
  ["Status review", "Human review wajib untuk follow-up P1"],
  ["Auditability", "Inquiry, owner, next action, dan kecocokan paket dapat ditelusuri"],
];

const inquiryRows = [
  ["INQ-001", "31 Mei 09:12", "Web", "Kamar mandi licin untuk lansia", "Tinggi", "Kritis", "31 Mei 14:00", "5j 13m", "Paket Kamar Mandi Aman", "Instalasi: teknisi dibutuhkan", "Rp 1.500.000", "Qualified", "Risiko SLA", "Rina", "Hubungi pelanggan dan konfirmasi kebutuhan instalasi", "Follow-up hari ini"],
  ["INQ-002", "31 Mei 09:35", "Store", "Pipa dapur bocor", "Tinggi", "Tinggi", "31 Mei 13:00", "4j 50m", "Paket Anti Bocor", "Layanan: kapasitas terbatas", "Rp 850.000", "Pending Follow-up", "Supervisor review", "Agus", "Validasi ketersediaan layanan", "Perlu supervisor review"],
  ["INQ-003", "31 Mei 10:05", "WhatsApp", "Bingung memilih cat untuk kamar anak", "Sedang", "Sedang", "31 Mei 16:00", "4j 20m", "Paket Cat Ruangan", "Konsultasi: arahan staff", "Rp 1.200.000", "Proposal dikirim", "Normal", "Maya", "Kirim checklist konsultasi warna", "Menunggu respons pelanggan"],
  ["INQ-004", "31 Mei 10:28", "Call Center", "Pompa air lemah", "Sedang", "Tinggi", "1 Jun 10:00", "3j 57m", "Paket Pompa & Plumbing", "Stok: cek ketersediaan pompa", "Rp 2.100.000", "Qualified", "Perlu perhatian", "Budi", "Cek stok dan assign teknisi jika tersedia", "Pending validation"],
  ["INQ-005", "31 Mei 11:02", "Web", "Renovasi dapur sederhana", "Sedang", "Sedang", "1 Jun 13:00", "3j 23m", "Paket Dapur Praktis", "Survey: dibutuhkan", "Rp 4.500.000", "Qualified", "Risiko kapasitas", "Sari", "Jadwalkan survey dan siapkan quotation", "Perlu assignment layanan"],
  ["INQ-006", "31 Mei 11:24", "Store", "Lampu rumah kurang terang", "Rendah", "Rendah", "1 Jun 15:00", "3j 01m", "Paket Pencahayaan Hemat Energi", "Stok: tersedia", "Rp 650.000", "Ready to Close", "Normal", "Dika", "Siapkan rekomendasi cross-sell", "Paket siap"],
  ["INQ-007", "31 Mei 12:10", "WhatsApp", "Butuh produk untuk perawatan rumah bulanan", "Sedang", "Rendah", "2 Jun 10:00", "2j 15m", "Paket Starter Perawatan Rumah", "Package fit: perlu review", "Rp 900.000", "Pending Follow-up", "Perlu perhatian", "Store Lead", "Validasi kecocokan paket sebelum rekomendasi", "Pending validation"],
];

const inquirySummaryCards = [
  ["128", "Inquiry terbuka", "+12 hari ini", "On track"],
  ["18", "Urgency tinggi", "Perlu prioritas staff", "Attention"],
  ["11", "SLA overdue", "Butuh supervisor review", "Risk"],
  ["23", "Pending validation", "Butuh cek stok/layanan", "Review"],
  ["31", "Siap convert", "Paket siap ditawarkan", "Ready"],
];

const inquiryTraceabilityBadges = [
  ["Sumber klasifikasi", "Rule Engine + assisted classification"],
  ["Sumber rekomendasi", "Package Mapping v2.4"],
  ["Confidence", "Rata-rata 91% pada klaster demand berulang"],
  ["Status review", "Tervalidasi secara operasional"],
];

const productRows = [
  ["Safety", "Anti-slip mat, grab bar", "Aman", "48 unit", "12 unit", "32 inquiry keamanan kamar mandi", "Paket Kamar Mandi Aman: Ready, alternatif: anti-slip tape", "Supplier safety lokal", "Rina", "Cek display stock hari ini", "P2 / Due: Today / Risk: Low", "Package ready"],
  ["Plumbing", "Sealant, fitting pipa", "Low Stock", "14 unit", "20 unit", "24 inquiry kebocoran air", "Paket Anti Bocor: At Risk, sealant low stock", "Manual snapshot toko", "Agus", "Reorder sealant dan pipe fittings", "P1 / Due: Today / Risk: High", "Reorder needed"],
  ["Paint", "Cat interior, primer", "Aman", "76 unit", "25 unit", "21 inquiry pemilihan cat", "Paket Cat Ruangan: Ready, missing item: none", "Product catalog", "Maya", "Siapkan item pendukung untuk konsultasi warna", "P3 / Due: This week / Risk: Low", "Ready"],
  ["Pump", "Pompa air, valve", "At Risk", "9 unit", "15 unit", "18 inquiry pump & plumbing", "Paket Pompa & Plumbing: At Risk, pump populer terbatas", "Warehouse snapshot", "Budi", "Validasi stock pompa dengan warehouse", "P1 / Due: Today / Risk: High", "Warehouse check"],
  ["Kitchen", "Sink, storage", "Unlinked", "Belum terhubung", "Belum tersedia", "17 inquiry renovasi dapur", "Paket Dapur Praktis: Blocked, kitchen catalog unlinked", "Belum terhubung", "Sari", "Link kitchen items ke product catalog", "P2 / Due: This week / Risk: Medium", "Catalog linking"],
  ["Lighting", "LED bulb, fixture", "Aman", "92 unit", "30 unit", "16 inquiry pencahayaan rumah", "Paket Lighting Hemat Energi: Ready, alternatif: LED warm white", "Product catalog", "Dika", "Siapkan substitute item untuk fixture populer", "P3 / Due: Next cycle / Risk: Low", "Ready"],
  ["Tools", "Kunci pipa, tape, roller", "Low Stock", "18 unit", "25 unit", "Cross-sell dari plumbing dan paint", "Paket Anti Bocor dan Cat Ruangan: At Risk pada item pendukung", "Manual snapshot toko", "Store Lead", "Assign inventory staff untuk stock count", "P2 / Due: Today / Risk: Medium", "Stock count required"],
];

const productSummaryCards = [
  ["8", "Stock at Risk", "Pump dan plumbing perlu review hari ini", "Risk"],
  ["3", "Package Impacted", "Paket terdampak stock dependency", "Pantau"],
  ["4", "Low Stock Items", "Butuh cek ulang display dan warehouse", "Action"],
  ["12", "Unlinked Products", "Belum terhubung ke product catalog", "Review"],
  ["5", "Reorder Needed", "Item perlu replenishment priority", "P1"],
];

const productConnectionBadges = [
  ["Stock data", "Manual snapshot"],
  ["Price data", "Not connected"],
  ["Product catalog", "Partially connected"],
  ["Package mapping", "Active"],
  ["Supplier sync", "Not connected"],
];

const productTraceabilityBadges = [
  ["Mapping source", "Rule-based package map"],
  ["Confidence", "87% untuk package dependency berulang"],
  ["Review", "Inventory staff required"],
  ["Auditability", "Stock source, owner, due, dan next action dapat ditelusuri"],
];

const bundleRows = [
  ["Paket Kamar Mandi Aman", "Kamar mandi licin", "Anti-slip mat, grab bar", "Lampu terang, rak rendah", "Instalasi pegangan", "Prioritas"],
  ["Paket Anti Bocor", "Pipa bocor", "Sealant, fitting pipa", "Kunci pipa, tape", "Repair follow-up", "Perlu layanan"],
  ["Paket Cat Ruangan", "Bingung memilih cat", "Cat interior", "Primer, roller, kuas", "Konsultasi warna", "Siap campaign"],
  ["Paket Pompa & Plumbing", "Pompa air lemah", "Pompa air", "Pipa, valve, fitting", "Survey ringan", "Perlu review"],
  ["Paket Dapur Praktis", "Renovasi dapur", "Sink, storage", "Lighting, organizer", "Konsultasi project", "Dalam pengembangan"],
  ["Paket Pencahayaan Hemat Energi", "Lampu rumah redup", "LED bulb, fixture", "Sensor, extension", "Instalasi opsional", "Siap"],
];

const serviceRows = [
  ["Instalasi pegangan kamar mandi", "Keamanan kamar mandi", "11", "Installation", "Limited", "Ready to Schedule", "Grab bar, anti-slip mat, Paket Kamar Mandi Aman", "Rp 1.500.000", "Rina", "Call customer today dan konfirmasi titik pemasangan", "Today 16:00", "P1 / Risk: Medium / Due: Today"],
  ["Repair kebocoran ringan", "Kebocoran air", "9", "Repair", "At Risk", "Needs Scope Validation", "Sealant, fitting pipa, Paket Anti Bocor", "Rp 850.000", "Agus", "Validate service scope dan cek kapasitas teknisi", "Today 15:00", "P1 / Risk: High / Due: Today"],
  ["Konsultasi cat", "Pemilihan cat", "7", "Consultation", "Available", "Ready to Schedule", "Cat interior, primer, Paket Cat Ruangan", "Rp 1.200.000", "Maya", "Convert to package offer dengan checklist warna", "Today 17:00", "P2 / Risk: Low / Due: Today"],
  ["Survey pompa air", "Pompa & plumbing", "6", "Survey", "Limited", "Requires Survey", "Pompa air, valve, Paket Pompa & Plumbing", "Rp 2.100.000", "Budi", "Check technician capacity dan schedule site survey", "1 Jun 10:00", "P1 / Risk: High / Due: This Week"],
  ["Konsultasi dapur", "Renovasi dapur", "5", "Project Request", "Needs Review", "Waiting Customer Confirmation", "Sink, storage, Paket Dapur Praktis", "Rp 4.500.000", "Sari", "Prepare service quotation dan validasi scope project", "1 Jun 14:00", "P2 / Risk: Medium / Due: This Week"],
  ["Instalasi lighting", "Pencahayaan rumah", "4", "Installation", "Available", "Ready to Schedule", "LED bulb, fixture, Paket Pencahayaan Hemat Energi", "Rp 650.000", "Dika", "Assign service team untuk slot instalasi ringan", "2 Jun 11:00", "P3 / Risk: Low / Due: Next Cycle"],
  ["Paket anti bocor lanjutan", "Kebocoran berulang", "3", "Repair", "Blocked", "Not Ready", "Sealant low stock, fitting pipa, Paket Anti Bocor", "Rp 1.100.000", "Ops Manager", "Escalate capacity risk to Ops Manager", "Today 18:00", "P1 / Risk: High / Due: Today"],
];

const serviceSummaryCards = [
  ["45", "Active Service Requests", "Permintaan layanan dari inquiry dan store request", "Open"],
  ["3", "Capacity at Risk", "Survey dan instalasi perlu review kapasitas", "Risk"],
  ["12", "Follow-up Due Today", "Butuh eksekusi staff sebelum closing", "Today"],
  ["7", "Ready to Schedule", "Sudah lolos validasi scope layanan", "Ready"],
  ["5", "Services in Validation", "Menunggu scope dan dependency check", "Review"],
];

const serviceTraceabilityBadges = [
  ["Mapping source", "Rule-based service map"],
  ["Confidence", "88% untuk service dependency berulang"],
  ["Review status", "Ops reviewed"],
  ["Scheduling", "Manual coordination"],
];

const followUpRows = [
  ["TKT-001", "INQ-001", "Kamar mandi licin untuk lansia", "P1", "Rina", "Today 15:00", "Overdue 1h", "WhatsApp, 10:15", "2/3", "Call customer before 15:00", "SLA Risk", "Rp 1.500.000", "Qualified", "Overdue"],
  ["TKT-002", "INQ-002", "Pipa dapur bocor", "P1", "Agus", "Today 16:00", "5h", "Call, 11:05", "1/3", "Validate installation requirement", "Service Dependency", "Rp 850.000", "Follow-up", "In Progress"],
  ["TKT-003", "INQ-004", "Pompa air lemah", "P1", "Budi", "Today 17:00", "6h", "No contact yet", "0/3", "Check service capacity dan confirm product availability", "Capacity Risk", "Rp 2.100.000", "Qualified", "Due Today"],
  ["TKT-004", "INQ-005", "Renovasi dapur sederhana", "P2", "Sari", "Tomorrow 10:00", "1d", "WhatsApp, yesterday 16:00", "1/3", "Schedule customer consultation", "None", "Rp 4.500.000", "Waiting Customer", "Scheduled"],
  ["TKT-005", "INQ-003", "Bingung memilih cat untuk kamar anak", "P2", "Maya", "Today 14:30", "Closed 30m", "WhatsApp, 13:45", "2/3", "Close ticket after confirmation", "None", "Rp 1.200.000", "Closed Won", "Closed"],
  ["TKT-006", "INQ-007", "Butuh paket perawatan rumah bulanan", "P2", "Store Lead", "Today 18:00", "3h", "No contact yet", "0/3", "Send package option via WhatsApp", "Product Dependency", "Rp 900.000", "Follow-up", "New"],
  ["TKT-007", "INQ-006", "Lampu rumah kurang terang", "P3", "Dika", "Tomorrow 11:00", "2h", "Store note, 12:20", "1/3", "Confirm product availability", "None", "Rp 650.000", "Ready to Close", "Waiting Customer"],
];

const followUpSummaryCards = [
  ["37", "Open Follow-ups", "Ticket aktif di queue staff", "Open"],
  ["14", "Due Today", "Perlu selesai sebelum 17:00", "Today"],
  ["3", "Overdue", "Butuh supervisor review", "Risk"],
  ["5", "Escalated", "SLA, kapasitas, atau dependency risk", "Escalation"],
  ["9", "Closed Today", "Follow-up selesai dan tercatat", "Closed"],
];

const staffWorkloadRows = [
  ["Rina", "8", "3", "1", "At Risk"],
  ["Agus", "6", "2", "0", "Normal"],
  ["Budi", "9", "4", "2", "Overloaded"],
  ["Maya", "4", "1", "0", "Normal"],
  ["Sari", "5", "2", "0", "Normal"],
  ["Dika", "3", "1", "0", "Normal"],
];

const followUpTraceabilityBadges = [
  ["Workflow source", "Follow-up Workflow v1.4"],
  ["SLA rule", "Active"],
  ["Assignment source", "Manual by Ops"],
  ["Review status", "Ops monitored"],
  ["Audit trail", "Logged"],
];

const insightRows = [
  ["Demand safety bundle meningkat", "32 inquiry terkait keamanan kamar mandi dari Web + Store", "14 hari terakhir", "Potensi revenue: Rp 8.000.000 dan package conversion lebih tinggi", "Stock + Service Capacity + Package Mapping", "Prioritaskan Paket Kamar Mandi Aman", "Category Lead", "P1", "3 Juni 2026", "Decision Required", "Confidence 92% / Review: tervalidasi Ops / Outcome: package conversion naik"],
  ["Inquiry plumbing berulang", "24 inquiry plumbing dan kebocoran air, 9 membutuhkan repair follow-up", "14 hari terakhir", "Risiko service bottleneck dan potensi kehilangan basket repair", "Service Capacity + Supplier + Follow-up Process", "Tambah kapasitas survey plumbing dan reorder item anti bocor", "Operations Manager", "P1", "Hari ini", "In Execution", "Confidence 89% / Review: Ops reviewed / Outcome: service queue turun"],
  ["Konsultasi cat mendorong conversion", "21 inquiry pemilihan cat, 7 konsultasi staff menghasilkan proposal", "30 hari terakhir", "Potensi conversion: +12% jika script konsultasi distandardisasi", "Staff Training + Product Catalog + Campaign", "Siapkan script konsultasi cat untuk staff toko", "Store Lead", "P2", "Minggu ini", "Needs Review", "Confidence 84% / Review: menunggu category review / Outcome: konsistensi staff naik"],
  ["Service queue mulai menjadi bottleneck", "11 follow-up layanan meningkat week-over-week dan 3 ticket overdue", "7 hari terakhir", "Risiko reputasi pelanggan dan SLA breach", "Service Capacity + Scheduling + Staff Workload", "Escalate capacity risk dan review allocation staff", "Service Coordinator", "P1", "Hari ini", "Monitoring", "Confidence 91% / Review: tervalidasi Ops / Outcome: overdue follow-up turun"],
  ["Kitchen package belum siap campaign", "17 inquiry renovasi dapur, tetapi product catalog masih partially connected", "30 hari terakhir", "Campaign opportunity tertahan sampai dependency catalog selesai", "Product Catalog + Package Mapping + Stock", "Tunda campaign sampai package readiness confirmed", "Product Manager", "P2", "Minggu ini", "Blocked", "Confidence 78% / Review: butuh validasi inventory / Outcome: stock risk turun"],
  ["Follow-up menjadi conversion gate", "37 open follow-ups, 14 due today, 5 escalated", "7 hari terakhir", "Revenue opportunity tertahan di queue staff", "Follow-up Process + Staff Workload + SLA Rule", "Tetapkan daily follow-up review sebelum closing", "Operations Manager", "P1", "Hari ini", "Approved", "Confidence 90% / Review: Ops monitored / Outcome: execution follow-up membaik"],
];

const insightSummaryCards = [
  ["4", "P1 Decisions", "Memerlukan keputusan minggu ini", "Decision"],
  ["Rp 18.500.000", "Revenue Opportunities", "Berdasarkan demand signal aktif", "Opportunity"],
  ["3", "Operational Risks", "Butuh mitigasi segera", "Risk"],
  ["6", "Pending Owner Actions", "Menunggu action dari owner", "Action"],
  ["2", "Insights Under Validation", "Butuh review data tambahan", "Review"],
];

const insightTraceabilityBadges = [
  ["Signal source", "Workflow signal aggregation"],
  ["Workflow", "Decision Workflow v1.3"],
  ["Review status", "Management reviewed"],
  ["Audit trail", "Evidence, owner, due, dan status tersimpan"],
];

const operationRows = [
  ["Workflow health", "Workflow Governance", "99.2% successful workflow runs", ">= 98%", "Within control range / Escalation: None", "Low", "Retail workflow tetap stabil dan auditable", "Technical Reviewer", "Validate workflow log summary before weekly review", "This Week", "Healthy"],
  ["Service follow-up", "Service Ops", "27 open follow-ups", "20", "Queue above threshold / Escalation: Capacity Risk", "Medium", "Risk of delayed customer response", "Service Coordinator", "Review open follow-up queue before 17:00", "Today 17:00", "Action Required"],
  ["Staff readiness", "Staff Ops", "85% script coverage", "90%", "Below readiness target / Escalation: Supervisor Review", "Low", "Response quality may vary across staff", "Staff Lead", "Prepare staff script for assisted selling", "Tomorrow 10:00", "Needs Review"],
  ["Knowledge mapping", "Knowledge Ops", "12 unmapped clusters", "5", "Mapping gap increasing / Escalation: Knowledge Gap", "Medium", "Recommendation consistency risk", "Knowledge Owner", "Update plumbing and paint knowledge map", "This Week", "In Progress"],
  ["Fallback readiness", "Fallback Governance", "3 fallback events today", "10", "Within safe range / Escalation: None", "Low", "Governance stable and manual handling available", "Technical Reviewer", "Validate fallback trigger log", "Today 18:00", "Monitoring"],
  ["Package readiness", "Retail Ops", "3 impacted packages", "1", "Package dependency above tolerance / Escalation: Technical Review", "Medium", "Campaign and basket conversion may be delayed", "Category Lead", "Run package readiness check", "Tomorrow 12:00", "Needs Review"],
  ["SLA follow-up", "Staff Ops", "8 SLA risks due today", "3", "SLA risk above threshold / Escalation: SLA Risk", "High", "Customer response delay and reputation risk", "Operations Manager", "Escalate SLA risk to Operations Manager", "Today 16:00", "Escalated"],
  ["Service capacity", "Service Ops", "3 capacity bottlenecks", "1", "Survey and installation capacity constrained / Escalation: Capacity Risk", "High", "Revenue opportunity blocked by service queue", "Operations Manager", "Assign additional service staff for survey requests", "Today 15:00", "Action Required"],
];

const operationSummaryCards = [
  ["8", "Active Operational Risks", "Area perlu monitoring atau action", "Open"],
  ["8", "SLA Risks", "Due today dan perlu supervisor review", "Risk"],
  ["3", "Capacity Bottlenecks", "Service follow-up dan survey perlu kapasitas tambahan", "High"],
  ["12", "Knowledge Gaps", "Cluster belum lengkap di knowledge mapping", "Review"],
  ["3", "Fallback Events", "Masih dalam batas aman", "Safe"],
];

const operationTraceabilityBadges = [
  ["Workflow source", "Deterministic Workflow v1.5"],
  ["Fallback log", "Active"],
  ["Rule status", "SLA threshold active"],
  ["Review", "Ops + Technical"],
  ["Audit trail", "Workflow log dan fallback trigger tersimpan"],
];

export function CustomersSection() {
  return (
    <RetailSection
      eyebrow="Pelanggan"
      title="Segmen Permintaan Pelanggan"
      description="Tampilan segmen kebutuhan pelanggan, peluang komersial, dependensi layanan, dan prioritas follow-up."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Update terakhir: Hari ini 11:42 WIB</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Sumber data: Inquiry, Follow-up, Package Mapping</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Versi Workflow: MAS Retail OS v0.4</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Human review: wajib untuk P1 dan layanan</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {customerSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        headers={[
          "Segmen",
          "Jumlah Inquiry",
          "Klaster Permintaan Utama",
          "Urgency",
          "Budget Signal",
          "Peluang Paket",
          "Dependensi Layanan",
          "Estimasi Nilai",
          "Owner",
          "Next Action",
          "Status",
        ]}
        rows={segmentRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Lapisan quality control</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {customerValidationBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function InquirySection() {
  return (
    <RetailSection
      eyebrow="Inquiry / Permintaan"
      title="Antrean Operasional Inquiry"
      description="Antrean kerja untuk permintaan pelanggan, kualifikasi kebutuhan, rekomendasi paket, eksekusi follow-up, dan koordinasi layanan."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Update terakhir: 31 Mei 2026 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Sumber data: Web, Store, WhatsApp, Call Center</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: v2.4</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: tervalidasi operasional</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {inquirySummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        minWidthClass="min-w-[1760px]"
        headers={[
          "Inquiry ID",
          "Dibuat",
          "Channel",
          "Kebutuhan Pelanggan",
          "Level Intent",
          "Urgency",
          "SLA Due",
          "Aging",
          "Paket Rekomendasi",
          "Dependency",
          "Estimasi Nilai",
          "Conversion Stage",
          "Escalation",
          "PIC",
          "Next Action",
          "Status",
        ]}
        rows={inquiryRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan kontrol review</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {inquiryTraceabilityBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function ProductsStockSection() {
  return (
    <RetailSection
      eyebrow="Produk & Stok"
      title="Inventory Risk & Package Readiness"
      description="Inventory view untuk memantau stock risk, package readiness, replenishment priority, dan product dependency."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Inventory source: Manual snapshot</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Product catalog: Partially connected</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Price sync: Not connected</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Stock Mapping v1.2</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: Needs inventory validation</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {productSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        minWidthClass="min-w-[1580px]"
        headers={[
          "Category",
          "Key Items / SKU",
          "Stock Status",
          "Stock Level",
          "Reorder Point",
          "Demand Signal",
          "Package Impact",
          "Supplier / Source",
          "Owner",
          "Next Action",
          "Priority / Due / Risk",
          "Status",
        ]}
        rows={productRows}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Status koneksi data</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {productConnectionBadges.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
                <p className="text-xs font-semibold text-slate-500">{label}</p>
                <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan review</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {productTraceabilityBadges.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
                <p className="text-xs font-semibold text-slate-500">{label}</p>
                <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RetailSection>
  );
}

export function BundlesSection() {
  return <RetailSection eyebrow="Paket & Bundling" title="Tabel Kandidat Bundle" description="Kandidat paket berdasarkan pola masalah pelanggan, produk utama, produk pendukung, dan layanan terkait."><DataTable headers={["Paket", "Masalah Pelanggan", "Produk Utama", "Produk Pendukung", "Layanan Terkait", "Status"]} rows={bundleRows} /></RetailSection>;
}

export function ServicesSection() {
  return (
    <RetailSection
      eyebrow="Layanan"
      title="Service Capacity & Execution Queue"
      description="Service view untuk memantau demand signal, kapasitas layanan, follow-up, schedule readiness, dan risiko eksekusi."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Data source: Inquiry, Store Request, Staff Follow-up</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Service Mapping v1.3</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Scheduling: Manual coordination</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: Ops reviewed</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {serviceSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        minWidthClass="min-w-[1540px]"
        headers={[
          "Service",
          "Demand Source",
          "Signal Count",
          "Service Type",
          "Capacity Status",
          "Schedule Readiness",
          "Product Dependency",
          "Estimated Value",
          "Owner",
          "Next Action",
          "SLA Due",
          "Status",
        ]}
        rows={serviceRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan review layanan</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {serviceTraceabilityBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function StaffFollowUpSection() {
  return (
    <RetailSection
      eyebrow="Staff Follow-up"
      title="Follow-up Execution Queue"
      description="Queue untuk memantau SLA, workload staff, next action, contact attempt, dan escalation follow-up pelanggan."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Data source: Inquiry, Staff Update, Service Queue</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Follow-up Workflow v1.4</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">SLA rule: Active</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: Ops monitored</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {followUpSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-white">Ringkasan workload staff</h3>
        <DataTable
          minWidthClass="min-w-[760px]"
          headers={["Staff", "Open Tickets", "Due Today", "Overdue", "Capacity Status"]}
          rows={staffWorkloadRows}
        />
      </div>

      <DataTable
        minWidthClass="min-w-[1700px]"
        headers={[
          "Ticket ID",
          "Inquiry ID",
          "Kebutuhan Pelanggan",
          "Priority",
          "Assigned Staff",
          "SLA Due",
          "Aging",
          "Last Contact",
          "Attempt",
          "Next Action",
          "Escalation",
          "Estimated Value",
          "Conversion Stage",
          "Status",
        ]}
        rows={followUpRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan audit trail</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {followUpTraceabilityBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function InsightsSection() {
  return (
    <RetailSection
      eyebrow="Insight Bisnis"
      title="Decision Intelligence Queue — Antrian Keputusan Bisnis"
      description="Ringkasan sinyal bisnis, bukti data, dampak, dependency, dan keputusan yang perlu ditindaklanjuti."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Update terakhir: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Periode analisis: 14 hari terakhir</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Sumber data: Inquiry, Product, Service, Follow-up</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Decision Workflow v1.3</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: sudah ditinjau manajemen</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {insightSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        minWidthClass="min-w-[1760px]"
        headers={[
          "Signal / Insight",
          "Evidence",
          "Period",
          "Business Impact",
          "Dependency",
          "Decision Required",
          "Owner",
          "Priority",
          "Due",
          "Status",
          "Confidence / Review / Expected Outcome",
        ]}
        rows={insightRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan decision review</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {insightTraceabilityBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function RetailOperationsSection() {
  return (
    <RetailSection
      eyebrow="Operasional"
      title="Operations Health & Control Queue"
      description="Pantauan lintas workflow, SLA, service capacity, staff readiness, knowledge mapping, fallback, dan escalation."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Monitoring period: Today</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Data sources: Inquiry, Service Queue, Staff Follow-up, Knowledge Map, Workflow Log</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Operations Control v1.5</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Review: Ops reviewed</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {operationSummaryCards.map(([value, label, note, status]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <DataTable
        minWidthClass="min-w-[1680px]"
        headers={[
          "Area",
          "Area Type",
          "Metric",
          "Threshold",
          "Current Condition",
          "Risk Level",
          "Business Impact",
          "Owner",
          "Next Action",
          "Due",
          "Status",
        ]}
        rows={operationRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Traceability dan governance review</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {operationTraceabilityBadges.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/35 p-3">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function SettingsSection() {
  const summaryCards = [
    ["Provider Status", "Configured", "Risk: Medium", "Action: Test connection"],
    ["Routing Policy", "Local preview", "Risk: High", "Action: Validate routing policy"],
    ["Fallback Readiness", "Enabled", "Risk: High", "Action: Review fallback rules"],
    ["Access Control", "In development", "Risk: Restricted", "Impact: role permission belum aktif"],
    ["Audit Logging", "Enabled", "Risk: Low", "Action: View audit trail"],
  ];

  const sections = [
    {
      title: "API Provider",
      risk: "Medium Risk",
      approval: "Approval not required",
      rollback: "Rollback available",
      action: "Test connection",
      disabledReason: "Disabled: requires production environment",
      rows: [
        ["Provider aktif", "Sumopod"],
        ["Provider status", "Configured"],
        ["Environment", "Local Preview"],
        ["Connection status", "Not tested in this session"],
        ["Last tested", "Not available in preview"],
      ],
    },
    {
      title: "API Key",
      risk: "Restricted",
      approval: "Approval required",
      rollback: "Rollback not available",
      action: "Validate key / Rotate key",
      disabledReason: "Disabled: secret not stored in UI",
      rows: [
        ["Status API key", "Configured / hidden"],
        ["Secret visibility", "Masked"],
        ["Storage mode", "Environment variable only"],
        ["Last rotated", "Not available in preview"],
        ["Secret handling", "Secret not stored in UI"],
      ],
    },
    {
      title: "Model Selection",
      risk: "High Risk",
      approval: "Pending technical review before production",
      rollback: "Rollback available",
      action: "Review model policy",
      disabledReason: "Disabled: requires technical review",
      rows: [
        ["Model aktif", "Gemini 2.0 Flash"],
        ["Use case", "Operational preview"],
        ["Selection mode", "Configurable"],
        ["Review requirement", "Technical review required before production"],
        ["Operational impact", "Model output tetap membutuhkan human review untuk customer-facing output"],
      ],
    },
    {
      title: "Routing Policy",
      risk: "High Risk",
      approval: "Pending technical review",
      rollback: "Rollback available",
      action: "Validate routing policy",
      disabledReason: "Disabled: confidence threshold belum final",
      rows: [
        ["Routing policy", "Local preview"],
        ["Routing mode", "Single-route preview"],
        ["Live multi-model execution", "In development"],
        ["Confidence threshold", "Needs configuration"],
        ["Human review", "Required for customer-facing output"],
      ],
    },
    {
      title: "Fallback Policy",
      risk: "High Risk",
      approval: "Approved",
      rollback: "Rollback available",
      action: "Review fallback rules",
      disabledReason: "Available after governance review",
      rows: [
        ["Fallback policy", "Enabled"],
        ["Deterministic fallback", "Active"],
        ["Trigger condition", "Low confidence, missing product data, service dependency unclear"],
        ["Fallback owner", "Operations Manager"],
        ["Audit status", "Logged"],
      ],
    },
    {
      title: "Knowledge Mapping",
      risk: "Medium Risk",
      approval: "Owner review required",
      rollback: "Rollback available",
      action: "Review mapping gap",
      disabledReason: "Disabled: mapping gap review belum selesai",
      rows: [
        ["Catalog mapping status", "In development"],
        ["Service mapping status", "In development"],
        ["Package mapping status", "Active preview"],
        ["Last reviewed", "31 Mei 2026"],
        ["Mapping owner", "Product Manager"],
        ["Operational impact", "Recommendation masih perlu human review"],
        ["Next step", "Review unmapped product and service clusters"],
      ],
    },
    {
      title: "Notification Rules",
      risk: "Medium Risk",
      approval: "Ops approval required",
      rollback: "Rollback available",
      action: "Configure notification rule",
      disabledReason: "Disabled: notification channel belum connected",
      rows: [
        ["Staff alert status", "In development"],
        ["Follow-up notification status", "In development"],
        ["SLA reminder status", "Needs configuration"],
        ["Escalation rule status", "Manual coordination"],
        ["Operational impact", "Staff alert masih manual"],
        ["Next step", "Define SLA reminder rule and escalation trigger"],
        ["Owner", "Operations Manager"],
      ],
    },
    {
      title: "Access Control",
      risk: "Restricted",
      approval: "Approval required",
      rollback: "Rollback not available for restricted changes",
      action: "Review access policy",
      disabledReason: "Disabled: permission model belum aktif",
      rows: [
        ["Role management", "In development"],
        ["Permission model", "In development"],
        ["Admin approval", "Required for restricted settings"],
        ["Restricted settings", "API key, routing policy, access control"],
        ["Audit requirement", "Required for all restricted changes"],
        ["Operational impact", "Role-based permission belum aktif"],
        ["Owner", "Technical Reviewer"],
      ],
    },
  ];

  const changeHistoryRows = [
    ["Routing Policy", "Local preview", "High Risk", "Today 14:10", "Admin", "Pending technical review", "Logged"],
    ["API Key", "Configured / hidden", "Restricted", "Not shown", "System", "Not applicable", "Protected"],
    ["Fallback Policy", "Enabled", "High Risk", "Today 13:40", "Admin", "Approved", "Logged"],
    ["Access Control", "In development", "Restricted", "Today 12:20", "Technical Reviewer", "Pending approval", "Logged"],
    ["Notification Rules", "Manual coordination", "Medium Risk", "Today 11:55", "Operations Manager", "Needs ops approval", "Logged"],
  ];

  return (
    <RetailSection
      eyebrow="Pengaturan"
      title="Admin Configuration & Governance"
      description="Pengaturan provider, routing, fallback, notification, access control, dan audit policy untuk operasi retail."
    >
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Environment: Local Preview</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Config version: Admin Config v0.8</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Governance: Configuration Policy v1.1</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Audit: Change logging enabled</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map(([label, value, risk, note]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-white">{label}</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{risk}</span>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">{value}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-red-200" aria-hidden="true" />
                <h3 className="text-base font-semibold text-white">{section.title}</h3>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-200">{section.risk}</span>
            </div>
            <div className="space-y-3">
              {section.rows.map(([label, value]) => (
                <label key={label} className="grid gap-2 md:grid-cols-[180px_1fr] md:items-center">
                  <span className="text-sm text-slate-400">{label}</span>
                  <input disabled value={value} className="rounded-lg border border-white/10 bg-slate-950/45 px-3 py-2 text-sm text-slate-200 disabled:opacity-100" readOnly />
                </label>
              ))}
            </div>
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400 md:grid-cols-2">
              <span>Approval: {section.approval}</span>
              <span>Rollback: {section.rollback}</span>
            </div>
            <button disabled className="mt-4 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-400">
              {section.action} - {section.disabledReason}
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Configuration Change History</h3>
        <DataTable
          minWidthClass="min-w-[1160px]"
          headers={["Setting", "Current Value", "Risk Tier", "Last Changed", "Changed By", "Approval", "Audit Status"]}
          rows={changeHistoryRows}
        />
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

function DataTable({ headers, rows, minWidthClass = "min-w-[1040px]" }: { headers: string[]; rows: string[][]; minWidthClass?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
      <div className="overflow-x-auto">
        <table className={`w-full ${minWidthClass} border-collapse text-left text-sm`}>
          <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")} className="transition hover:bg-white/[0.045]">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className={`px-4 py-4 leading-6 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
