import type { WorkflowRunResult } from "@/types/mas-types";

const summaryCards = [
  ["148", "Audit Events Today", "Event workflow dan review tercatat", "Active"],
  ["12", "Human Reviews", "Staff dan supervisor review", "Review"],
  ["4", "Fallback Used", "Fallback terjadi dalam batas governance", "Logged"],
  ["2", "Manual Overrides", "Override tercatat dengan actor dan reason", "Controlled"],
  ["1", "Open Audit Issues", "Perlu evidence tambahan", "Open"],
];

const filterRows = [
  ["Workflow", "All workflows"],
  ["Status", "Completed, Pending Review, Escalated"],
  ["Severity", "Info, Low, Medium, High, Critical"],
  ["Date Range", "Today"],
  ["Human Review Only", "Off"],
  ["Fallback Only", "Off"],
  ["Manual Override Only", "Off"],
  ["Inquiry ID", "All"],
  ["Ticket ID", "All"],
];

const auditRows = [
  ["31 Mei 2026 14:23", "AUD-2026-1048", "Customer Inquiry Triage", "INQ-001", "Workflow Engine", "Kamar mandi licin untuk lansia", "Demand cluster: keamanan kamar mandi", "Customer Triage LLM when configured", "None", "Staff Reviewed", "Structured Output / Complete", "Low", "Completed"],
  ["31 Mei 2026 14:18", "AUD-2026-1047", "Package Recommendation", "INQ-001", "Rule Engine", "Demand cluster + product catalog", "Paket Kamar Mandi Aman", "Rule-based Package Mapping", "Fallback-ready", "Staff Reviewed", "Workflow Snapshot / Complete", "Info", "Completed"],
  ["31 Mei 2026 14:10", "AUD-2026-1046", "Service Matching", "SVC-011", "Supervisor", "Service dependency unclear", "Supervisor review required", "Service Mapping v1.3", "Triggered", "Supervisor Review Required", "Approval Record / Partial", "Medium", "Pending Review"],
  ["31 Mei 2026 13:58", "AUD-2026-1045", "Staff Follow-up", "TKT-001", "Staff", "Follow-up due today", "Call customer before 15:00", "Follow-up Workflow v1.4", "None", "Reviewed By: Rina / Approved", "Contact Attempt Log / Complete", "High", "Escalated"],
  ["31 Mei 2026 13:42", "AUD-2026-1044", "Inventory Mapping", "PKG-ANTI-BOCOR", "Operations Manager", "Sealant low stock", "Package status changed to At Risk", "Stock Mapping v1.2", "None", "Not Required", "Inventory Snapshot / Partial", "Medium", "Completed"],
  ["31 Mei 2026 13:20", "AUD-2026-1043", "Manual Override", "PKG-DAPUR", "Supervisor", "Customer safety concern", "Previous: recommend package / Final: request consultation", "Governance Rule v1.1", "Triggered", "Technical Review Required", "Override Record / Complete", "High", "Resolved"],
  ["31 Mei 2026 12:55", "AUD-2026-1042", "Decision Intelligence", "DEC-004", "Operations Manager", "Service queue above threshold", "Decision Required: assign additional capacity", "Decision Workflow v1.3", "None", "Management reviewed", "Decision Evidence / Complete", "Medium", "Completed"],
];

const reviewRows = [
  ["AUD-2026-1048", "Review Required", "Rina", "31 Mei 2026 14:25", "Approved"],
  ["AUD-2026-1046", "Supervisor Review Required", "Agus", "Pending", "Waiting review"],
  ["AUD-2026-1043", "Technical Review Required", "Technical Reviewer", "31 Mei 2026 13:35", "Resolved"],
];

const overrideRows = [
  ["AUD-2026-1043", "Supervisor", "Customer safety concern", "Recommend package directly", "Request consultation before package recommendation"],
  ["AUD-2026-1038", "Operations Manager", "Service capacity unknown", "Ready to schedule", "Supervisor review required"],
];

const issueRows = [
  ["Missing Review Record", "Package Recommendation", "Medium", "Ops Manager", "Request review evidence", "Open"],
  ["Partial Inventory Snapshot", "Inventory Mapping", "Low", "Product Manager", "Validate stock evidence", "Monitoring"],
  ["Service Approval Pending", "Service Matching", "Medium", "Service Coordinator", "Complete supervisor review", "Pending Review"],
];

export function LogsAudit({ workflow }: { workflow: WorkflowRunResult }) {
  const selectedCase = workflow.staffSummary || "Contoh kasus terpilih tersedia untuk detail evidence.";
  const interactionRows = workflow.interactionLog.map((entry) => [
    String(entry.stepNumber),
    entry.sourceAgent,
    entry.targetAgent ?? "Final output",
    entry.input,
    entry.output,
    `${Math.round(entry.confidence * 100)}%`,
    entry.reasoningBasis.join("; "),
    entry.decisionDependency,
    entry.timestamp,
    entry.fallbackStatus,
    entry.humanReviewStatus,
  ]);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">Audit Log</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Audit Trail & Workflow Evidence</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Trace keputusan, fallback, human review, output workflow, dan evidence untuk setiap proses operasional.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Last updated: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Audit period: Today</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Workflow: Retail Workflow v1.6</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Governance: Audit Policy v1.1</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Audit status: Active</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map(([value, label, note, status]) => (
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
        title="Audit Filters"
        minWidthClass="min-w-[760px]"
        headers={["Filter", "Current Value"]}
        rows={filterRows}
      />

      <DataTable
        title="Workflow Interaction Log"
        minWidthClass="min-w-[1900px]"
        headers={["Step", "Source Agent", "Target Agent", "Input", "Output", "Confidence", "Reasoning Basis", "Decision Dependency", "Timestamp", "Fallback", "Human Review"]}
        rows={interactionRows}
      />

      <DataTable
        title="Audit Event Table"
        minWidthClass="min-w-[1900px]"
        headers={["Time", "Event ID", "Workflow", "Entity ID", "Actor", "Input", "Output", "Rule / Model", "Fallback", "Human Review", "Evidence", "Severity", "Status"]}
        rows={auditRows}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <DataTable
          title="Human Review Tracking"
          minWidthClass="min-w-[820px]"
          headers={["Event ID", "Review Required", "Reviewed By", "Review Time", "Review Result"]}
          rows={reviewRows}
        />
        <DataTable
          title="Manual Override Tracking"
          minWidthClass="min-w-[960px]"
          headers={["Event ID", "Override By", "Override Reason", "Previous Output", "Final Output"]}
          rows={overrideRows}
        />
      </div>

      <DataTable
        title="Open Audit Issues"
        minWidthClass="min-w-[960px]"
        headers={["Issue", "Workflow", "Severity", "Owner", "Next Action", "Status"]}
        rows={issueRows}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expandable event detail - selected case</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{selectedCase}</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Raw LLM candidate: "Keamanan kamar mandi" {"->"} Canonical Workflow State: "Kamar mandi licin". Detail ini hanya evidence pendukung, bukan identitas utama halaman audit.
        </p>
      </div>
    </section>
  );
}

function DataTable({ title, headers, rows, minWidthClass }: { title: string; headers: string[]; rows: string[][]; minWidthClass: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
      <div className="border-b border-white/10 px-5 py-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full ${minWidthClass} border-collapse text-left text-sm`}>
          <thead className="bg-slate-950/65 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-4">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")} className="align-top transition hover:bg-white/[0.045]">
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
