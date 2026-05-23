/**
 * Customer Triage Agent
 *
 * Role: First point of contact in the multi-agent pipeline.
 * Receives raw customer input (problem description, household context,
 * budget signal) and classifies the request into a structured triage summary.
 *
 * Outputs a TriageSummary that downstream agents (Context & Risk, Product Match,
 * etc.) will use to refine their recommendations.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Raw input from the customer or staff capturing a home problem. */
export interface CustomerInput {
  /** Free-text description of the problem, e.g. "kamar mandi licin, nenek sering jatuh" */
  problemDescription: string;
  /** Age group of the primary occupant (optional) */
  ageGroup?: "child" | "adult" | "elderly";
  /** Rough budget signal in IDR (optional) */
  budgetSignal?: number;
  /** Additional context notes (optional) */
  notes?: string;
}

/** Structured output produced by the Customer Triage Agent. */
export interface TriageSummary {
  /** Identified problem category */
  category: string;
  /** Urgency level assessed from the input */
  urgency: "low" | "medium" | "high";
  /** Key tags extracted from the problem description */
  tags: string[];
  /** Raw input forwarded for downstream agents */
  rawInput: CustomerInput;
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Customer Triage Agent.
 *
 * Placeholder implementation — classifies and structures the customer's
 * problem statement so that downstream agents can act on it.
 *
 * @param input - Raw customer input captured via the UI
 * @returns TriageSummary skeleton (stub until full implementation)
 */
export function runCustomerTriageAgent(input?: CustomerInput): TriageSummary {
  // TODO: Implement NLP-based classification and urgency scoring.
  return {
    category: "bathroom-safety",
    urgency: "high",
    tags: ["elderly", "slip-hazard", "bathroom"],
    rawInput: input ?? {
      problemDescription: "Demo: kamar mandi licin, lansia berisiko jatuh.",
      ageGroup: "elderly",
    },
  };
}
