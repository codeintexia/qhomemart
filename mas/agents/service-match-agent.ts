/**
 * Service Match Agent
 *
 * Role: Runs in parallel with or after the Product Match Agent.
 * Queries the service catalog (data/services.ts) to recommend
 * optional installation, inspection, or professional-consultation services
 * that complement the matched products.
 *
 * Outputs a list of matched services with estimated effort and relevance.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

import type { RiskContext } from "./context-risk-agent";
import type { DemoService } from "@/data/services";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A service candidate with an associated relevance score. */
export interface MatchedService {
  /** Reference to the catalog service */
  service: DemoService;
  /** Relevance score (0–100) calculated from risk context */
  relevanceScore: number;
  /** Human-readable reason why this service was matched */
  matchReason: string;
}

/** Output of the Service Match Agent. */
export interface ServiceMatchResult {
  /** Risk context forwarded from upstream */
  riskContext: RiskContext;
  /** Ranked list of matched services */
  matches: MatchedService[];
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Service Match Agent.
 *
 * Placeholder implementation — returns an empty match list until the
 * service catalog and ranking logic are wired in the next phase.
 *
 * @param riskContext - RiskContext produced by the Context & Risk Agent
 * @returns ServiceMatchResult skeleton (stub until full implementation)
 */
export function runServiceMatchAgent(
  riskContext?: RiskContext
): ServiceMatchResult {
  // TODO: Implement service matching logic against data/services.ts
  return {
    riskContext: riskContext as RiskContext,
    matches: [],
  };
}
