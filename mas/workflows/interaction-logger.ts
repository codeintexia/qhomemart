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
import { getRuntimeModeSummary } from "@/lib/agent-runtime-config";

/**
 * Parameters for creating one interaction log entry.
 */
export interface LogEntryParams {
  stepNumber: number;
  agentName: string;
  sourceAgent?: string;
  targetAgent?: string;
  requestedMode?: "deterministic" | "llm-assisted";
  executionMode?: "deterministic" | "llm-assisted";
  effectiveMode?: "deterministic" | "llm-assisted";
  usedLLM?: boolean;
  provider?: string;
  model?: string;
  inputSummary: string;
  outputSummary: string;
  confidence?: number;
  reasoningBasis?: string[];
  decisionDependency?: string;
  fallbackStatus?: string;
  fallbackReason?: string;
  requiresHumanReview?: boolean;
  humanReviewStatus?: string;
  warnings?: string[];
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
  const runtime = getRuntimeModeSummary();
  return {
    step: params.stepNumber,
    stepNumber: params.stepNumber,
    agentName: params.agentName,
    sourceAgent: params.sourceAgent ?? params.agentName,
    targetAgent: params.targetAgent,
    requestedMode: params.requestedMode ?? runtime.requestedMode,
    executionMode: params.executionMode ?? "deterministic",
    effectiveMode: params.effectiveMode ?? "deterministic",
    usedLLM: params.usedLLM ?? false,
    provider: params.provider ?? runtime.provider,
    model: params.model ?? runtime.model,
    inputSummary: params.inputSummary,
    outputSummary: params.outputSummary,
    input: params.inputSummary,
    output: params.outputSummary,
    confidence: params.confidence ?? 0.8,
    reasoningBasis: params.reasoningBasis ?? ["Structured workflow output"],
    decisionDependency: params.decisionDependency ?? "Feeds the next workflow step",
    timestamp: `2026-05-31T18:${String(params.stepNumber).padStart(2, "0")}:00+07:00`,
    fallbackStatus: params.fallbackStatus ?? "No fallback triggered",
    fallbackReason: params.fallbackReason ?? runtime.warnings[0] ?? "None",
    requiresHumanReview: params.requiresHumanReview ?? false,
    humanReviewStatus: params.humanReviewStatus ?? "Not required",
    warnings: params.warnings ?? runtime.warnings,
    structuredOutput: params.structuredOutput,
  };
}
