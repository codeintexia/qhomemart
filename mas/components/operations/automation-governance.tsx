import { ArrowRight } from "lucide-react";

const summaryCards = [
  ["7", "Active Automations", "Workflow aktif untuk operasi retail", "Active"],
  ["42", "Tasks Assisted Today", "Inquiry, package mapping, dan follow-up support", "Monitoring"],
  ["9", "Human Review Required", "Perlu validasi staff sebelum customer response", "Review"],
  ["3", "Fallback Events", "Dalam batas aman", "Safe"],
  ["2", "Manual Overrides", "Dicatat dalam audit trail", "Logged"],
];

const flowSteps = [
  ["Customer Inquiry", "Input permintaan pelanggan", "Customer Triage Agent"],
  ["Demand Classification", "Klasifikasi kebutuhan dan urgency", "Customer Triage Agent"],
  ["Package Mapping", "Mapping paket berbasis aturan", "Product Match Agent"],
  ["Service Dependency Check", "Cek kebutuhan layanan dan instalasi", "Service Match Agent"],
  ["Staff Follow-up Support", "Draft arahan staff dan next action", "Staff Insight Agent"],
  ["Human Review", "Validasi staff sebelum respons", "Operations / Staff"],
  ["Audit Log", "Catatan workflow dan keputusan", "Workflow Log"],
];

const automationRows = [
  ["Customer Inquiry Triage", "Classify demand", "Reduce inquiry sorting time", "Inquiry", "Demand cluster", "Staff review required", "Manual review jika confidence rendah", "Operations Manager", "Faster inquiry sorting", "Prevents unsafe auto-response", "Active"],
  ["Package Recommendation", "Map package", "Improve package fit", "Product Catalog + Package Mapping", "Package recommendation", "Staff review required", "Use rule-based package map", "Category Lead", "More consistent package recommendation", "Avoids package mismatch", "Monitoring"],
  ["Service Matching", "Check service dependency", "Flag service dependency", "Service Queue + Inquiry", "Service dependency flag", "Supervisor review required", "Route to staff jika kapasitas tidak jelas", "Service Coordinator", "Earlier service bottleneck detection", "Prevents false service promise", "Needs Review"],
  ["Staff Follow-up Support", "Draft staff guidance", "Support consistent staff response", "Staff Follow-up + Knowledge Map", "Staff response guidance", "Staff review required", "Block customer-facing response until reviewed", "Staff Lead", "More consistent follow-up execution", "Controls response quality", "Active"],
  ["Insight Summarization", "Summarize operational signal", "Prepare decision signal", "Inquiry + Product + Service + Follow-up", "Decision signal", "Management review required", "Route to management review", "Operations Manager", "Faster management review", "Avoids unreviewed decision", "Monitoring"],
  ["Audit Logging", "Record workflow event", "Support audit trail", "Workflow Log", "Traceable event log", "Auto-approved within rule", "Log audit event", "Technical Reviewer", "Improves reviewability", "Supports governance", "Active"],
];

const routingRows = [
  ["Customer-facing response", "Fast model", "Staff manual review", "Confidence below threshold", "Staff approval", "Active"],
  ["Demand classification", "Customer Triage LLM when configured", "Rule-based triage", "LLM unavailable or invalid output", "Staff review for P1", "Active"],
  ["Package mapping", "Rule-based mapping", "Manual package review", "Product data missing", "Category approval", "Monitoring"],
  ["Service recommendation", "Rule-based service map", "Supervisor review", "Service capacity unclear", "Supervisor approval", "Needs Review"],
  ["Decision signal", "Workflow signal aggregation", "Management review", "Business impact above threshold", "Management approval", "Active"],
];

const fallbackRows = [
  ["Low confidence", "Route to staff review", "Operations Manager", "Medium", "Today 11:20", "Logged"],
  ["Missing product data", "Use rule-based mapping and request catalog review", "Category Lead", "Medium", "Today 10:45", "Logged"],
  ["Service dependency unclear", "Escalate to supervisor", "Service Coordinator", "High", "Today 09:50", "Logged"],
  ["Customer safety risk", "Block automated recommendation", "Operations Manager", "High", "Today 09:12", "Logged"],
  ["Routing failure", "Manual review", "Technical Reviewer", "Low", "Yesterday 16:40", "Logged"],
  ["Policy violation risk", "Log audit event and stop customer-facing response", "Technical Reviewer", "Critical", "No event today", "Active"],
];

const exceptionRows = [
  ["Low confidence package match", "Package Recommendation", "Confidence below threshold", "Category Lead", "Review package fit before customer response", "Needs Review"],
  ["Product catalog not connected", "Package Mapping", "Catalog partially connected", "Product Manager", "Validate product mapping source", "Monitoring"],
  ["Service capacity unknown", "Service Matching", "Schedule still manual coordination", "Service Coordinator", "Confirm capacity before recommendation", "Action Required"],
  ["Customer-facing response requires approval", "Staff Follow-up Support", "Safety-related inquiry", "Operations Manager", "Approve staff response draft", "Human Review"],
];

const connectionRows = [
  ["Product catalog", "Partially connected"],
  ["Stock", "Manual snapshot"],
  ["WhatsApp", "Not connected"],
  ["Price", "Not connected"],
  ["Payment", "Not connected"],
  ["Workflow log", "Connected"],
];

export function AutomationGovernance() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">AI & Automation</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Automation Workflow & Governance — Tata Kelola Workflow Automation</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          Pantauan workflow automation, human review, fallback, routing, dan audit untuk mendukung operasi retail.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Update terakhir: 31 Mei 2026, 14:25</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Periode monitoring: hari ini</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Automation Workflow: Retail Automation v1.6</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Routing policy: Model Routing Policy v0.9</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Human review: Enabled</span>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5">Audit: Active</span>
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

      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Workflow Automation Flow — Alur Kerja Automation</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">Flow menampilkan business task. Agent hanya supporting role di bawah setiap langkah.</p>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[1120px] items-stretch">
            {flowSteps.map(([label, detail, owner], index) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{owner}</p>
                </div>
                {index < flowSteps.length - 1 && <ArrowRight className="mx-2 h-5 w-5 shrink-0 text-red-200/70" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DataTable
        title="Automation Operations Table — Tabel Operasi Automation"
        minWidthClass="min-w-[1760px]"
        headers={["Workflow", "Automation Role", "Business Task", "Input Source", "Output", "Human Review", "Fallback Policy", "Owner", "Operational Impact", "Risk Controlled", "Status"]}
        rows={automationRows}
      />

      <DataTable
        title="Automation Exception Queue — Antrian Exception Automation"
        minWidthClass="min-w-[1120px]"
        headers={["Exception", "Workflow", "Reason", "Owner", "Next Action", "Status"]}
        rows={exceptionRows}
      />

      <DataTable
        title="Model Routing Governance"
        minWidthClass="min-w-[1180px]"
        headers={["Task Type", "Default Route", "Fallback Route", "Trigger", "Review Requirement", "Status"]}
        rows={routingRows}
      />

      <DataTable
        title="Fallback & Audit Operations"
        minWidthClass="min-w-[1180px]"
        headers={["Trigger", "Fallback Action", "Owner", "Severity", "Last Occurred", "Audit Status"]}
        rows={fallbackRows}
      />

      <DataTable
        title="Data Connection Status"
        minWidthClass="min-w-[680px]"
        headers={["System", "Connection Status"]}
        rows={connectionRows}
      />
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
