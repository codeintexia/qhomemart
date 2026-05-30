import { ArrowRight, Bot, CheckCircle2, ClipboardCheck, FileText, KeyRound, Layers3, PackageCheck, Settings, ShieldCheck, ShoppingBag, Users, Wrench } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";
import {
  aggregateJourneyStages,
  bundleCandidates,
  businessOpportunities,
  customerIntentClusters,
  inquiryPatterns,
  operationalAlerts,
  problemClusters,
  recommendedDecisions,
  serviceSignals,
} from "./operations-data";

export function CustomersSection({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <RetailSection eyebrow="Pelanggan" title="Pola kebutuhan, pertanyaan, dan segmen pelanggan" description="Sinyal pelanggan dari kebutuhan safety, perbaikan, cat, plumbing, renovasi, dan lighting.">
      <div className="grid gap-4 lg:grid-cols-4">
        {customerIntentClusters.map((cluster) => (
          <MetricCard key={cluster.label} label={cluster.label} value={cluster.value} detail={`${cluster.detail} Urgency: ${cluster.status}.`} />
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-4">
        {inquiryPatterns.map((pattern) => (
          <Panel key={`${pattern.label}-${pattern.value}`} icon={Users} title={pattern.value} text={pattern.detail} />
        ))}
      </div>
      <MetricCard label="Contoh kasus terpilih" value="Kamar mandi licin untuk lansia" detail={workflow.scenario.userStory} />
    </RetailSection>
  );
}

export function JourneysSection({ workflow }: { workflow: WorkflowRunResult }) {
  const steps = [
    ["Masalah pelanggan", "Kamar mandi licin untuk lansia", Users],
    ["Guided intake", "Cerita, kondisi, dan preferensi belanja dicatat", ClipboardCheck],
    ["LLM triage", "Configurable provider path available when configured", Bot],
    ["Semantic normalization", "Bahasa pelanggan diubah menjadi state yang stabil", Layers3],
    ["Paket produk", workflow.bundle.bundleTitle, PackageCheck],
    ["Handoff staf", "Ringkasan siap untuk assisted selling", FileText],
    ["Insight bisnis", workflow.businessInsight.bundleOpportunity, ShoppingBag],
  ] as const;

  return (
    <RetailSection eyebrow="Alur Pelanggan" title="Alur umum dan contoh kasus terpilih" description="Alur ini berlaku untuk banyak input pelanggan. Bathroom safety hanya ditampilkan sebagai satu contoh kasus terpilih.">
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Alur umum dari masalah ke basket</p>
        <div className="mt-5 grid gap-3 xl:grid-cols-7">
          {aggregateJourneyStages.map((stage, index) => (
            <div key={stage.label} className="relative">
              <div className="h-full rounded-lg border border-white/10 bg-slate-950/35 p-4">
                <p className="text-sm font-semibold text-white">{stage.label}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{stage.detail}</p>
              </div>
              {index < aggregateJourneyStages.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-500 xl:block" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contoh kasus terpilih: kamar mandi licin untuk lansia</p>
        <div className="grid gap-3 xl:grid-cols-7">
          {steps.map(([label, text, Icon], index) => (
            <div key={label} className="relative">
              <div className="h-full rounded-lg border border-white/10 bg-slate-950/35 p-4">
                <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-white">{label}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
              </div>
              {index < steps.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-500 xl:block" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </RetailSection>
  );
}

export function ProductsBundlesSection({ workflow }: { workflow: WorkflowRunResult }) {
  const products = [...workflow.products.sectionA, ...workflow.products.sectionB].slice(0, 4);
  return (
    <RetailSection eyebrow="Produk & Paket" title="Kandidat paket dan peluang kategori" description="Paket menghubungkan masalah pelanggan, produk, cross-sell, layanan, dan placeholder sinyal stok.">
      <div className="grid gap-4 lg:grid-cols-4">
        {bundleCandidates.map((bundle) => (
          <MetricCard key={bundle.label} label={bundle.label} value={bundle.value} detail={bundle.detail} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard label="Sinyal stok" value="Dalam pengembangan" detail="Sistem stok dan harga belum terhubung." />
        <MetricCard label="Peluang kategori" value={problemClusters.map((cluster) => cluster.label).join(", ")} detail="Pola masalah membantu planning kategori dan campaign." />
        <MetricCard label="Paket contoh kasus terpilih" value={workflow.bundle.bundleTitle} detail={workflow.bundle.bundleSubtitle} />
      </div>
      <p className="text-sm font-semibold text-white">Koneksi produk untuk contoh kasus terpilih</p>
      <div className="grid gap-3 lg:grid-cols-4">
        {products.map(({ product }) => (
          <Panel key={product.id} icon={PackageCheck} title={product.name} text={product.reason} />
        ))}
      </div>
    </RetailSection>
  );
}

export function ServicesSection({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <RetailSection eyebrow="Layanan" title="Arahan layanan, kapasitas, dan kesiapan follow-up" description="Sinyal layanan dikelompokkan untuk manajer operasional sebelum kapasitas layanan terhubung.">
      <div className="grid gap-4 lg:grid-cols-4">
        {serviceSignals.map((signal) => (
          <MetricCard key={signal.label} label={signal.label} value={signal.value} detail={signal.detail} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard label="Indikator kapasitas layanan" value="Mode pratinjau" detail="Integrasi antrean kapasitas masih dalam pengembangan." />
        <MetricCard label="Kesiapan follow-up staf" value="Siap untuk contoh kasus" detail={workflow.services.availabilityNote} />
        <MetricCard label="Sinyal project request" value="Meningkat" detail="Kitchen, plumbing, dan instalasi menunjukkan kebutuhan assisted planning." />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {workflow.services.sectionC.map(({ service, matchReason }) => (
          <Panel key={service.id} icon={Wrench} title={service.name} text={`${matchReason} ${service.safeAvailabilityNote}`} />
        ))}
      </div>
    </RetailSection>
  );
}

export function InsightsSection({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <RetailSection eyebrow="Insight Bisnis" title="Peluang bisnis, pain cluster, dan aksi berikutnya" description="Decision support untuk manajemen, operasional, category, marketing, dan training staf.">
      <div className="grid gap-4 lg:grid-cols-4">
        {businessOpportunities.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} detail={item.detail} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard label="Sinyal marketing" value="Caregiver, repair, renovation, dan paint-planning households" detail="Sinyal segmen membantu targeting campaign." />
        <MetricCard label="Strategi kategori" value="Bundle-led selling" detail="Gunakan pola masalah untuk menyusun cross-sell dan layanan." />
        <MetricCard label="Sinyal training staf" value="Butuh skrip terpandu" detail="Tim toko perlu skrip singkat untuk cluster minat tinggi." />
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {recommendedDecisions.map((decision) => (
          <MetricCard key={decision.label} label={decision.label} value={decision.value} detail={decision.detail} />
        ))}
      </div>
      <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Aksi yang disarankan</p>
        <p className="mt-3 text-2xl font-semibold leading-snug text-white">Jalankan guided selling berbasis paket untuk safety dan repair, lalu perluas knowledge mapping untuk cat dan plumbing.</p>
      </div>
    </RetailSection>
  );
}

export function RetailOperationsSection({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <RetailSection eyebrow="Operasional" title="Kesehatan Workflow, alert, antrean, dan kesiapan staf" description="Tampilan operasional untuk pola pelanggan, follow-up staf, dan pertanyaan yang belum selesai.">
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard label="Kesehatan Workflow" value="Operational" detail={`${workflow.metrics.agentStepsLogged} langkah Workflow selesai.`} />
        <MetricCard label="Pertanyaan belum selesai" value="Mode pratinjau" detail="Antrean pertanyaan terhubung belum tersedia." />
        <MetricCard label="Bottleneck operasional" value="Follow-up layanan" detail="Sinyal instalasi dan repair perlu review kapasitas." />
        <MetricCard label="Kesiapan staf" value="Ringkasan siap" detail={workflow.staffSummary} />
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {operationalAlerts.map((alert) => (
          <MetricCard key={alert.label} label={alert.label} value={alert.value} detail={alert.detail} />
        ))}
      </div>
    </RetailSection>
  );
}

export function SettingsSection() {
  const rows = [
    ["API provider", "Sumopod", "Configured workflow provider shell"],
    ["Model", "Gemini 2.0 Flash", "Selected model for structured triage"],
    ["API key status", "Dalam pengembangan", "UI shell untuk secret management"],
    ["Routing policy", "Routing preview", "Pratinjau lokal aturan pemilihan Model"],
    ["Fallback policy", "Fallback deterministik aktif", "Kebijakan kontinuitas cakupan saat ini"],
    ["Knowledge mapping", "Dalam pengembangan", "Shell mapping katalog dan layanan"],
    ["Notification rules", "Dalam pengembangan", "Shell alert staf dan follow-up"],
    ["Access control", "Dalam pengembangan", "Shell role dan permission internal"],
  ];

  return (
    <RetailSection eyebrow="Pengaturan" title="Area pengaturan admin" description="Konfigurasi provider, Model, routing, Fallback, dan knowledge mapping. Kontrol bersifat lokal.">
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map(([label, value, detail]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                {label.includes("key") ? <KeyRound className="h-5 w-5 text-red-200" aria-hidden="true" /> : <Settings className="h-5 w-5 text-red-200" aria-hidden="true" />}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{detail}</p>
              </div>
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

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-semibold leading-6 text-white">{value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
        </div>
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-200" aria-hidden="true" />
      </div>
    </div>
  );
}

function Panel({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
      <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
      <p className="mt-4 text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
