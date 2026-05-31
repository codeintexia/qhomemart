/**
 * Plumbing Leak Workflow
 *
 * Uses the same MAS QHomemart multi-agent orchestration as the bathroom
 * safety scenario, with a plumbing leak input seed.
 */

import { plumbingLeakScenario } from "@/data/demo-scenario";
import { runBathroomSafetyWorkflow } from "@/workflows/bathroom-safety-workflow";
import type { WorkflowRunResult } from "@/types/mas-types";

export function runPlumbingLeakWorkflow(): WorkflowRunResult {
  return runBathroomSafetyWorkflow(plumbingLeakScenario);
}
