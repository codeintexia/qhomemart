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
 * The function is pure and deterministic — calling it multiple times with the
 * same input always produces the same output.
 *
 * Prototype only. Not connected to real QHomemart production systems.
 */

import { runCustomerTriageAgent } from "@/agents/customer-triage-agent";
import { runContextRiskAgent } from "@/agents/context-risk-agent";
import { runProductMatchAgent } from "@/agents/product-match-agent";
import { runServiceMatchAgent } from "@/agents/service-match-agent";
import { runBundleStrategyAgent } from "@/agents/bundle-strategy-agent";
import { runStaffInsightAgent } from "@/agents/staff-insight-agent";
import { createInteractionLogEntry } from "@/workflows/interaction-logger";
import { demoProducts } from "@/data/products";
import { demoServices } from "@/data/services";
import { bundleRules } from "@/data/bundle-rules";
import type { CustomerInput, WorkflowRunResult } from "@/types/mas-types";

// ---------------------------------------------------------------------------
// Default demo input
// ---------------------------------------------------------------------------

const DEFAULT_INPUT: CustomerInput = {
  userStory:
    "Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi.",
  selectedChips: [
    "Kamar mandi licin",
    "Lantai sering basah",
    "Pernah hampir terpeleset",
    "Kurang pegangan",
    "Cahaya kurang terang",
    "Budget terbatas",
  ],
  buyingPreference: "Hemat dulu",
};

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

/**
 * Runs the complete Bathroom Safety multi-agent workflow.
 *
 * Executes all six agents in sequence, logs each step, computes metrics,
 * and returns a fully structured WorkflowRunResult.
 *
 * @param input - Optional customer input; falls back to the canonical demo scenario
 * @returns WorkflowRunResult — the complete, reproducible workflow output
 */
export function runBathroomSafetyWorkflow(
  input?: CustomerInput
): WorkflowRunResult {
  const customerInput = input ?? DEFAULT_INPUT;
  const interactionLog = [];

  // Step 1 — Customer Triage Agent
  const triage = runCustomerTriageAgent(customerInput);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 1,
      agentName: "Customer Triage Agent",
      inputSummary: `Cerita: "${customerInput.userStory}" | Chips: ${customerInput.selectedChips.join(", ")} | Preferensi: ${customerInput.buyingPreference}`,
      outputSummary: `Masalah: ${triage.problemCategory}. Pengguna utama: ${triage.primaryUser}. Preferensi: ${customerInput.buyingPreference}.`,
      structuredOutput: triage as unknown as Record<string, unknown>,
    })
  );

  // Step 2 — Context & Risk Agent
  const risks = runContextRiskAgent(triage);
  const highPriorityRisks = risks.risks.filter((r) => r.severity === "Tinggi");
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 2,
      agentName: "Context & Risk Agent",
      inputSummary: `TriageOutput: kategori "${triage.problemCategory}", pengguna "${triage.primaryUser}"`,
      outputSummary: `Risiko tinggi: ${highPriorityRisks.map((r) => r.label).join(" dan ")}. Risiko sedang: ${risks.risks.filter((r) => r.severity === "Sedang").map((r) => r.label).join(" dan ")}.`,
      structuredOutput: risks as unknown as Record<string, unknown>,
    })
  );

  // Step 3 — Product Match Agent
  const products = runProductMatchAgent(triage, risks, demoProducts);
  const totalProducts =
    products.sectionA.length + products.sectionB.length;
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 3,
      agentName: "Product Match Agent",
      inputSummary: `RiskOutput: ${risks.risks.length} risiko teridentifikasi`,
      outputSummary: `Kategori produk cocok: anti-slip, pegangan kamar mandi, pencahayaan, rak rendah. ${totalProducts} produk dikelompokkan ke dalam 2 seksi.`,
      structuredOutput: {
        sectionACount: products.sectionA.length,
        sectionBCount: products.sectionB.length,
        products: products as unknown as Record<string, unknown>,
      },
    })
  );

  // Step 4 — Service Match Agent
  const services = runServiceMatchAgent(triage, risks, demoServices);
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 4,
      agentName: "Service Match Agent",
      inputSummary: `RiskOutput: ${risks.risks.length} risiko, produk Section A memerlukan pemasangan`,
      outputSummary: `Layanan terkait: cek pemasangan atau renovasi ringan jika diperlukan.`,
      structuredOutput: services as unknown as Record<string, unknown>,
    })
  );

  // Step 5 — Bundle Strategy Agent
  const bundle = runBundleStrategyAgent(
    products,
    services,
    customerInput.buyingPreference,
    bundleRules
  );
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 5,
      agentName: "Bundle Strategy Agent",
      inputSummary: `ProductMatchOutput: ${totalProducts} produk, ServiceMatchOutput: ${services.sectionC.length} layanan`,
      outputSummary: `Menyusun solusi bertingkat: mulai dari yang paling perlu, tambahan yang disarankan, dan opsi bantuan jasa. ${bundle.sections.length} seksi disusun.`,
      structuredOutput: bundle as unknown as Record<string, unknown>,
    })
  );

  // Step 6 — Staff & Insight Agent
  const staffInsight = runStaffInsightAgent(
    triage,
    risks,
    products,
    services,
    bundle
  );
  interactionLog.push(
    createInteractionLogEntry({
      stepNumber: 6,
      agentName: "Staff & Insight Agent",
      inputSummary: `Semua output agen sebelumnya: triage, risks, products, services, bundle`,
      outputSummary: `Membuat ringkasan untuk staf dan insight peluang paket untuk QHomemart.`,
      structuredOutput: staffInsight as unknown as Record<string, unknown>,
    })
  );

  // Compute metrics
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
  };

  return {
    scenario: {
      id: "demo-bathroom-safety-001",
      title: "Keamanan Kamar Mandi untuk Lansia",
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
    interactionLog,
    metrics,
    technicalNote:
      "Data demo menggunakan dummy data modular. Katalog produk, layanan, promo, stok, dan kanal WhatsApp dapat diganti dengan data QHomemart pada fase integrasi. Prototype ini belum terhubung ke sistem produksi QHomemart.",
  };
}
