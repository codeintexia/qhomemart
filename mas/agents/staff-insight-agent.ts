/**
 * Staff & Insight Agent
 *
 * Role: Final agent in the pipeline. Consumes the BundleRecommendation
 * and all upstream context to generate two artefacts:
 *
 *   1. StaffBriefing — a concise, action-ready summary that QHomemart
 *      staff can read before or during a customer interaction.
 *
 *   2. BusinessInsight — aggregated signals (risk score, category trends,
 *      bundle value) that management / analytics can use to understand
 *      demand patterns and service opportunities.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

import type { BundleRecommendation } from "./bundle-strategy-agent";
import type { RiskContext } from "./context-risk-agent";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Concise briefing for QHomemart staff. */
export interface StaffBriefing {
  /** Name or role of the intended staff reader */
  targetRole: string;
  /** One-sentence situation summary */
  situationSummary: string;
  /** Top 3 recommended actions */
  recommendedActions: string[];
  /** Key talking points when presenting the bundle to the customer */
  talkingPoints: string[];
}

/** Aggregated business signal for management / analytics. */
export interface BusinessInsight {
  /** Problem category this run belongs to */
  category: string;
  /** Composite risk score from the Context & Risk Agent */
  compositeRiskScore: number;
  /** Estimated bundle value in IDR */
  estimatedBundleValueIdr: number;
  /** Qualitative business opportunity note */
  opportunityNote: string;
}

/** Combined output of the Staff & Insight Agent. */
export interface StaffInsightOutput {
  staffBriefing: StaffBriefing;
  businessInsight: BusinessInsight;
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Staff & Insight Agent.
 *
 * Placeholder implementation — returns stub staffBriefing and businessInsight
 * objects until the full summarisation and insight logic is implemented.
 *
 * @param bundle      - BundleRecommendation from the Bundle Strategy Agent
 * @param riskContext - RiskContext from the Context & Risk Agent
 * @returns StaffInsightOutput skeleton (stub until full implementation)
 */
export function runStaffInsightAgent(
  bundle?: BundleRecommendation,
  riskContext?: RiskContext
): StaffInsightOutput {
  // TODO: Implement NLP summarisation and business insight aggregation.
  void bundle;
  void riskContext;

  return {
    staffBriefing: {
      targetRole: "Sales Associate / Kasir QHomemart",
      situationSummary:
        "Pelanggan membutuhkan solusi keamanan kamar mandi untuk lansia.",
      recommendedActions: [
        "Arahkan ke lorong produk anti-slip (placeholder).",
        "Tawarkan konsultasi pemasangan grab bar (placeholder).",
        "Jelaskan paket bundel dan estimasi harga (placeholder).",
      ],
      talkingPoints: [
        "Keamanan kamar mandi adalah investasi jangka panjang.",
        "Produk anti-slip mengurangi risiko jatuh hingga X% (data placeholder).",
        "Layanan pemasangan tersedia dalam 2–3 hari kerja (placeholder).",
      ],
    },
    businessInsight: {
      category: "bathroom-safety",
      compositeRiskScore: 72,
      estimatedBundleValueIdr: 0,
      opportunityNote:
        "Segmen lansia adalah kelompok dengan kebutuhan modifikasi rumah yang tinggi dan berulang (placeholder insight).",
    },
  };
}
