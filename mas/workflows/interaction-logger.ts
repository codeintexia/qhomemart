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
 * Prototype: in-memory only. Not persisted to a database or file system.
 */

import type { InteractionLogStep } from "@/types/mas-types";

/**
 * Parameters for creating one interaction log entry.
 */
export interface LogEntryParams {
  stepNumber: number;
  agentName: string;
  inputSummary: string;
  outputSummary: string;
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
    inputSummary: params.inputSummary,
    outputSummary: params.outputSummary,
    structuredOutput: params.structuredOutput,
  };
}
