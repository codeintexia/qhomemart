/**
 * Bundle Rules
 *
 * Defines the logical rules the Bundle Strategy Agent uses to compose
 * product + service solution packages from matched candidates.
 *
 * Rules are intentionally minimal at this stage.
 * They will be expanded in the next implementation phase when the
 * Bundle Strategy Agent is wired to the full agent pipeline.
 *
 * These rules do NOT reflect real QHomemart pricing, margin, or
 * promotion policies.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A logical condition that must be satisfied to trigger a bundle rule. */
export interface BundleCondition {
  /** The field from the RiskContext to evaluate */
  field: "compositeRiskScore" | "category" | "urgency" | "tags";
  /** Comparison operator */
  operator: "gte" | "lte" | "eq" | "includes";
  /** Value to compare against */
  value: string | number | string[];
}

/** An action to take when a rule's conditions are met. */
export interface BundleAction {
  /** Action type */
  type: "include-product" | "include-service" | "apply-discount";
  /** Target SKU, serviceId, or discount description */
  target: string;
  /** Optional reason surfaced in BundleRecommendation.rationale */
  reason?: string;
}

/** A single bundle rule. */
export interface BundleRule {
  /** Unique rule identifier */
  ruleId: string;
  /** Human-readable rule name */
  name: string;
  /** All conditions must be true for the rule to fire */
  conditions: BundleCondition[];
  /** Actions to execute when the rule fires */
  actions: BundleAction[];
  /** Priority — lower number fires first */
  priority: number;
}

/** Top-level bundle rules configuration. */
export interface BundleRulesConfig {
  /** Schema version for forward-compatibility */
  version: string;
  /** Ordered list of rules (sorted by priority) */
  rules: BundleRule[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

/**
 * Minimal bundle rules configuration for the bathroom-safety demo scenario.
 *
 * Expand rules in the next implementation phase to cover more categories,
 * margin constraints, and promotional logic.
 */
export const bundleRules: BundleRulesConfig = {
  version: "0.1.0-demo",
  rules: [
    {
      ruleId: "BR-001",
      name: "High-Risk Bathroom Bundle",
      conditions: [
        {
          field: "compositeRiskScore",
          operator: "gte",
          value: 60,
        },
        {
          field: "category",
          operator: "eq",
          value: "bathroom-safety",
        },
      ],
      actions: [
        {
          type: "include-product",
          target: "QHM-AS-001",
          reason: "Anti-slip mat is mandatory for high-risk bathrooms.",
        },
        {
          type: "include-product",
          target: "QHM-GB-002",
          reason: "Grab bar reduces fall risk for elderly occupants.",
        },
        {
          type: "include-service",
          target: "QHM-SVC-INST-001",
          reason: "Professional installation ensures grab bar is safely secured.",
        },
      ],
      priority: 1,
    },
    {
      ruleId: "BR-002",
      name: "Budget-Friendly Anti-Slip Add-On",
      conditions: [
        {
          field: "tags",
          operator: "includes",
          value: ["anti-slip"],
        },
      ],
      actions: [
        {
          type: "include-product",
          target: "QHM-NS-003",
          reason:
            "Transparent non-slip stickers are a low-cost complementary item.",
        },
      ],
      priority: 2,
    },
  ],
};
