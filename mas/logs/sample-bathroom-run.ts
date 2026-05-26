/**
 * Sample Bathroom Safety Workflow Run
 *
 * Exports a reproducible sample output by calling runBathroomSafetyWorkflow()
 * with default demo inputs. Competition judges can inspect sampleBathroomRun
 * to see the complete structured output of all six agents without running the UI.
 *
 * This file also serves as a smoke test — if the workflow function throws,
 * the build will fail, catching integration errors early.
 *
 * AI mode note:
 * The sample always runs in "deterministic-fallback" mode because no LLM
 * environment variables are configured at build time. This is intentional —
 * reproducibility requires deterministic output.
 * sampleBathroomRun.aiMeta.aiMode will be "deterministic-fallback".
 *
 * Prototype only. Not connected to real QHomemart systems.
 */

import { runBathroomSafetyWorkflow } from "@/workflows/bathroom-safety-workflow";
import type { WorkflowRunResult } from "@/types/mas-types";

/**
 * Reproducible sample output of the Bathroom Safety multi-agent workflow.
 *
 * Generated at module load time using the default demo scenario inputs.
 * aiMeta.aiMode is always "deterministic-fallback" in this sample because
 * no LLM provider is configured at build time.
 */
export const sampleBathroomRun: WorkflowRunResult =
  runBathroomSafetyWorkflow();
