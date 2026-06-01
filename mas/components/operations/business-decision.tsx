import { BriefcaseBusiness, Megaphone, Target, Users } from "lucide-react";
import type { WorkflowRunResult } from "@/types/mas-types";

export function BusinessDecision({ workflow }: { workflow: WorkflowRunResult }) {
  const outputs = [
    { label: "Peluang paket", value: workflow.businessInsight.bundleOpportunity || "Paket Kamar Mandi Lebih Aman", icon: BriefcaseBusiness },
    { label: "Ringkasan staff", value: workflow.staffSummary || "Tersedia", icon: Users },
    { label: "Arahan layanan", value: workflow.services.sectionC.length > 0 ? "Arahan layanan opsional tersedia" : "Arahan layanan tersedia saat relevan", icon: Target },
    { label: "Sinyal marketing", value: "Caregiver household", icon: Megaphone },
    { label: "Klaster masalah pelanggan", value: "Bathroom safety for elderly", icon: Target },
  ];

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Business Decision — Keputusan Bisnis</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Decision support untuk stakeholder</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Panel ini memakai output cakupan saat ini dari Workflow dan tidak mengklaim revenue, live stock, atau connected-system yang belum terhubung.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {outputs.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-5 w-5 text-red-200" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-base leading-7 text-white">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Rekomendasi tindakan stakeholder</p>
        <p className="mt-3 text-2xl font-semibold leading-snug text-white">
          Buat campaign paket keamanan terpandu dan alur penjualan dengan bantuan staff.
        </p>
        <p className="mt-3 text-sm leading-6 text-emerald-100/80">
          Workflow saat ini memberi sinyal campaign yang jelas sambil menjaga klaim service availability dan connected-system tetap sesuai cakupan saat ini.
        </p>
      </div>
    </section>
  );
}
