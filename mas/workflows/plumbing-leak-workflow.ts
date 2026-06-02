/**
 * Plumbing Leak Workflow
 *
 * Uses the same MAS QHomemart multi-agent orchestration as the bathroom
 * safety scenario, with a plumbing leak input seed.
 */

import { plumbingLeakScenario } from "@/data/demo-scenario";
import { runRetailInquiryWorkflow } from "@/workflows/bathroom-safety-workflow";
import type { CustomerInput, WorkflowRunResult } from "@/types/mas-types";

export function runPlumbingLeakWorkflow(input?: CustomerInput): WorkflowRunResult {
  return runRetailInquiryWorkflow(input ?? plumbingLeakScenario);
}
