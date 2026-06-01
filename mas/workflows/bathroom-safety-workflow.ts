/**
 * Bathroom Safety Workflow Orchestrator
 *
 * Coordinates the full multi-agent pipeline for the bathroom-safety demo
 * scenario. Calls each agent in sequence and captures an interaction log
 * entry after each step.
 *
 * Default input is derived from the canonical demo scenario:
 *   - User story: "Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi."
 *   - Selected chips: Kamar mandi licin, Lantai sering basah, Pernah hampir terpeleset,
 *                     Kurang pegangan, Cahaya kurang terang, Budget terbatas
 *   - Buying preference: "Hemat dulu"
 *
 * Two workflow functions are provided:
 *
 *   runBathroomSafetyWorkflow(input?)
 *     Synchronous. Deterministic. Uses the deterministic triage agent directly.
 *     Safe to call at module level (e.g., in Next.js page.tsx).
 *     aiMeta is populated via getLLMTriageAvailability() — no network call.
 *
 *   runBathroomSafetyWorkflowAsync(input?)
 *     Async. Uses runHybridCustomerTriageAgent() which checks for optional LLM.
 *     For future use when an LLM provider integration is implemented.
 *     Not used by the public demo UI.
 *
 * Current scope only. Not connected to real QHomemart production systems.
 */

import { runCustomerTriageAgent, runHybridCustomerTriageAgent } from "@/agents/customer-triage-agent";
import { runContextRiskAgent } from "@/agents/context-risk-agent";
import { runProductMatchAgent } from "@/agents/product-match-agent";
import { runServiceMatchAgent } from "@/agents/service-match-agent";
import { runBundleStrategyAgent } from "@/agents/bundle-strategy-agent";
import { runStaffInsightAgent } from "@/agents/staff-insight-agent";
import { runDecisionSynthesizerAgent } from "@/agents/decision-synthesizer-agent";
import { createInteractionLogEntry } from "@/workflows/interaction-logger";
import { getLLMTriageAvailability } from "@/ai/llm-triage-adapter";
import { getRuntimeModeSummary } from "@/lib/agent-runtime-config";
import { demoProducts } from "@/data/products";
import { demoServices } from "@/data/services";
import { bundleRules } from "@/data/bundle-rules";
import { demoScenario, plumbingLeakScenario } from "@/data/demo-scenario";
import type {
  AgentOutput,
  CustomerInput,
  WorkflowRunResult,
  AIExecutionMetadata,
  TriageOutput,
} from "@/types/mas-types";

// ---------------------------------------------------------------------------
// Default demo input
// ---------------------------------------------------------------------------

const DEFAULT_INPUT: CustomerInput = demoScenario;

const SCENARIO_REGISTRY = {
  "demo-bathroom-safety-001": {
    title: "Keamanan Kamar Mandi untuk Lansia",
    input: demoScenario,
  },
  "demo-plumbing-leak-001": {
    title: "Kebocoran Pipa Dapur",
    input: plumbingLeakScenario,
  },
};

function createAgentOutput<T extends Record<string, unknown>>({
  agentName,
  requestedMode,
  executionMode,
  effectiveMode,
  usedLLM,
  provider,
  model,
  inputSummary,
  outputSummary,
  confidence,
  reasoningBasis,
  decisionCriteria,
  rejectedAlternatives,
  requiresHumanReview,
  warnings,
  structuredOutput,
}: AgentOutput<T>): AgentOutput<T> {
  return {
    agentName,
    requestedMode,
    executionMode,
    effectiveMode,
    usedLLM,
    provider,
    model,
    inputSummary,
    outputSummary,
    confidence,
    reasoningBasis,
    decisionCriteria,
    rejectedAlternatives,
    requiresHumanReview,
    warnings,
    structuredOutput,
  };
}

function resolveScenario(input: CustomerInput) {
  const matched = Object.entries(SCENARIO_REGISTRY).find(([, scenario]) =>
    scenario.input.userStory === input.userStory
  );

  return matched
    ? { id: matched[0], title: matched[1].title }
    : { id: "custom-local-scenario", title: "Custom Local Scenario" };
}

// ---------------------------------------------------------------------------
// Shared pipeline — called by both sync and async variants
// ---------------------------------------------------------------------------

function buildWorkflowResult(
  customerInput: CustomerInput,
  triage: TriageOutput,
  aiMeta: AIExecutionMetadata
): WorkflowRunResult {
  const interactionLog = [];
  const agentOutputs: AgentOutput<Record<string, unknown>>[] = [];
  const runtime = getRuntimeModeSummary();
  const workflowEffectiveMode = aiMeta.usedLLM ? "llm-assisted" : "deterministic";
  const fallbackUsed = runtime.requestedMode === "llm-assisted" && !aiMeta.usedLLM;
  const fallbackReason =
    fallbackUsed
      ? aiMeta.aiReason ?? runtime.warnings[0] ?? "LLM-assisted mode unavailable. Deterministic fallback used."
      : "None";

  // Step 1 — Customer Triage Agent
  const aiModeLabel =
    aiMeta.aiMode === "llm-assisted" ? "LLM-assisted triage" : "deterministic fallback";
  const triageAgentOutput = createAgentOutput({
    agentName: "Customer Triage Agent",
    requestedMode: runtime.requestedMode,
    executionMode: workflowEffectiveMode,
    effectiveMode: workflowEffectiveMode,
    usedLLM: aiMeta.usedLLM ?? false,
    provider: aiMeta.provider ?? aiMeta.aiProvider ?? runtime.provider,
    model: aiMeta.model ?? aiMeta.aiModel ?? runtime.model,
    inputSummary: `Cerita pelanggan, chips kondisi, dan preferensi beli.`,
    outputSummary: `Masalah: ${triage.problemCategory}. Ruang: ${triage.primarySpace}. Pengguna utama: ${triage.primaryUser}.`,
    confidence: aiMeta.aiMode === "llm-assisted" ? 0.86 : 0.82,
    reasoningBasis: [
      "Natural language customer story",
      "Selected condition chips",
      "Semantic normalization into canonical workflow state",
    ],
    decisionCriteria: ["Problem category", "Primary space", "Primary user", "Budget constraint"],
    rejectedAlternatives:
      triage.problemCategory === "Kebocoran pipa dapur"
        ? ["Bathroom safety bundle", "Paint consultation"]
        : ["General renovation", "Plumbing leak handling"],
    requiresHumanReview: false,
    warnings: aiMeta.warnings ?? runtime.warnings,
    structuredOutput: {
      ...(triage as unknown as Record<string, unknown>),
      aiMeta,
    },
  });
  agentOutputs.push(triageAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 1,
      agentName: "Customer Triage Agent",
      sourceAgent: "Customer",
      targetAgent: "Context & Risk Agent",
      inputSummary: `Cerita: "${customerInput.userStory}" | Chips: ${customerInput.selectedChips.join(", ")} | Preferensi: ${customerInput.buyingPreference}`,
      outputSummary: `Masalah: ${triage.problemCategory}. Pengguna utama: ${triage.primaryUser}. Preferensi: ${customerInput.buyingPreference}. Mode: ${aiModeLabel}.`,
      confidence: triageAgentOutput.confidence,
      reasoningBasis: triageAgentOutput.reasoningBasis,
      requestedMode: runtime.requestedMode,
      executionMode: workflowEffectiveMode,
      effectiveMode: workflowEffectiveMode,
      usedLLM: aiMeta.usedLLM ?? false,
      provider: aiMeta.provider ?? aiMeta.aiProvider ?? runtime.provider,
      model: aiMeta.model ?? aiMeta.aiModel ?? runtime.model,
      decisionDependency: "Defines canonical demand state for all downstream agents.",
      fallbackStatus: aiMeta.usedLLM ? "LLM-assisted triage used" : fallbackUsed ? "Deterministic fallback used" : "Deterministic mode used",
      fallbackReason,
      requiresHumanReview: false,
      humanReviewStatus: "Not required at triage step",
      warnings: aiMeta.warnings ?? runtime.warnings,
      structuredOutput: triageAgentOutput.structuredOutput,
    })
  );

  // Step 2 — Context & Risk Agent
  const risks = runContextRiskAgent(triage);
  const highPriorityRisks = risks.risks.filter((r) => r.severity === "Tinggi");
  const riskAgentOutput = createAgentOutput({
    agentName: "Context & Risk Agent",
    inputSummary: `Canonical problem "${triage.problemCategory}" for ${triage.primaryUser}.`,
    outputSummary: `${risks.risks.length} risiko teridentifikasi, ${highPriorityRisks.length} risiko tinggi.`,
    confidence: 0.84,
    reasoningBasis: ["Rule-based risk mapping", "Severity ordering", "Problem-to-risk taxonomy"],
    decisionCriteria: ["Safety severity", "Operational urgency", "Downstream product dependency"],
    rejectedAlternatives: ["Treat as generic inquiry without risk order"],
    requiresHumanReview: highPriorityRisks.length >= 2,
    structuredOutput: risks as unknown as Record<string, unknown>,
  });
  agentOutputs.push(riskAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 2,
      agentName: "Context & Risk Agent",
      sourceAgent: "Customer Triage Agent",
      targetAgent: "Product Match Agent",
      inputSummary: `TriageOutput: kategori "${triage.problemCategory}", pengguna "${triage.primaryUser}"`,
      outputSummary: `Risiko tinggi: ${highPriorityRisks.map((r) => r.label).join(" dan ")}. Risiko sedang: ${risks.risks.filter((r) => r.severity === "Sedang").map((r) => r.label).join(" dan ")}.`,
      confidence: riskAgentOutput.confidence,
      reasoningBasis: riskAgentOutput.reasoningBasis,
      decisionDependency: "Ranks risks so product and service agents can prioritize recommendations.",
      humanReviewStatus: riskAgentOutput.requiresHumanReview ? "Recommended for high-risk case" : "Not required",
      structuredOutput: riskAgentOutput.structuredOutput,
    })
  );

  // Step 3 — Product Match Agent
  const products = runProductMatchAgent(triage, risks, demoProducts);
  const totalProducts = products.sectionA.length + products.sectionB.length;
  const productAgentOutput = createAgentOutput({
    agentName: "Product Match Agent",
    inputSummary: `${risks.risks.length} risk items matched against local product mapping.`,
    outputSummary: `${totalProducts} produk cocok: ${products.sectionA.length} prioritas dan ${products.sectionB.length} pendukung.`,
    confidence: totalProducts > 0 ? 0.86 : 0.55,
    reasoningBasis: ["Risk-addressed product mapping", "Priority section rules", "Local demo catalog"],
    decisionCriteria: ["Risk addressed", "Priority", "Budget tier", "Bundle section"],
    rejectedAlternatives: ["Products with unrelated riskAddressed values"],
    requiresHumanReview: totalProducts === 0,
    structuredOutput: {
      sectionACount: products.sectionA.length,
      sectionBCount: products.sectionB.length,
      products: products as unknown as Record<string, unknown>,
    },
  });
  agentOutputs.push(productAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 3,
      agentName: "Product Match Agent",
      sourceAgent: "Context & Risk Agent",
      targetAgent: "Service Match Agent",
      inputSummary: `RiskOutput: ${risks.risks.length} risiko teridentifikasi`,
      outputSummary: `Kategori produk cocok: anti-slip, pegangan kamar mandi, pencahayaan, rak rendah. ${totalProducts} produk dikelompokkan ke dalam 2 seksi.`,
      confidence: productAgentOutput.confidence,
      reasoningBasis: productAgentOutput.reasoningBasis,
      decisionDependency: "Provides product candidates for bundle composition.",
      humanReviewStatus: productAgentOutput.requiresHumanReview ? "Required because no product match exists" : "Not required",
      structuredOutput: productAgentOutput.structuredOutput,
    })
  );

  // Step 4 — Service Match Agent
  const services = runServiceMatchAgent(triage, risks, demoServices);
  const serviceAgentOutput = createAgentOutput({
    agentName: "Service Match Agent",
    inputSummary: `Problem "${triage.problemCategory}" with ${risks.risks.length} risk items.`,
    outputSummary: `${services.sectionC.length} arahan layanan opsional dibuat dengan catatan ketersediaan.`,
    confidence: 0.74,
    reasoningBasis: ["Service guidance mapping", "Installation/support dependency", "Availability disclaimer"],
    decisionCriteria: ["Need for installation", "Need for staff validation", "Service availability unknown"],
    rejectedAlternatives: ["Claim live service booking", "Guarantee technician availability"],
    requiresHumanReview: services.sectionC.length > 0,
    structuredOutput: services as unknown as Record<string, unknown>,
  });
  agentOutputs.push(serviceAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 4,
      agentName: "Service Match Agent",
      sourceAgent: "Product Match Agent",
      targetAgent: "Bundle Strategy Agent",
      inputSummary: `RiskOutput: ${risks.risks.length} risiko, produk Section A memerlukan pemasangan`,
      outputSummary: `Layanan terkait: cek pemasangan atau renovasi ringan jika diperlukan.`,
      confidence: serviceAgentOutput.confidence,
      reasoningBasis: serviceAgentOutput.reasoningBasis,
      decisionDependency: "Adds optional service guidance without claiming live service availability.",
      humanReviewStatus: "Staff validation recommended before service promise",
      structuredOutput: serviceAgentOutput.structuredOutput,
    })
  );

  // Step 5 — Bundle Strategy Agent
  const bundle = runBundleStrategyAgent(
    products,
    services,
    customerInput.buyingPreference,
    bundleRules
  );
  const bundleAgentOutput = createAgentOutput({
    agentName: "Bundle Strategy Agent",
    inputSummary: `${totalProducts} products, ${services.sectionC.length} service guidance entries, preference "${customerInput.buyingPreference}".`,
    outputSummary: `Bundle "${bundle.bundleTitle}" disusun dalam ${bundle.sections.length} sections.`,
    confidence: 0.83,
    reasoningBasis: ["Bundle section rules", "Buying preference", "Product priority order"],
    decisionCriteria: ["Section A essentials first", "Section B support items", "Section C optional service guidance"],
    rejectedAlternatives: ["Single flat product list", "Service-first recommendation"],
    requiresHumanReview: false,
    structuredOutput: bundle as unknown as Record<string, unknown>,
  });
  agentOutputs.push(bundleAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 5,
      agentName: "Bundle Strategy Agent",
      sourceAgent: "Service Match Agent",
      targetAgent: "Staff & Insight Agent",
      inputSummary: `ProductMatchOutput: ${totalProducts} produk, ServiceMatchOutput: ${services.sectionC.length} layanan`,
      outputSummary: `Menyusun solusi bertingkat: mulai dari yang paling perlu, tambahan yang disarankan, dan opsi bantuan jasa. ${bundle.sections.length} seksi disusun.`,
      confidence: bundleAgentOutput.confidence,
      reasoningBasis: bundleAgentOutput.reasoningBasis,
      decisionDependency: "Creates the customer-facing package structure used by staff and synthesis.",
      structuredOutput: bundleAgentOutput.structuredOutput,
    })
  );

  // Step 6 — Staff & Insight Agent
  const staffInsight = runStaffInsightAgent(triage, risks, products, services, bundle);
  const staffAgentOutput = createAgentOutput({
    agentName: "Staff & Insight Agent",
    inputSummary: "All upstream outputs: triage, risks, products, services, bundle.",
    outputSummary: `Staff summary and business insight generated for "${staffInsight.businessInsight.bundleOpportunity}".`,
    confidence: 0.81,
    reasoningBasis: ["Upstream workflow outputs", "Business insight mapping", "Staff handoff requirements"],
    decisionCriteria: ["Staff readability", "Commercial opportunity", "Marketing signal", "Operational handoff"],
    rejectedAlternatives: ["Technical-only explanation", "Customer-facing claim without staff validation"],
    requiresHumanReview: true,
    structuredOutput: staffInsight as unknown as Record<string, unknown>,
  });
  agentOutputs.push(staffAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 6,
      agentName: "Staff & Insight Agent",
      sourceAgent: "Bundle Strategy Agent",
      targetAgent: "Decision Synthesizer / Arbitration Agent",
      inputSummary: `Semua output agen sebelumnya: triage, risks, products, services, bundle`,
      outputSummary: `Membuat ringkasan untuk staf dan insight peluang paket untuk QHomemart.`,
      confidence: staffAgentOutput.confidence,
      reasoningBasis: staffAgentOutput.reasoningBasis,
      decisionDependency: "Feeds operational summary and business signals into final arbitration.",
      humanReviewStatus: "Staff review recommended before customer follow-up",
      structuredOutput: staffAgentOutput.structuredOutput,
    })
  );

  // Step 7 — Decision Synthesizer / Arbitration Agent
  const decision = runDecisionSynthesizerAgent({
    triage,
    risks,
    products,
    services,
    bundle,
    staffInsight,
  });
  const decisionAgentOutput = createAgentOutput({
    agentName: "Decision Synthesizer / Arbitration Agent",
    requestedMode: decision.requestedMode,
    executionMode: decision.executionMode,
    effectiveMode: decision.effectiveMode,
    usedLLM: decision.usedLLM,
    provider: decision.provider,
    model: decision.model,
    inputSummary: "All previous agent outputs and reasoning metadata.",
    outputSummary: `${decision.finalRecommendation}. Confidence ${(decision.confidence * 100).toFixed(0)}%.`,
    confidence: decision.confidence,
    reasoningBasis: [
      "Cross-agent consistency check",
      "Conflict detection",
      "Human review policy",
      "Final recommendation arbitration",
    ],
    decisionCriteria: ["Safety or damage risk", "Product match availability", "Service uncertainty", "Staff review need"],
    rejectedAlternatives: decision.conflictsDetected.length > 0
      ? ["Auto-approve without staff review"]
      : ["Escalate without operational reason"],
    requiresHumanReview: decision.humanReviewRequired,
    warnings: decision.warnings,
    structuredOutput: decision as unknown as Record<string, unknown>,
  });
  agentOutputs.push(decisionAgentOutput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 7,
      agentName: "Decision Synthesizer / Arbitration Agent",
      sourceAgent: "Staff & Insight Agent",
      targetAgent: "Staff Follow-up / Audit Log",
      inputSummary: "Outputs from Customer Triage, Context & Risk, Product Match, Service Match, Bundle Strategy, and Staff & Insight agents.",
      outputSummary: decision.finalRecommendation,
      confidence: decisionAgentOutput.confidence,
      reasoningBasis: decisionAgentOutput.reasoningBasis,
      requestedMode: decision.requestedMode,
      executionMode: decision.executionMode,
      effectiveMode: decision.effectiveMode,
      usedLLM: decision.usedLLM,
      provider: decision.provider,
      model: decision.model,
      decisionDependency: "Final auditable recommendation and human-review instruction.",
      fallbackStatus: decision.conflictsDetected.length > 0 ? "Conflict handled by arbitration policy" : "No fallback triggered",
      fallbackReason: decision.usedLLM ? "None" : "Deterministic arbitration used.",
      requiresHumanReview: decision.humanReviewRequired,
      humanReviewStatus: decision.humanReviewRequired ? decision.reviewReason : "Not required",
      warnings: decision.warnings,
      structuredOutput: decisionAgentOutput.structuredOutput,
    })
  );

  const metrics = {
    risksDetected: risks.risks.length,
    highPriorityRisks: highPriorityRisks.length,
    productsSuggested: totalProducts,
    serviceOptionsSuggested: services.sectionC.length,
    bundleSections: bundle.sections.length,
    staffSummaryGenerated: staffInsight.staffSummary.length > 0,
    businessInsightGenerated:
      staffInsight.businessInsight.businessOpportunities.length > 0,
    agentStepsLogged: interactionLog.length,
    decisionSynthesized: decision.finalRecommendation.length > 0,
    triageAiMode: aiMeta.aiMode,
  };
  const scenario = resolveScenario(customerInput);

  return {
    scenarioId: scenario.id,
    scenarioName: scenario.title,
    requestedMode: runtime.requestedMode,
    executionMode: workflowEffectiveMode,
    effectiveMode: workflowEffectiveMode,
    llmAvailable: runtime.llmAvailable,
    llmProvider: runtime.provider,
    llmModel: runtime.model,
    fallbackUsed,
    fallbackReason,
    warnings: Array.from(new Set([...(runtime.warnings ?? []), ...(aiMeta.warnings ?? []), ...(decision.warnings ?? [])])),
    scenario: {
      id: scenario.id,
      title: scenario.title,
      userStory: customerInput.userStory,
      selectedChips: customerInput.selectedChips,
      buyingPreference: customerInput.buyingPreference,
    },
    triage,
    risks,
    products,
    services,
    bundle,
    staffSummary: staffInsight.staffSummary,
    businessInsight: staffInsight.businessInsight,
    decision,
    finalDecision: decision,
    agentOutputs,
    interactionLog,
    businessImpact: staffInsight.businessInsight.businessOpportunities,
    reproducibilityNote:
      "Deterministic mode runs without API key. LLM-assisted mode is optional and applies only to selected agents.",
    metrics,
    technicalNote:
      "Data current scope menggunakan sample data modular. Katalog produk, layanan, promo, stok, dan kanal WhatsApp dapat diganti dengan data QHomemart pada fase integrasi. Sistem ini belum terhubung ke sistem produksi QHomemart.",
    aiMeta,
  };
}

// ---------------------------------------------------------------------------
// Synchronous workflow (used by public demo UI)
// ---------------------------------------------------------------------------

/**
 * Runs the complete Bathroom Safety multi-agent workflow synchronously.
 *
 * Uses the deterministic triage agent directly. AI mode metadata is populated
 * via getLLMTriageAvailability() (no network call). Safe to call at module level.
 *
 * @param input - Optional customer input; falls back to the canonical demo scenario
 * @returns WorkflowRunResult — complete, reproducible workflow output
 */
export function runBathroomSafetyWorkflow(
  input?: CustomerInput
): WorkflowRunResult {
  const customerInput = input ?? DEFAULT_INPUT;
  const triage = runCustomerTriageAgent(customerInput);
  const aiMeta = getLLMTriageAvailability();
  return buildWorkflowResult(customerInput, triage, aiMeta);
}

export function runPlumbingLeakWorkflow(): WorkflowRunResult {
  return runBathroomSafetyWorkflow(plumbingLeakScenario);
}

export function runAllDemoWorkflows(): WorkflowRunResult[] {
  return [
    runBathroomSafetyWorkflow(demoScenario),
    runPlumbingLeakWorkflow(),
  ];
}

// ---------------------------------------------------------------------------
// Async workflow (for future LLM-assisted triage)
// ---------------------------------------------------------------------------

/**
 * Runs the complete Bathroom Safety multi-agent workflow asynchronously.
 *
 * Uses runHybridCustomerTriageAgent() which checks for an optional LLM provider.
 * All downstream agents (steps 2–6) remain deterministic.
 *
 * In the current prototype, this also returns deterministic output because
 * no LLM provider integration has been implemented yet.
 *
 * @param input - Optional customer input; falls back to the canonical demo scenario
 * @returns Promise<WorkflowRunResult>
 */
export async function runBathroomSafetyWorkflowAsync(
  input?: CustomerInput
): Promise<WorkflowRunResult> {
  const customerInput = input ?? DEFAULT_INPUT;
  const hybridTriage = await runHybridCustomerTriageAgent(customerInput);
  const { aiMeta, ...triage } = hybridTriage;
  return buildWorkflowResult(customerInput, triage, aiMeta);
}
