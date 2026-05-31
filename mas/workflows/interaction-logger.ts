/**
 * Interaction Logger
 *
 * Creates structured log entries for each step in the multi-agent pipeline.
 * Each entry captures the agent name, a short input/output summary, and
 * a serialisable snapshot of the agent's structured output.
 *
 * Log entries use stepNumber instead of real timestamps for full
 * reproducibility across environments.
 *
 * Current scope: in-memory only. Not persisted to a database or file system.
 */

import type { InteractionLogStep } from "@/types/mas-types";

/**
 * Parameters for creating one interaction log entry.
 */
export interface LogEntryParams {
  stepNumber: number;
  agentName: string;
  sourceAgent?: string;
  targetAgent?: string;
  inputSummary: string;
  outputSummary: string;
  confidence?: number;
  reasoningBasis?: string[];
  decisionDependency?: string;
  fallbackStatus?: string;
  humanReviewStatus?: string;
  structuredOutput: Record<string, unknown>;
}

/**
 * Creates a single structured interaction log entry.
 *
 * Uses stepNumber as the ordering key instead of a real timestamp so the
 * output is fully reproducible in demo/test contexts.
 *
 * @param params - Log entry parameters
 * @returns InteractionLogStep
 */
export function createInteractionLogEntry(
  params: LogEntryParams
): InteractionLogStep {
  return {
    stepNumber: params.stepNumber,
    agentName: params.agentName,
    sourceAgent: params.sourceAgent ?? params.agentName,
    targetAgent: params.targetAgent,
    inputSummary: params.inputSummary,
    outputSummary: params.outputSummary,
    input: params.inputSummary,
    output: params.outputSummary,
    confidence: params.confidence ?? 0.8,
    reasoningBasis: params.reasoningBasis ?? ["Structured workflow output"],
    decisionDependency: params.decisionDependency ?? "Feeds the next workflow step",
    timestamp: `2026-05-31T18:${String(params.stepNumber).padStart(2, "0")}:00+07:00`,
    fallbackStatus: params.fallbackStatus ?? "No fallback triggered",
    humanReviewStatus: params.humanReviewStatus ?? "Not required",
    structuredOutput: params.structuredOutput,
  };
}
