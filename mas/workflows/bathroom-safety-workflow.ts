/**
 * Bathroom Safety Workflow Orchestrator
 *
 * Coordinates the full multi-agent pipeline for the bathroom-safety
 * demo scenario. Calls each agent in sequence and passes the output
 * of one agent as the input to the next.
 *
 * Agent sequence:
 *   1. Customer Triage Agent  — classify the problem
 *   2. Context & Risk Agent   — enrich with risk factors
 *   3. Product Match Agent    — find relevant products
 *   4. Service Match Agent    — find complementary services
 *   5. Bundle Strategy Agent  — compose the solution package
 *   6. Staff & Insight Agent  — generate briefing and business insight
 *
 * After all agents have run, the workflow logs the interaction via
 * the Interaction Logger (workflows/interaction-logger.ts).
 *
 * Phase: Architecture placeholder — full orchestration logic will be
 * implemented in the next phase.
 */

import { runCustomerTriageAgent } from "@/agents/customer-triage-agent";
import type { CustomerInput } from "@/agents/customer-triage-agent";
import { runContextRiskAgent } from "@/agents/context-risk-agent";
import { runProductMatchAgent } from "@/agents/product-match-agent";
import { runServiceMatchAgent } from "@/agents/service-match-agent";
import { runBundleStrategyAgent } from "@/agents/bundle-strategy-agent";
import { runStaffInsightAgent } from "@/agents/staff-insight-agent";
import type { StaffInsightOutput } from "@/agents/staff-insight-agent";
import type { BundleRecommendation } from "@/agents/bundle-strategy-agent";
import { createInteractionLogEntry } from "@/workflows/interaction-logger";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The complete, structured output of one end-to-end workflow run. */
export interface WorkflowRunResult {
  /** Unique run identifier (timestamp-based for demo purposes) */
  runId: string;
  /** ISO 8601 timestamp of when the run started */
  startedAt: string;
  /** The final bundle recommendation */
  bundle: BundleRecommendation;
  /** Staff briefing and business insight */
  staffInsight: StaffInsightOutput;
  /** The interaction log entry (serialisable, suitable for logs/) */
  logEntry: ReturnType<typeof createInteractionLogEntry>;
}

// ---------------------------------------------------------------------------
// Orchestrator Function
// ---------------------------------------------------------------------------

/**
 * Runs the full Bathroom Safety multi-agent workflow.
 *
 * Placeholder implementation — calls each agent stub in sequence and
 * returns a skeletal WorkflowRunResult. Full data flow will be wired
 * in the next implementation phase.
 *
 * @param customerInput - Optional raw customer input; falls back to demo scenario defaults
 * @returns WorkflowRunResult (stub until full implementation)
 */
export function runBathroomSafetyWorkflow(
  customerInput?: CustomerInput
): WorkflowRunResult {
  const runId = `run-${Date.now()}`;
  const startedAt = new Date().toISOString();

  // Step 1 — Customer Triage
  const triage = runCustomerTriageAgent(customerInput);

  // Step 2 — Context & Risk
  const riskContext = runContextRiskAgent(triage);

  // Step 3 — Product Match
  const productResult = runProductMatchAgent(riskContext);

  // Step 4 — Service Match
  const serviceResult = runServiceMatchAgent(riskContext);

  // Step 5 — Bundle Strategy
  const bundle = runBundleStrategyAgent(productResult, serviceResult);

  // Step 6 — Staff & Insight
  const staffInsight = runStaffInsightAgent(bundle, riskContext);

  // Logging
  const logEntry = createInteractionLogEntry({
    runId,
    startedAt,
    triage,
    riskContext,
    bundle,
    staffInsight,
  });

  return { runId, startedAt, bundle, staffInsight, logEntry };
}
