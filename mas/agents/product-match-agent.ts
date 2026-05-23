/**
 * Product Match Agent
 *
 * Role: Receives the RiskContext from the Context & Risk Agent and
 * queries the product catalog (data/products.ts) to surface the most
 * relevant SKUs for the customer's problem.
 *
 * Applies risk-weighted ranking so that high-severity solutions are
 * surfaced first. Outputs a list of matched products with relevance scores.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

import type { RiskContext } from "./context-risk-agent";
import type { DemoProduct } from "@/data/products";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A product candidate with an associated relevance score. */
export interface MatchedProduct {
  /** Reference to the catalog product */
  product: DemoProduct;
  /** Relevance score (0–100) calculated from risk context */
  relevanceScore: number;
  /** Human-readable reason why this product was matched */
  matchReason: string;
}

/** Output of the Product Match Agent. */
export interface ProductMatchResult {
  /** Risk context forwarded from upstream */
  riskContext: RiskContext;
  /** Ranked list of matched products */
  matches: MatchedProduct[];
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Product Match Agent.
 *
 * Placeholder implementation — returns an empty match list until the
 * product catalog and ranking logic are wired in the next phase.
 *
 * @param riskContext - RiskContext produced by the Context & Risk Agent
 * @returns ProductMatchResult skeleton (stub until full implementation)
 */
export function runProductMatchAgent(
  riskContext?: RiskContext
): ProductMatchResult {
  // TODO: Implement vector-similarity or rule-based product matching against data/products.ts
  return {
    riskContext: riskContext as RiskContext,
    matches: [],
  };
}
