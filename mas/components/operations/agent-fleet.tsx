"use client";

import { ArrowRight, Power } from "lucide-react";
import type { AgentDefinition } from "./operations-data";

export function AgentFleet({
  agents,
  selectedAgentId,
  enabledAgents,
  onSelectAgent,
  onToggleAgent,
}: {
  agents: AgentDefinition[];
  selectedAgentId: string;
  enabledAgents: Record<string, boolean>;
  onSelectAgent: (agentId: string) => void;
  onToggleAgent: (agentId: string) => void;
}) {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Sistem AI</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Alur komunikasi Agent</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Agent bekerja berurutan. Output dari satu agent menjadi input untuk agent berikutnya.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <StatusNote title="Customer Triage Agent" value="LLM-assisted saat configured" text="Agent ini dapat memakai LLM untuk memahami bahasa pelanggan." />
        <StatusNote title="Agent lainnya" value="Workflow deterministik" text="Context Risk, Product Match, Service Match, Bundle Strategy, dan Staff Insight berjalan deterministik agar stabil." />
        <StatusNote title="Model routing agent lain" value="Routing preview" text="Belum menjalankan multi-model live untuk semua agent." />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[980px] items-center">
            {agents.map((agent, index) => {
              const selected = selectedAgentId === agent.id;
              return (
                <div key={agent.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => onSelectAgent(agent.id)}
                    className={`relative min-h-24 w-full rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                      selected ? "border-red-300 bg-red-500/10" : "border-white/10 bg-slate-950/35 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-500">Agent {index + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-white">{agent.name}</p>
                    {selected && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />}
                  </button>
                  {index < agents.length - 1 && (
                    <div className="relative mx-2 h-px w-12 shrink-0 bg-red-200/30">
                      <span className="absolute -top-1 left-1 h-2 w-2 animate-[pulse-soft_1.4s_ease-in-out_infinite] rounded-full bg-red-200" />
                      <ArrowRight className="absolute -right-2 -top-2 h-4 w-4 text-red-200/70" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
        <div className="border-b border-white/10 px-5 py-4">
          <h3 className="text-lg font-semibold text-white">Tabel Agent</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
            <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                {["Agent", "Tugas Bisnis", "Input", "Output", "Mode", "Fallback", "Status"].map((header) => (
                  <th key={header} className="px-4 py-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {agents.map((agent) => {
                const enabled = enabledAgents[agent.id];
                const summary = agentSummary[agent.id] ?? {
                  task: agent.role,
                  input: agent.inputContract,
                  output: agent.outputContract,
                  fallback: agent.fallbackBehavior,
                };
                const mode = agent.id === "customer-triage" ? "LLM-assisted saat configured" : "Deterministik";
                return (
                  <tr key={agent.id} className="align-top transition hover:bg-white/[0.045]">
                    <td className="px-4 py-4">
                      <button type="button" onClick={() => onSelectAgent(agent.id)} className="font-semibold text-white hover:text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
                        {agent.name}
                      </button>
                    </td>
                    <td className="px-4 py-4 leading-6 text-slate-300">{summary.task}</td>
                    <td className="px-4 py-4 leading-6 text-slate-300">{summary.input}</td>
                    <td className="px-4 py-4 leading-6 text-slate-300">{summary.output}</td>
                    <td className="px-4 py-4 leading-6 text-slate-300">{mode}</td>
                    <td className="px-4 py-4 leading-6 text-slate-300">{summary.fallback}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onToggleAgent(agent.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                          enabled ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" : "border-slate-600 bg-slate-900 text-slate-400"
                        }`}
                        aria-pressed={enabled}
                      >
                        <Power className="h-3.5 w-3.5" aria-hidden="true" />
                        kontrol lokal
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const agentSummary: Record<string, { task: string; input: string; output: string; fallback: string }> = {
  "customer-triage": {
    task: "Memahami masalah pelanggan dari bahasa natural.",
    input: "Cerita pelanggan dan pilihan kondisi.",
    output: "Kategori masalah, lokasi, pengguna utama, dan kebutuhan.",
    fallback: "Aturan deterministik jika LLM tidak tersedia.",
  },
  "context-risk": {
    task: "Membaca risiko dan tingkat urgensi dari kebutuhan pelanggan.",
    input: "Hasil triage pelanggan.",
    output: "Daftar risiko, prioritas, dan alasan.",
    fallback: "Mapping risiko berbasis aturan.",
  },
  "product-match": {
    task: "Mencocokkan kebutuhan dengan kategori produk.",
    input: "Masalah pelanggan dan risiko.",
    output: "Rekomendasi kategori dan produk awal.",
    fallback: "Pencocokan katalog berdasarkan aturan lokal.",
  },
  "service-match": {
    task: "Menentukan apakah pelanggan perlu arahan layanan.",
    input: "Risiko dan kebutuhan instalasi.",
    output: "Arahan layanan atau follow-up staf.",
    fallback: "Arahan opsional jika ketersediaan layanan belum pasti.",
  },
  "bundle-strategy": {
    task: "Menyusun produk dan layanan menjadi paket yang mudah dijual.",
    input: "Produk, layanan, dan preferensi budget.",
    output: "Paket prioritas dan cross-sell.",
    fallback: "Aturan paket bertingkat.",
  },
  "staff-insight": {
    task: "Membuat ringkasan untuk staf dan insight bisnis.",
    input: "Output semua agent sebelumnya.",
    output: "Ringkasan staf, peluang bisnis, dan sinyal marketing.",
    fallback: "Ringkasan berbasis output Workflow.",
  },
};

function StatusNote({ title, value, text }: { title: string; value: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
