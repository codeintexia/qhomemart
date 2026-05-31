import type { WorkflowRunResult } from "@/types/mas-types";

export type SectionId =
  | "home"
  | "customers"
  | "inquiries"
  | "products-stock"
  | "bundles"
  | "services"
  | "staff-follow-up"
  | "insights"
  | "operations"
  | "ai-automation"
  | "audit"
  | "settings";

export type AgentStatus = "active" | "preview-mode" | "fallback-ready";
export type LayerStatus = "Active" | "Preview Mode" | "Planned";

export interface SidebarItem {
  id: SectionId;
  label: string;
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
  businessPurpose: string;
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

export interface RetailSignal {
  label: string;
  value: string;
  detail: string;
  status?: string;
}

export interface JourneyStage {
  label: string;
  detail: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: "home", label: "Dashboard" },
  { id: "customers", label: "Pelanggan" },
  { id: "inquiries", label: "Inquiry / Permintaan" },
  { id: "products-stock", label: "Produk & Stok" },
  { id: "bundles", label: "Paket & Bundling" },
  { id: "services", label: "Layanan" },
  { id: "staff-follow-up", label: "Staff Follow-up" },
  { id: "insights", label: "Insight Bisnis" },
  { id: "operations", label: "Operasional" },
  { id: "ai-automation", label: "AI & Automation" },
  { id: "audit", label: "Audit Log" },
  { id: "settings", label: "Pengaturan" },
];

export const executiveMetrics: RetailSignal[] = [
  {
    label: "Kebutuhan pelanggan masuk",
    value: "128",
    detail: "Sinyal kebutuhan pelanggan dari berbagai kategori.",
    status: "Workflow signal",
  },
  {
    label: "Peluang paket",
    value: "18",
    detail: "Paket produk dan layanan yang siap ditindaklanjuti.",
    status: "Workflow",
  },
  {
    label: "Tindak lanjut layanan",
    value: "11",
    detail: "Sinyal instalasi atau konsultasi untuk tim toko.",
    status: "Siap staf",
  },
  {
    label: "Kesehatan sistem AI",
    value: "Operational",
    detail: "Workflow AI berjalan dan memiliki Fallback.",
    status: "Healthy",
  },
];

export const problemClusters: RetailSignal[] = [
  { label: "Keamanan kamar mandi", value: "Minat tinggi", detail: "Lansia, anti-slip, pegangan, dan pencahayaan." },
  { label: "Kebocoran air", value: "Meningkat", detail: "Deteksi bocor, sealant, pipa, dan arahan staf." },
  { label: "Pemilihan cat", value: "Berulang", detail: "Warna, tipe ruangan, kebutuhan cat, dan alat." },
  { label: "Pompa & plumbing", value: "Terkait layanan", detail: "Pompa air, fitting pipa, dan pertanyaan instalasi." },
  { label: "Renovasi dapur", value: "Bisa dipaketkan", detail: "Storage, sink, lighting, dan kebutuhan permukaan." },
  { label: "Upgrade lighting", value: "Cross-sell", detail: "Terang, aman, hemat energi, dan pilihan fixture." },
];

export const businessOpportunities: RetailSignal[] = [
  { label: "Safety bundle campaign", value: "Priority", detail: "Bundle anti-slip, grab bars, lighting, and staff guidance." },
  { label: "Plumbing service bundle", value: "Opportunity", detail: "Link leakage inquiries to repair kits and service follow-up." },
  { label: "Paint consultation path", value: "Opportunity", detail: "Guide color, surface prep, tools, and coverage estimates." },
  { label: "Installation upsell", value: "Opportunity", detail: "Connect complex product baskets to installation guidance." },
];

export const recommendedDecisions: RetailSignal[] = [
  { label: "Prioritaskan paket keamanan kamar mandi", value: "Aksi berikutnya", detail: "Cluster minat tinggi dengan alur jual berbantuan staf." },
  { label: "Siapkan skrip penjualan berbantuan staf", value: "Aksi berikutnya", detail: "Bantu tim toko menjelaskan solusi untuk keluarga caregiver." },
  { label: "Petakan pertanyaan plumbing berulang", value: "Aksi berikutnya", detail: "Perkaya knowledge mapping untuk bocor dan pompa." },
  { label: "Tinjau kapasitas layanan instalasi", value: "Aksi berikutnya", detail: "Pastikan kesiapan follow-up sebelum memperluas layanan." },
];

export const operationalAlerts: RetailSignal[] = [
  { label: "Cluster minat tinggi terdeteksi", value: "Keamanan kamar mandi", detail: "Beberapa sinyal mengarah ke kebutuhan safety yang mendesak." },
  { label: "Antrean layanan meningkat", value: "Pantau", detail: "Arahan instalasi dan perbaikan perlu review kapasitas staf." },
  { label: "Knowledge mapping perlu update", value: "Dalam pengembangan", detail: "Topik plumbing dan cat perlu mapping yang lebih stabil." },
  { label: "Fallback sehat", value: "Operational", detail: "Fallback deterministik tersedia untuk menjaga alur." },
];

export const customerIntentClusters: RetailSignal[] = [
  { label: "Caregiver household", value: "Safety first", detail: "Needs trusted guidance for elderly bathroom safety.", status: "High urgency" },
  { label: "Leakage repair shopper", value: "Problem solving", detail: "Asks about sealant, pipe fittings, and repair workflow.", status: "Medium urgency" },
  { label: "Paint planning customer", value: "Decision support", detail: "Needs color, room, quantity, and tool guidance.", status: "Low urgency" },
  { label: "Renovation planner", value: "Project basket", detail: "Compares kitchen, lighting, storage, and service options.", status: "Medium urgency" },
];

export const inquiryPatterns: RetailSignal[] = [
  { label: "Common user input", value: "Kamar mandi licin untuk orang tua", detail: "Safety and caregiver intent." },
  { label: "Common user input", value: "Pipa bocor dan air merembes", detail: "Leakage and repair intent." },
  { label: "Common user input", value: "Cat yang cocok untuk kamar anak", detail: "Paint consultation intent." },
  { label: "Budget signal", value: "Hemat dulu", detail: "Prioritize essential basket before premium additions." },
];

export const aggregateJourneyStages: JourneyStage[] = [
  { label: "Customer problem", detail: "Customer describes a household need across safety, repair, paint, plumbing, or renovation." },
  { label: "Guided intake", detail: "Retail OS captures story, context, preference, and urgency signals." },
  { label: "LLM triage", detail: "Configurable provider layer can assist classification when configured." },
  { label: "Semantic normalization", detail: "Equivalent phrasing maps into stable retail workflow states." },
  { label: "Product bundle", detail: "Categories, cross-sell, and service linkage are assembled into a basket opportunity." },
  { label: "Staff handoff", detail: "Store teams receive a concise next-best-action summary." },
  { label: "Business insight", detail: "Stakeholders see campaign, category, and operations signals." },
];

export const bundleCandidates: RetailSignal[] = [
  { label: "Bathroom Safety Starter", value: "Anti-slip + grab bar + lighting", detail: "Best fit for caregiver household and elderly safety intent." },
  { label: "Leakage Quick Fix", value: "Sealant + pipe fitting + staff guidance", detail: "Links repair products with optional service follow-up." },
  { label: "Paint Consultation Basket", value: "Paint + primer + tools", detail: "Guides color, surface prep, and quantity planning." },
  { label: "Kitchen Upgrade Path", value: "Storage + sink + lighting", detail: "Cross-sell opportunity for renovation planners." },
];

export const serviceSignals: RetailSignal[] = [
  { label: "Installation guidance", value: "Bathroom safety", detail: "Grab bar and lighting guidance can trigger staff follow-up." },
  { label: "Repair guidance", value: "Water leakage", detail: "Pipe and sealant inquiries may require service triage." },
  { label: "Consultation request", value: "Paint selection", detail: "Staff can help validate color and coverage choices." },
  { label: "Project request signal", value: "Kitchen renovation", detail: "Multi-category baskets benefit from assisted planning." },
];

export const agentFleet: AgentDefinition[] = [
  {
    id: "customer-triage",
    name: "Customer Triage Agent",
    shortName: "Customer Triage",
    status: "active",
    criticality: "Core",
    modelUsed: "Configurable provider / Gemini 2.0 Flash when configured",
    costTier: "Low",
    fallbackBehavior: "Deterministic triage if LLM is unavailable or invalid",
    lastRunStatus: "Completed in deterministic fallback mode",
    outputType: "Structured triage JSON",
    role: "Converts customer language and chip selections into a stable problem category, user context, constraints, and normalized need.",
    businessPurpose: "Turns ambiguous customer needs into a retail workflow that staff, category, and service teams can act on.",
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
    businessPurpose: "Helps prioritize urgency and protects staff from treating all inquiries as equal.",
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
    fallbackBehavior: "Continues with current-scope product catalog and safe category matching",
    lastRunStatus: "Matched bathroom safety product groups",
    outputType: "Sectioned product recommendations",
    role: "Maps risk evidence to relevant QHomemart-style product categories.",
    businessPurpose: "Converts customer problems into basket and category opportunities.",
    inputContract: "TriageOutput, RiskOutput, current-scope product catalog.",
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
    businessPurpose: "Identifies when a product basket may need staff follow-up or service guidance.",
    inputContract: "TriageOutput, RiskOutput, current-scope service list.",
    reasoningTask: "Decide when staff-assisted service guidance is useful and how to phrase availability safely.",
    outputContract: "Optional Section C service guidance and availability note.",
    downstreamConsumer: "Bundle Strategy Agent",
    evidenceGenerated: "Service match reason and current-scope availability note.",
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
    businessPurpose: "Creates bundle candidates that category and store teams can operationalize.",
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
    status: "preview-mode",
    criticality: "Medium",
    modelUsed: "Deterministic insight synthesis",
    costTier: "Low",
    fallbackBehavior: "Summarizes current workflow outputs for staff review",
    lastRunStatus: "Generated staff summary and business insight",
    outputType: "Staff summary and stakeholder insight",
    role: "Turns the workflow into staff-facing guidance and stakeholder decision support.",
    businessPurpose: "Makes workflow output useful for selling scripts, campaign planning, and management decisions.",
    inputContract: "All previous agent outputs.",
    reasoningTask: "Explain the customer need, pain cluster, bundle opportunity, and campaign signal.",
    outputContract: "Staff summary and businessInsight object.",
    downstreamConsumer: "Dashboard, staff selling flow, future CMS modules.",
    evidenceGenerated: "Business opportunity, marketing signal, and staff summary.",
  },
  {
    id: "decision-synthesizer",
    name: "Decision Synthesizer / Arbitration Agent",
    shortName: "Decision Synthesizer",
    status: "active",
    criticality: "Core",
    modelUsed: "Deterministic arbitration policy",
    costTier: "Low",
    fallbackBehavior: "Flags conflict or uncertainty for human review",
    lastRunStatus: "Final recommendation synthesized with confidence and review policy",
    outputType: "Final decision, rationale, confidence, review requirement",
    role: "Receives all previous agent outputs, compares recommendations, detects conflicts, and selects the final auditable recommendation.",
    businessPurpose: "Prevents the dashboard from presenting fragmented agent outputs as a final decision without arbitration.",
    inputContract: "Triage, risks, product matches, service guidance, bundle output, staff insight, reasoning metadata.",
    reasoningTask: "Check consistency, resolve conflicts, calculate confidence, and decide whether human review is required.",
    outputContract: "finalRecommendation, rationale, confidence, conflictsDetected, humanReviewRequired, recommendedNextAction.",
    downstreamConsumer: "Audit Log, Staff Follow-up, stakeholder decision queue.",
    evidenceGenerated: "Decision rationale, rejected alternatives, conflict handling, confidence, and review reason.",
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
    taskFit: "Selected for Indonesian structured JSON triage and low-latency configured workflow routing.",
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
    taskFit: "Candidate for deeper review tasks, not selected for this current-scope triage path.",
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
    continuityBenefit: "Stable typed contract continues through all workflow agents.",
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
    explanation: "Uses story text, chips, and buying preference from the configured intake UI.",
    status: "Active",
  },
  {
    label: "Context Collection",
    explanation: "Extracts room, user profile, and constraints from the captured input.",
    status: "Active",
  },
  {
    label: "Model Routing",
    explanation: "Routes to the configured provider for LLM-assisted triage when configured, otherwise deterministic logic.",
    status: "Preview Mode",
  },
  {
    label: "Validation",
    explanation: "Requires a valid structured candidate before model output can influence the workflow.",
    status: "Active",
  },
  {
    label: "Semantic Normalization",
    explanation: "Maps equivalent phrases to the canonical workflow state used by downstream agents.",
    status: "Preview Mode",
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
