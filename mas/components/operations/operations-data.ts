import type { WorkflowRunResult } from "@/types/mas-types";

export type SectionId =
  | "overview"
  | "agent-fleet"
  | "workflow-monitor"
  | "model-routing"
  | "fallback-governance"
  | "business-decision"
  | "logs-audit"
  | "settings"
  | "human-review"
  | "knowledge-base";

export type AgentStatus = "active" | "simulated" | "fallback-ready";
export type LayerStatus = "Active" | "Simulated" | "Planned";

export interface SidebarItem {
  id: SectionId;
  label: string;
  comingSoon?: boolean;
}

export interface AgentDefinition {
  id: string;
  name: string;
  shortName: string;
  status: AgentStatus;
  criticality: "Core" | "High" | "Medium";
  modelUsed: string;
  costTier: "Low" | "Medium";
  fallbackBehavior: string;
  lastRunStatus: string;
  outputType: string;
  role: string;
  inputContract: string;
  reasoningTask: string;
  outputContract: string;
  downstreamConsumer: string;
  evidenceGenerated: string;
}

export interface CognitionLayer {
  label: string;
  explanation: string;
  status: LayerStatus;
}

export interface ModelOption {
  id: string;
  name: string;
  costTier: "Low" | "Medium" | "High";
  speedTier: "Fast" | "Balanced" | "Deliberate";
  taskFit: string;
  fallbackModel: string;
}

export interface FallbackPolicy {
  path: string;
  riskPrevented: string;
  continuityBenefit: string;
  auditabilityBenefit: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: "overview", label: "Overview" },
  { id: "agent-fleet", label: "Agent Fleet" },
  { id: "workflow-monitor", label: "Workflow Monitor" },
  { id: "model-routing", label: "Model Routing" },
  { id: "fallback-governance", label: "Fallback Governance" },
  { id: "business-decision", label: "Business Decision" },
  { id: "logs-audit", label: "Logs & Audit" },
  { id: "settings", label: "Settings", comingSoon: true },
  { id: "human-review", label: "Human Review", comingSoon: true },
  { id: "knowledge-base", label: "Knowledge Base", comingSoon: true },
];

export const agentFleet: AgentDefinition[] = [
  {
    id: "customer-triage",
    name: "Customer Triage Agent",
    shortName: "Customer Triage",
    status: "active",
    criticality: "Core",
    modelUsed: "Sumopod / Gemini 2.0 Flash when configured",
    costTier: "Low",
    fallbackBehavior: "Deterministic triage if LLM is unavailable or invalid",
    lastRunStatus: "Completed in deterministic fallback mode",
    outputType: "Structured triage JSON",
    role: "Converts customer language and chip selections into a stable problem category, user context, constraints, and normalized need.",
    inputContract: "Customer story, selected problem chips, buying preference.",
    reasoningTask: "Identify intent, room, user risk, constraints, and the canonical workflow state needed by downstream agents.",
    outputContract: "problemCategory, primarySpace, primaryUser, constraints, normalizedNeed, reasoning, aiMeta.",
    downstreamConsumer: "Context Risk Agent",
    evidenceGenerated: "Triage summary, AI execution metadata, normalization notes when LLM-assisted mode is used.",
  },
  {
    id: "context-risk",
    name: "Context Risk Agent",
    shortName: "Context Risk",
    status: "active",
    criticality: "High",
    modelUsed: "Deterministic rules",
    costTier: "Low",
    fallbackBehavior: "Uses predefined risk mapping from canonical triage state",
    lastRunStatus: "Detected high-priority safety risks",
    outputType: "Risk list and narrative",
    role: "Turns the triage state into ordered safety and context risks.",
    inputContract: "TriageOutput with problem category, primary user, and constraints.",
    reasoningTask: "Rank hazards and explain why they matter for an elderly bathroom-safety scenario.",
    outputContract: "Ordered risks with severity, reason, and priority.",
    downstreamConsumer: "Product Match Agent",
    evidenceGenerated: "Risk severity labels and risk narrative.",
  },
  {
    id: "product-match",
    name: "Product Match Agent",
    shortName: "Product Match",
    status: "active",
    criticality: "High",
    modelUsed: "Deterministic catalog matching",
    costTier: "Low",
    fallbackBehavior: "Continues with demo product catalog and safe category matching",
    lastRunStatus: "Matched bathroom safety product groups",
    outputType: "Sectioned product recommendations",
    role: "Maps risk evidence to relevant QHomemart-style product categories.",
    inputContract: "TriageOutput, RiskOutput, demo product catalog.",
    reasoningTask: "Prioritize anti-slip, grab bar, lighting, and low-reach storage products by risk.",
    outputContract: "Section A and Section B matched products.",
    downstreamConsumer: "Service Match Agent and Bundle Strategy Agent",
    evidenceGenerated: "Product category rationale and section placement.",
  },
  {
    id: "service-match",
    name: "Service Match Agent",
    shortName: "Service Match",
    status: "fallback-ready",
    criticality: "Medium",
    modelUsed: "Deterministic service guidance",
    costTier: "Low",
    fallbackBehavior: "Shows optional service guidance when availability is unknown",
    lastRunStatus: "Generated optional service guidance",
    outputType: "Service guidance",
    role: "Adds safe installation or renovation guidance without pretending service availability is live.",
    inputContract: "TriageOutput, RiskOutput, demo service list.",
    reasoningTask: "Decide when staff-assisted service guidance is useful and how to phrase availability safely.",
    outputContract: "Optional Section C service guidance and availability note.",
    downstreamConsumer: "Bundle Strategy Agent",
    evidenceGenerated: "Service match reason and prototype availability disclaimer.",
  },
  {
    id: "bundle-strategy",
    name: "Bundle Strategy Agent",
    shortName: "Bundle Strategy",
    status: "active",
    criticality: "High",
    modelUsed: "Deterministic bundle rules",
    costTier: "Low",
    fallbackBehavior: "Uses tiered bundle sections from local rules",
    lastRunStatus: "Generated guided safety bundle",
    outputType: "Bundle sections",
    role: "Packages product and service outputs into a sellable guided solution.",
    inputContract: "Product matches, service matches, buying preference, bundle rules.",
    reasoningTask: "Separate must-have safety items, useful additions, and optional service guidance.",
    outputContract: "Bundle title, subtitle, and ordered solution sections.",
    downstreamConsumer: "Staff Insight Agent",
    evidenceGenerated: "Bundle section count and section rationale.",
  },
  {
    id: "staff-insight",
    name: "Staff Insight Agent",
    shortName: "Staff Insight",
    status: "simulated",
    criticality: "Medium",
    modelUsed: "Deterministic insight synthesis",
    costTier: "Low",
    fallbackBehavior: "Summarizes current workflow outputs for staff review",
    lastRunStatus: "Generated staff summary and business insight",
    outputType: "Staff summary and stakeholder insight",
    role: "Turns the workflow into staff-facing guidance and stakeholder decision support.",
    inputContract: "All previous agent outputs.",
    reasoningTask: "Explain the customer need, pain cluster, bundle opportunity, and campaign signal.",
    outputContract: "Staff summary and businessInsight object.",
    downstreamConsumer: "Dashboard, staff selling flow, future CMS modules.",
    evidenceGenerated: "Business opportunity, marketing signal, and staff summary.",
  },
];

export const workflowSteps = agentFleet.map((agent, index) => ({
  id: agent.id,
  label: agent.shortName,
  step: index + 1,
}));

export const modelOptions: ModelOption[] = [
  {
    id: "gemini-2-flash",
    name: "Gemini 2.0 Flash",
    costTier: "Low",
    speedTier: "Fast",
    taskFit: "Selected for Indonesian structured JSON triage and low-latency prototype routing.",
    fallbackModel: "Deterministic fallback",
  },
  {
    id: "gemini-2-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    costTier: "Low",
    speedTier: "Fast",
    taskFit: "Candidate for cheaper lightweight classification.",
    fallbackModel: "Gemini 2.0 Flash",
  },
  {
    id: "gpt-4-1-nano",
    name: "GPT-4.1 Nano",
    costTier: "Low",
    speedTier: "Fast",
    taskFit: "Candidate for compact classification and JSON extraction.",
    fallbackModel: "Deterministic fallback",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    costTier: "Medium",
    speedTier: "Fast",
    taskFit: "Candidate for broader multilingual triage experiments.",
    fallbackModel: "Gemini 2.0 Flash",
  },
  {
    id: "claude-haiku",
    name: "Claude Haiku",
    costTier: "Medium",
    speedTier: "Fast",
    taskFit: "Candidate for concise support summarization.",
    fallbackModel: "Deterministic fallback",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    costTier: "High",
    speedTier: "Deliberate",
    taskFit: "Candidate for deeper review tasks, not selected for this prototype triage path.",
    fallbackModel: "Gemini 2.0 Flash",
  },
];

export const fallbackPolicies: FallbackPolicy[] = [
  {
    path: "If LLM triage fails -> deterministic fallback",
    riskPrevented: "Prevents empty or blocked customer guidance when provider config or response fails.",
    continuityBenefit: "Workflow still produces product, service, bundle, and staff outputs.",
    auditabilityBenefit: "aiMeta records fallback mode and reason.",
  },
  {
    path: "If JSON invalid -> validation fallback",
    riskPrevented: "Prevents malformed model output from entering downstream matching.",
    continuityBenefit: "Stable typed contract continues through all six agents.",
    auditabilityBenefit: "Invalid candidate can be isolated from canonical workflow state.",
  },
  {
    path: "If service availability unknown -> optional service guidance",
    riskPrevented: "Avoids overclaiming real installation availability.",
    continuityBenefit: "Staff can still guide the customer with safe next steps.",
    auditabilityBenefit: "Availability disclaimer remains visible in service output.",
  },
  {
    path: "If confidence low -> staff review recommended",
    riskPrevented: "Prevents uncertain automation from being treated as final advice.",
    continuityBenefit: "Keeps the interaction useful while routing ambiguity to humans.",
    auditabilityBenefit: "Review recommendation becomes part of the traceable decision record.",
  },
];

export const triageCognitionLayers: CognitionLayer[] = [
  {
    label: "User Intent",
    explanation: "Detects the household safety problem from natural language.",
    status: "Active",
  },
  {
    label: "Interaction Layer",
    explanation: "Uses story text, chips, and buying preference from the prototype UI.",
    status: "Active",
  },
  {
    label: "Context Collection",
    explanation: "Extracts room, user profile, and constraints from the captured input.",
    status: "Active",
  },
  {
    label: "Model Routing",
    explanation: "Routes to Sumopod LLM-assisted triage when configured, otherwise deterministic logic.",
    status: "Simulated",
  },
  {
    label: "Validation",
    explanation: "Requires a valid structured candidate before model output can influence the workflow.",
    status: "Active",
  },
  {
    label: "Semantic Normalization",
    explanation: "Maps equivalent phrases to the canonical workflow state used by downstream agents.",
    status: "Simulated",
  },
  {
    label: "Workflow Output",
    explanation: "Emits typed triage fields consumed by risk, product, and service agents.",
    status: "Active",
  },
  {
    label: "Evidence / Audit Trail",
    explanation: "Records mode, reason, structured output, and downstream trace evidence.",
    status: "Active",
  },
];

export function buildAuditRows(workflow: WorkflowRunResult) {
  return workflow.interactionLog.map((log) => ({
    stepNumber: log.stepNumber,
    agentName: log.agentName,
    inputSummary: log.inputSummary,
    outputSummary: log.outputSummary,
    runtimeMode:
      log.stepNumber === 1
        ? workflow.aiMeta.aiMode === "llm-assisted"
          ? "LLM-assisted triage"
          : "Deterministic fallback"
        : "Deterministic workflow",
    fallbackStatus:
      log.stepNumber === 1
        ? workflow.aiMeta.aiMode === "deterministic-fallback"
          ? "Fallback used"
          : "Fallback available"
        : "Fallback-ready",
    successState: "Success",
    evidenceGenerated: "Structured output captured",
  }));
}
