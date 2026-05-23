/**
 * Bundle Strategy Agent
 *
 * Role: Receives matched products and services from the upstream agents
 * and applies bundle rules (data/bundle-rules.ts) to construct optimal
 * solution packages — balancing safety impact, customer budget, and
 * QHomemart margin guidelines.
 *
 * Outputs a recommended bundle with a total price estimate and a rationale
 * narrative for staff use.
 *
 * Phase: Architecture placeholder — full logic will be implemented in the next phase.
 */

import type { ProductMatchResult } from "./product-match-agent";
import type { ServiceMatchResult } from "./service-match-agent";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single line item in the recommended bundle. */
export interface BundleLineItem {
  /** Item type — either a product or a service */
  type: "product" | "service";
  /** Display name */
  name: string;
  /** Estimated price in IDR (demo value, not real QHomemart price) */
  estimatedPriceIdr: number;
  /** Why this item is included */
  reason: string;
}

/** The complete bundle recommendation produced by this agent. */
export interface BundleRecommendation {
  /** Unique identifier for this bundle (used in logs) */
  bundleId: string;
  /** Human-readable bundle title */
  title: string;
  /** Ordered list of line items */
  lineItems: BundleLineItem[];
  /** Total estimated price in IDR */
  totalEstimatedPriceIdr: number;
  /** Narrative rationale for the bundle composition */
  rationale: string;
}

// ---------------------------------------------------------------------------
// Agent Function
// ---------------------------------------------------------------------------

/**
 * Runs the Bundle Strategy Agent.
 *
 * Placeholder implementation — returns an empty bundle skeleton until
 * bundle rules, pricing logic, and upstream agent results are wired in.
 *
 * @param productResult - Output from the Product Match Agent
 * @param serviceResult - Output from the Service Match Agent
 * @returns BundleRecommendation skeleton (stub until full implementation)
 */
export function runBundleStrategyAgent(
  productResult?: ProductMatchResult,
  serviceResult?: ServiceMatchResult
): BundleRecommendation {
  // TODO: Implement bundle composition using data/bundle-rules.ts
  void productResult;
  void serviceResult;
  return {
    bundleId: "bundle-bathroom-safety-demo-001",
    title: "Paket Keamanan Kamar Mandi (Demo)",
    lineItems: [],
    totalEstimatedPriceIdr: 0,
    rationale:
      "Bundle placeholder — item dan harga akan diisi pada fase implementasi berikutnya.",
  };
}
