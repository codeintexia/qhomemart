import { runBathroomSafetyWorkflow, runRetailInquiryWorkflow } from "@/workflows/bathroom-safety-workflow";
import { runPlumbingLeakWorkflow } from "@/workflows/plumbing-leak-workflow";
import type { BuyingPreference, CustomerInput, WorkflowRunResult } from "@/types/mas-types";

export type UserInquiryWorkflowInput = {
  customerNeed: string;
  selectedProblems: string[];
  preference?: string;
  channel?: string;
};

export type UserInquiryWorkflowResult = {
  scenarioId: string;
  scenarioName: string;
  detectedCluster: string;
  selectedWorkflow: string;
  finalDecision: string;
  recommendedPackage: string;
  serviceRecommendation: string;
  interactionLog: WorkflowRunResult["interactionLog"];
  humanReviewRequired: boolean;
  fallbackUsed: boolean;
  auditStatus: string;
  workflow: WorkflowRunResult;
};

function normalizePreference(preference?: string): BuyingPreference {
  const normalizedPreference = preference?.toLowerCase() ?? "";

  if (normalizedPreference.includes("aman")) {
    return "Lebih aman";
  }

  if (normalizedPreference.includes("lengkap") || normalizedPreference.includes("pasang")) {
    return "Mudah dipasang";
  }

  return "Hemat dulu";
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function resolveScenario(input: UserInquiryWorkflowInput) {
  const joinedInput = `${input.customerNeed} ${input.selectedProblems.join(" ")}`.toLowerCase();

  if (hasAny(joinedInput, ["pipa", "bocor", "rembes", "plumbing", "air menetes", "sink", "wastafel", "dapur bocor"])) {
    return {
      scenarioId: "plumbing-leak",
      scenarioName: "Plumbing Leak / Kebocoran Pipa",
      selectedWorkflow: "runPlumbingLeakWorkflow",
      selectedChips:
        input.selectedProblems.length > 0
          ? input.selectedProblems
          : ["Pipa dapur bocor", "Air merembes", "Butuh arahan staf"],
    };
  }

  if (hasAny(joinedInput, ["kamar mandi", "licin", "lansia", "anti slip", "anti-slip", "pegangan", "terpeleset", "jatuh"])) {
    return {
      scenarioId: "bathroom-safety",
      scenarioName: "Bathroom Safety / Kamar Mandi Licin",
      selectedWorkflow: "runBathroomSafetyWorkflow",
      selectedChips:
        input.selectedProblems.length > 0
          ? input.selectedProblems
          : ["Kamar mandi licin", "Kurang pegangan", "Lantai sering basah"],
    };
  }

  if (hasAny(joinedInput, ["lampu", "pencahayaan", "gelap", "redup", "garasi", "teras", "area kerja"])) {
    return {
      scenarioId: "lighting",
      scenarioName: "Lighting / Pencahayaan Rumah",
      selectedWorkflow: "runRetailInquiryWorkflow",
      selectedChips:
        input.selectedProblems.length > 0
          ? input.selectedProblems
          : ["Lampu garasi redup", "Area rumah kurang terang", "Butuh bantuan pemasangan"],
    };
  }

  return {
    scenarioId: "generic-home-improvement",
    scenarioName: "Generic Home Improvement / Kebutuhan Rumah Umum",
    selectedWorkflow: "runRetailInquiryWorkflow",
    selectedChips:
      input.selectedProblems.length > 0
        ? input.selectedProblems
        : ["Kebutuhan rumah umum", "Butuh arahan staf"],
  };
}

function getRecommendedPackage(workflow: WorkflowRunResult) {
  return workflow.businessInsight.bundleOpportunity || workflow.bundle.bundleTitle;
}

function getServiceRecommendation(workflow: WorkflowRunResult) {
  const firstService =
    workflow.triage.problemCategory === "Kebocoran pipa dapur"
      ? workflow.services.sectionC.find((service) => service.service.name.toLowerCase().includes("plumbing")) ?? workflow.services.sectionC[0]
      : workflow.services.sectionC[0];
  return firstService
    ? `${firstService.service.name}: ${firstService.service.description}`
    : workflow.services.availabilityNote;
}

export function runUserInquiryWorkflow(input: UserInquiryWorkflowInput): UserInquiryWorkflowResult {
  const scenario = resolveScenario(input);
  const customerInput: CustomerInput = {
    userStory: input.customerNeed.trim() || scenario.selectedChips.join(", "),
    selectedChips: scenario.selectedChips,
    buyingPreference: normalizePreference(input.preference),
  };
  const workflow =
    scenario.scenarioId === "bathroom-safety"
      ? runBathroomSafetyWorkflow(customerInput)
      : scenario.scenarioId === "plumbing-leak"
        ? runPlumbingLeakWorkflow(customerInput)
        : runRetailInquiryWorkflow(customerInput);
  const detectedCluster = workflow.triage.problemCategory;
  const recommendedPackage = getRecommendedPackage(workflow);
  const serviceRecommendation = getServiceRecommendation(workflow);

  return {
    scenarioId: scenario.scenarioId,
    scenarioName: scenario.scenarioName,
    detectedCluster,
    selectedWorkflow: scenario.selectedWorkflow,
    finalDecision: workflow.finalDecision.finalRecommendation,
    recommendedPackage,
    serviceRecommendation,
    interactionLog: workflow.interactionLog,
    humanReviewRequired: workflow.finalDecision.humanReviewRequired,
    fallbackUsed: workflow.fallbackUsed,
    auditStatus: workflow.finalDecision.humanReviewRequired
      ? "Audit Log tercatat, Human Review diperlukan"
      : "Audit Log tercatat",
    workflow,
  };
}
