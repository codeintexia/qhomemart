import type { WorkflowRunResult } from "@/types/mas-types";
import { buildAuditRows } from "./operations-data";

export function LogsAudit({ workflow }: { workflow: WorkflowRunResult }) {
  const rows = buildAuditRows(workflow);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Logs & Audit</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Workflow trace and evidence log</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Trace rows are generated from the bathroom safety workflow output. This is demo evidence, not a production audit database.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-4">Step</th>
                <th className="px-4 py-4">Agent</th>
                <th className="px-4 py-4">Input summary</th>
                <th className="px-4 py-4">Output summary</th>
                <th className="px-4 py-4">Runtime mode</th>
                <th className="px-4 py-4">Fallback</th>
                <th className="px-4 py-4">Success</th>
                <th className="px-4 py-4">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => (
                <tr key={row.stepNumber} className="align-top transition hover:bg-white/[0.045]">
                  <td className="px-4 py-4 font-semibold text-white">{row.stepNumber}</td>
                  <td className="px-4 py-4 font-semibold text-slate-100">{row.agentName}</td>
                  <td className="max-w-[260px] px-4 py-4 leading-6 text-slate-400">{row.inputSummary}</td>
                  <td className="max-w-[260px] px-4 py-4 leading-6 text-slate-300">{row.outputSummary}</td>
                  <td className="px-4 py-4 text-slate-300">{row.runtimeMode}</td>
                  <td className="px-4 py-4 text-slate-300">{row.fallbackStatus}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                      {row.successState}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{row.evidenceGenerated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#0b111d]/85 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Normalization audit note</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Raw LLM Output: "Keamanan kamar mandi" {"->"} Canonical Workflow State: "Kamar mandi licin". Normalization keeps product matching,
          service orchestration, workflow logs, and analytics stable.
        </p>
      </div>
    </section>
  );
}
