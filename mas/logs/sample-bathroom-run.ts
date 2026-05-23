/**
 * Sample Bathroom Safety Workflow Run Log
 *
 * This file is a static, hand-crafted snapshot of what a complete
 * interaction log entry looks like after the full multi-agent pipeline
 * has executed for the bathroom-safety demo scenario.
 *
 * NOTE: This is NOT a live or auto-generated log.
 * The full dynamic log will be generated automatically at runtime in the
 * next implementation phase, when the workflow orchestrator is wired to
 * persist entries via workflows/interaction-logger.ts.
 *
 * This sample is intended to:
 *  - Demonstrate the expected log schema to competition judges
 *  - Serve as a reference fixture for unit tests
 *  - Illustrate the end-to-end data flow from problem input to agent outputs
 */

import type { InteractionLogEntry } from "@/workflows/interaction-logger";

// ---------------------------------------------------------------------------
// Sample Log Entry
// ---------------------------------------------------------------------------

/**
 * Static sample log entry for one bathroom-safety workflow run.
 *
 * All data is fictional and for demonstration purposes only.
 */
export const sampleBathroomRun: InteractionLogEntry = {
  schemaVersion: "0.1.0-demo",
  runId: "run-sample-bathroom-001",
  startedAt: "2025-01-15T09:00:00.000Z",
  loggedAt: "2025-01-15T09:00:01.347Z",
  agentOutputs: {
    triage: {
      category: "bathroom-safety",
      urgency: "high",
      tags: ["elderly", "slip-hazard", "bathroom"],
      rawInput: {
        problemDescription:
          "Kamar mandi lantai satu licin dan tidak ada pegangan. Ibu saya (75 tahun) sudah pernah hampir jatuh dua kali bulan lalu.",
        ageGroup: "elderly",
        budgetSignal: 1000000,
      },
    },
    riskContext: {
      triage: {
        category: "bathroom-safety",
        urgency: "high",
        tags: ["elderly", "slip-hazard", "bathroom"],
        rawInput: {
          problemDescription:
            "Kamar mandi lantai satu licin dan tidak ada pegangan. Ibu saya (75 tahun) sudah pernah hampir jatuh dua kali bulan lalu.",
          ageGroup: "elderly",
          budgetSignal: 1000000,
        },
      },
      riskFactors: [
        {
          id: "slip-hazard",
          description: "Lantai kamar mandi licin tanpa alas anti-slip",
          severity: 4,
        },
        {
          id: "no-grab-bar",
          description: "Tidak ada pegangan di area toilet / shower",
          severity: 3,
        },
      ],
      compositeRiskScore: 72,
      riskNarrative:
        "Lansia dengan mobilitas terbatas di kamar mandi berisiko tinggi. Prioritaskan solusi anti-slip dan pegangan.",
    },
    bundle: {
      bundleId: "bundle-bathroom-safety-sample-001",
      title: "Paket Keamanan Kamar Mandi (Demo Sample)",
      lineItems: [
        {
          type: "product",
          name: "Karpet Anti-Slip Kamar Mandi (60×90 cm)",
          estimatedPriceIdr: 89000,
          reason: "Anti-slip mat is mandatory for high-risk bathrooms.",
        },
        {
          type: "product",
          name: "Grab Bar Stainless 60 cm",
          estimatedPriceIdr: 275000,
          reason: "Grab bar reduces fall risk for elderly occupants.",
        },
        {
          type: "service",
          name: "Pemasangan Grab Bar",
          estimatedPriceIdr: 150000,
          reason:
            "Professional installation ensures grab bar is safely secured.",
        },
      ],
      totalEstimatedPriceIdr: 514000,
      rationale:
        "Paket ini memprioritaskan pengurangan risiko jatuh dengan biaya terjangkau. Stiker anti-slip tambahan dapat dipertimbangkan jika anggaran memungkinkan.",
    },
    staffInsight: {
      staffBriefing: {
        targetRole: "Sales Associate / Kasir QHomemart",
        situationSummary:
          "Pelanggan membutuhkan solusi keamanan kamar mandi untuk lansia berusia 75 tahun yang hampir jatuh dua kali.",
        recommendedActions: [
          "Arahkan ke lorong 7 — produk anti-slip dan grab bar.",
          "Tawarkan paket pemasangan grab bar oleh teknisi QHomemart.",
          "Jelaskan estimasi total paket: Rp 514.000 (demo).",
        ],
        talkingPoints: [
          "Grab bar yang terpasang dengan benar dapat mengurangi risiko jatuh secara signifikan.",
          "Pemasangan profesional memastikan pegangan aman digunakan setiap hari.",
          "Paket ini sesuai untuk budget di bawah Rp 1.000.000.",
        ],
      },
      businessInsight: {
        category: "bathroom-safety",
        compositeRiskScore: 72,
        estimatedBundleValueIdr: 514000,
        opportunityNote:
          "Segmen lansia di Indonesia tumbuh pesat. Bathroom safety adalah kategori berulang dengan potensi upsell ke layanan survey dan konsultasi.",
      },
    },
  },
  summary:
    'Run run-sample-bathroom-001: category="bathroom-safety", urgency="high", riskScore=72, bundleId="bundle-bathroom-safety-sample-001"',
};
