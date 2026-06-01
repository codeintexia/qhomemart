/**
 * Decision Synthesizer / Arbitration Agent
 *
 * Role: receives outputs from all previous workflow agents, compares their
 * recommendations, detects operational conflicts, and produces the final
 * auditable recommendation. This agent is deterministic in the current scope.
 */

import type {
  BundleOutput,
  DecisionSynthesizerOutput,
  ProductMatchOutput,
  RiskOutput,
  ServiceMatchOutput,
  StaffInsightOutput,
  TriageOutput,
} from "@/types/mas-types";
import { getRuntimeModeSummary } from "@/lib/agent-runtime-config";

export function runDecisionSynthesizerAgent({
  triage,
  risks,
  products,
  services,
  bundle,
  staffInsight,
}: {
  triage: TriageOutput;
  risks: RiskOutput;
  products: ProductMatchOutput;
  services: ServiceMatchOutput;
  bundle: BundleOutput;
  staffInsight: StaffInsightOutput;
}): DecisionSynthesizerOutput {
  const runtime = getRuntimeModeSummary();
  const highRisks = risks.risks.filter((risk) => risk.severity === "Tinggi");
  const productCount = products.sectionA.length + products.sectionB.length;
  const conflictsDetected: string[] = [];
  const conflictResolution: string[] = [];

  if (highRisks.length > 0 && products.sectionA.length === 0) {
    conflictsDetected.push("Risiko tinggi terdeteksi, tetapi tidak ada produk prioritas Section A.");
    conflictResolution.push("Wajib human review sebelum rekomendasi diberikan ke customer.");
  }

  if (services.sectionC.length > 0) {
    conflictsDetected.push("Ada kebutuhan layanan, tetapi ketersediaan layanan belum terhubung live.");
    conflictResolution.push("Tampilkan layanan sebagai arahan opsional dan minta staff memvalidasi ketersediaan.");
  }

  const confidence = Math.max(
    0.62,
    Math.min(0.93, 0.78 + productCount * 0.02 - conflictsDetected.length * 0.05)
  );
  const finalRecommendation = `${bundle.bundleTitle}: ${triage.normalizedNeed}`;
  const decisionRationale =
    `Rekomendasi dipilih karena triage, risk assessment, product match, service guidance, dan staff insight konsisten pada kebutuhan "${triage.problemCategory}". ` +
    `Risiko prioritas dipetakan ke produk Section A, sementara layanan tetap opsional karena belum terhubung live.`;
  const dependencySummary =
    `Final decision depends on ${risks.risks.length} risk signals, ${productCount} product matches, ${services.sectionC.length} service guidance entries, and staff insight "${staffInsight.businessInsight.bundleOpportunity}".`;
  const rejectedAlternatives =
    conflictsDetected.length > 0
      ? ["Auto-approve without staff validation", "Hide service uncertainty from staff"]
      : ["Escalate without operational reason"];
  const humanReviewRequired =
    highRisks.length >= 2 ||
    conflictsDetected.length > 0 ||
    triage.constraints.some((constraint) => constraint.toLowerCase().includes("budget"));

  return {
    agentName: "Decision Synthesizer / Arbitration Agent",
    requestedMode: runtime.requestedMode,
    executionMode: "deterministic",
    effectiveMode: "deterministic",
    usedLLM: false,
    provider: runtime.provider,
    model: runtime.model,
    finalRecommendation,
    finalConfidence: confidence,
    decisionRationale,
    selectedBundleTitle: bundle.bundleTitle,
    rationale: decisionRationale,
    confidence,
    detectedConflicts: conflictsDetected,
    conflictsDetected,
    dependencySummary,
    conflictResolution,
    humanReviewRequired,
    reviewReason: humanReviewRequired
      ? "Perlu validasi staff untuk risiko tinggi, budget constraint, atau ketersediaan layanan."
      : "Tidak ada konflik besar pada workflow deterministic.",
    rejectedAlternatives,
    warnings: [
      ...runtime.warnings,
      ...(runtime.requestedMode === "llm-assisted"
        ? ["Decision Synthesizer LLM narrative synthesis is not active in dashboard preview. Deterministic arbitration used."]
        : []),
    ],
    recommendedNextAction:
      staffInsight.businessInsight.bundleOpportunity.length > 0
        ? `Validasi paket "${staffInsight.businessInsight.bundleOpportunity}" dan lanjutkan follow-up staff.`
        : "Validasi hasil rekomendasi sebelum follow-up customer.",
    structuredOutput: {
      finalRecommendation,
      finalConfidence: confidence,
      decisionRationale,
      detectedConflicts: conflictsDetected,
      dependencySummary,
      humanReviewRequired,
      recommendedNextAction:
        staffInsight.businessInsight.bundleOpportunity.length > 0
          ? `Validasi paket "${staffInsight.businessInsight.bundleOpportunity}" dan lanjutkan follow-up staff.`
          : "Validasi hasil rekomendasi sebelum follow-up customer.",
    },
  };
}
