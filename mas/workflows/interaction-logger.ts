/**
 * Interaction Logger
 *
 * Creates structured, serialisable log entries that capture a complete
 * snapshot of one multi-agent workflow run — including triage output,
 * risk context, bundle recommendation, and staff insight.
 *
 * Log entries are written to the logs/ directory (as TypeScript objects
 * for the demo prototype) and will be persisted to a proper store in the
 * production integration phase.
 *
 * Phase: Architecture placeholder — full persistence logic will be
 * implemented in the next phase.
 */

import type { TriageSummary } from "@/agents/customer-triage-agent";
import type { RiskContext } from "@/agents/context-risk-agent";
import type { BundleRecommendation } from "@/agents/bundle-strategy-agent";
import type { StaffInsightOutput } from "@/agents/staff-insight-agent";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Parameters required to create an interaction log entry. */
export interface InteractionLogParams {
  /** Unique run identifier from the workflow orchestrator */
  runId: string;
  /** ISO 8601 start timestamp */
  startedAt: string;
  /** Triage output */
  triage: TriageSummary;
  /** Risk context output */
  riskContext: RiskContext;
  /** Bundle recommendation output */
  bundle: BundleRecommendation;
  /** Staff and insight output */
  staffInsight: StaffInsightOutput;
}

/** A complete, structured interaction log entry. */
export interface InteractionLogEntry {
  /** Log entry schema version */
  schemaVersion: string;
  /** Unique run ID */
  runId: string;
  /** ISO 8601 timestamp when the run started */
  startedAt: string;
  /** ISO 8601 timestamp when the log was created */
  loggedAt: string;
  /** Snapshot of all agent outputs */
  agentOutputs: {
    triage: TriageSummary;
    riskContext: RiskContext;
    bundle: BundleRecommendation;
    staffInsight: StaffInsightOutput;
  };
  /** Human-readable one-line run summary */
  summary: string;
}

// ---------------------------------------------------------------------------
// Logger Function
// ---------------------------------------------------------------------------

/**
 * Creates a structured interaction log entry for one workflow run.
 *
 * Placeholder implementation — serialises agent outputs into a typed
 * log entry. In the next phase, this function will also persist the
 * entry to a database or file store.
 *
 * @param params - Collected outputs from all agents in the pipeline
 * @returns InteractionLogEntry (ready to be stored in logs/)
 */
export function createInteractionLogEntry(
  params: InteractionLogParams
): InteractionLogEntry {
  // TODO: Add persistence logic (file system, database, or analytics sink).
  return {
    schemaVersion: "0.1.0-demo",
    runId: params.runId,
    startedAt: params.startedAt,
    loggedAt: new Date().toISOString(),
    agentOutputs: {
      triage: params.triage,
      riskContext: params.riskContext,
      bundle: params.bundle,
      staffInsight: params.staffInsight,
    },
    summary: `Run ${params.runId}: category="${params.triage.category}", urgency="${params.triage.urgency}", riskScore=${params.riskContext.compositeRiskScore}, bundleId="${params.bundle.bundleId}"`,
  };
}
