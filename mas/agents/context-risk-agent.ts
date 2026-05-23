/**
 * Context & Risk Agent
 *
 * Role: Receives the TriageSummary from the Customer Triage Agent and
 * enriches it with contextual risk factors — such as mobility limitations,
 * wet-area hazards, or structural constraints of the home.
 *
 * Outputs a RiskContext object consumed by the Product Match Agent and
 * Bundle Strategy Agent to filter and rank appropriate solutions.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

import type { TriageSummary } from "./customer-triage-agent";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A discrete risk factor identified for the home environment. */
export interface RiskFactor {
  /** Short identifier, e.g. "slip-hazard" */
  id: string;
  /** Human-readable description */
  description: string;
  /** Severity score from 1 (low) to 5 (critical) */
  severity: 1 | 2 | 3 | 4 | 5;
}

/** Enriched context produced by the Context & Risk Agent. */
export interface RiskContext {
  /** Original triage summary forwarded from upstream */
  triage: TriageSummary;
  /** List of identified risk factors */
  riskFactors: RiskFactor[];
  /** Composite risk score (0–100) */
  compositeRiskScore: number;
  /** Short narrative for the staff briefing */
  riskNarrative: string;
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Context & Risk Agent.
 *
 * Placeholder implementation — analyses the triage summary to identify
 * environmental and personal risk factors relevant to the customer's home.
 *
 * @param triage - TriageSummary produced by the Customer Triage Agent
 * @returns RiskContext skeleton (stub until full implementation)
 */
export function runContextRiskAgent(triage?: TriageSummary): RiskContext {
  // TODO: Implement risk factor extraction and composite scoring logic.
  const demoTriage: TriageSummary = triage ?? {
    category: "bathroom-safety",
    urgency: "high",
    tags: ["elderly", "slip-hazard", "bathroom"],
    rawInput: {
      problemDescription: "Demo: kamar mandi licin, lansia berisiko jatuh.",
      ageGroup: "elderly",
    },
  };

  return {
    triage: demoTriage,
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
  };
}
