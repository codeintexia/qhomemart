import { AlertTriangle, Bot, BriefcaseBusiness, CheckCircle2, PackageCheck, ShieldCheck, UserRoundCheck, Users, Wrench } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";
import {
  executiveMetrics,
  operationalAlerts,
  problemClusters,
  recommendedDecisions,
} from "./operations-data";

const metricIcons = [Users, CheckCircle2, PackageCheck, Wrench, Bot];

export function CommandOverview({ workflow }: { workflow: WorkflowRunResult }) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Panduan Membaca Dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Mulai dari kebutuhan peran Anda</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          <PersonaCard title="Direktur / Manajemen" text="Lihat peluang bisnis dan keputusan prioritas." menu="Ringkasan, Insight Bisnis" />
          <PersonaCard title="Manajer Operasional" text="Lihat alur kerja, antrean layanan, dan risiko operasional." menu="Operasional, Layanan" />
          <PersonaCard title="Product / Category Manager" text="Lihat pola kebutuhan pelanggan dan peluang paket." menu="Pelanggan, Produk & Paket" />
          <PersonaCard title="Reviewer Teknis" text="Lihat Agent, Model, Fallback, Workflow, dan audit." menu="Sistem AI, Log & Audit" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827_0%,#0c1220_48%,#231014_100%)] shadow-2xl shadow-black/30">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
              Ringkasan Retail OS
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              QHomemart Retail OS membantu melihat kebutuhan pelanggan dan keputusan bisnis berikutnya.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Dashboard operasional ritel dengan sistem AI untuk membaca pola kebutuhan, peluang paket, sinyal layanan,
              kesehatan Workflow, dan keputusan prioritas.
            </p>
            <p className="mt-4 max-w-2xl rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-slate-200">
              AI digunakan untuk memahami bahasa pelanggan. Workflow deterministik menjaga hasil tetap stabil dan dapat diaudit.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Keputusan Prioritas</p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Aksi yang disarankan</p>
                <p className="text-xl font-semibold leading-7 text-white">Prioritaskan paket keamanan kamar mandi dan petakan pertanyaan plumbing berulang.</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Apa yang terjadi?</p>
                <p className="text-lg font-semibold text-emerald-200">Sinyal safety, plumbing, cat, dan instalasi membentuk peluang paket.</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Contoh kasus terpilih</p>
                <p className="text-sm leading-6 text-slate-200">Kamar mandi licin untuk lansia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {executiveMetrics.map((card, index) => {
          const Icon = metricIcons[index] ?? CheckCircle2;
          return (
            <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/15 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.075]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{card.status}</span>
              </div>
              <p className="mt-4 text-sm text-slate-400">{card.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{card.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{card.detail}</p>
            </div>
          );
        })}
      </div>

      <HomeRow title="Pola Masalah Pelanggan" items={problemClusters} icon={AlertTriangle} columns="xl:grid-cols-6" />
      <HomeRow title="Keputusan yang Disarankan" items={recommendedDecisions} icon={BriefcaseBusiness} columns="xl:grid-cols-4" />
      <HomeRow title="Alert Operasional" items={operationalAlerts} icon={ShieldCheck} columns="xl:grid-cols-4" />
    </section>
  );
}

function PersonaCard({ title, text, menu }: { title: string; text: string; menu: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
      <UserRoundCheck className="h-5 w-5 text-red-200" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Menu: {menu}</p>
    </div>
  );
}

function HomeRow({
  title,
  items,
  icon: Icon,
  columns,
}: {
  title: string;
  items: Array<{ label: string; value: string; detail: string }>;
  icon: React.ElementType;
  columns: string;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className={`grid gap-3 md:grid-cols-2 ${columns}`}>
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-4 w-4 text-red-200" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
