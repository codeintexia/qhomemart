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
 * Prototype only. Not connected to real QHomemart systems.
 */

import { runBathroomSafetyWorkflow } from "@/workflows/bathroom-safety-workflow";
import type { WorkflowRunResult } from "@/types/mas-types";

/**
 * Reproducible sample output of the Bathroom Safety multi-agent workflow.
 *
 * Generated at module load time using the default demo scenario inputs.
 * Full log will continue to be generated dynamically at runtime in subsequent
 * implementation phases.
 */
export const sampleBathroomRun: WorkflowRunResult =
  runBathroomSafetyWorkflow();
