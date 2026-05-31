/**
 * MAS QHomemart — Shared Types
 *
 * Centralised type definitions used across agents, data, workflows, and logs.
 * Import from this file to avoid circular dependencies and keep types consistent
 * across the entire multi-agent pipeline.
 *
 * Current scope — not connected to real QHomemart production systems.
 */

// ---------------------------------------------------------------------------
// Shared Primitive Types
// ---------------------------------------------------------------------------

/** Severity level for a risk factor. */
export type SeverityLevel = "Tinggi" | "Sedang" | "Rendah";

/** Budget tier for a product recommendation. */
export type BudgetTier = "Hemat" | "Sedang" | "Premium";

/** Priority level for a product or risk. */
export type PriorityLevel = "Tinggi" | "Sedang" | "Rendah";

/** Customer buying preference signal. */
export type BuyingPreference = "Hemat dulu" | "Mudah dipasang" | "Lebih aman";

// ---------------------------------------------------------------------------
// Customer Input
// ---------------------------------------------------------------------------

/** Raw input from the customer captured via the UI. */
export interface CustomerInput {
  /** Free-text user story, e.g. "Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi." */
  userStory: string;
  /** Selected problem chips from the UI */
  selectedChips: string[];
  /** Buying preference signal selected by the customer */
  buyingPreference: BuyingPreference;
}

// ---------------------------------------------------------------------------
// Triage Output
// ---------------------------------------------------------------------------

/** Structured triage output from the Customer Triage Agent. */
export interface TriageOutput {
  /** Identified primary problem category */
  problemCategory: string;
  /** The primary space / room involved */
  primarySpace: string;
  /** The primary user type */
  primaryUser: string;
  /** Inferred constraints from the customer input */
  constraints: string[];
  /** Normalised one-sentence need summary */
  normalizedNeed: string;
  /** Short reasoning explanation in Indonesian */
  reasoning: string;
}

// ---------------------------------------------------------------------------
// Risk Output
// ---------------------------------------------------------------------------

/** A single identified risk factor. */
export interface RiskItem {
  /** Unique identifier */
  id: string;
  /** Human-readable label (Indonesian) */
  label: string;
  /** Severity level */
  severity: SeverityLevel;
  /** Why this risk exists */
  reason: string;
  /** Order in which this risk should be prioritised (1 = highest) */
  priorityOrder: number;
}

/** All risks identified by the Context & Risk Agent. */
export interface RiskOutput {
  /** List of identified risks, ordered by priorityOrder */
  risks: RiskItem[];
  /** Short narrative summary for downstream agents */
  riskNarrative: string;
}

// ---------------------------------------------------------------------------
// Product Data
// ---------------------------------------------------------------------------

/** A single demo product. */
export interface DemoProduct {
  /** Unique product identifier */
  id: string;
  /** Display name (Indonesian) */
  name: string;
  /** Product category */
  category: string;
  /** Why this product helps */
  reason: string;
  /** ID of the risk this product addresses */
  riskAddressed: string;
  /** Budget tier */
  budgetTier: BudgetTier;
  /** Priority level */
  priority: PriorityLevel;
  /** Which bundle section this product belongs to: "A" | "B" */
  sectionHint: "A" | "B";
}

// ---------------------------------------------------------------------------
// Service Data
// ---------------------------------------------------------------------------

/** A single demo service guidance entry. */
export interface DemoService {
  /** Unique service identifier */
  id: string;
  /** Display name (Indonesian) */
  name: string;
  /** Description of the service */
  description: string;
  /** Availability disclaimer for prototype context */
  safeAvailabilityNote: string;
}

// ---------------------------------------------------------------------------
// Product Match Output
// ---------------------------------------------------------------------------

/** A matched product with its resolved section. */
export interface MatchedProduct {
  product: DemoProduct;
  /** Bundle section this product is placed in */
  section: "A" | "B";
}

/** Output of the Product Match Agent. */
export interface ProductMatchOutput {
  /** Products for Section A (highest priority) */
  sectionA: MatchedProduct[];
  /** Products for Section B (recommended additions) */
  sectionB: MatchedProduct[];
}

// ---------------------------------------------------------------------------
// Service Match Output
// ---------------------------------------------------------------------------

/** A matched service guidance entry. */
export interface MatchedService {
  service: DemoService;
  /** Why this service is suggested */
  matchReason: string;
}

/** Output of the Service Match Agent. */
export interface ServiceMatchOutput {
  /** Optional service guidance entries for Section C */
  sectionC: MatchedService[];
  /** Disclaimer note to surface in the UI */
  availabilityNote: string;
}

// ---------------------------------------------------------------------------
// Bundle Rules
// ---------------------------------------------------------------------------

/** A single bundle section definition. */
export interface BundleSectionRule {
  /** Section identifier: "A" | "B" | "C" */
  sectionId: "A" | "B" | "C";
  /** Section label shown in the UI */
  label: string;
  /** Which priority levels belong here */
  includesPriority?: PriorityLevel[];
  /** Whether this section contains service guidance */
  isServiceSection?: boolean;
}

/** The complete bundle rules configuration. */
export interface BundleRulesConfig {
  version: string;
  sections: BundleSectionRule[];
}

// ---------------------------------------------------------------------------
// Bundle Output
// ---------------------------------------------------------------------------

/** A single item in the rendered bundle (product or service). */
export interface BundleItem {
  type: "product" | "service";
  name: string;
  reason: string;
  budgetTier?: BudgetTier;
  priority?: PriorityLevel;
  availabilityNote?: string;
}

/** A rendered bundle section. */
export interface BundleSection {
  sectionId: "A" | "B" | "C";
  label: string;
  items: BundleItem[];
}

/** Complete bundle output from the Bundle Strategy Agent. */
export interface BundleOutput {
  bundleTitle: string;
  bundleSubtitle: string;
  sections: BundleSection[];
}

// ---------------------------------------------------------------------------
// Staff & Insight Output
// ---------------------------------------------------------------------------

/** Business insight produced by the Staff & Insight Agent. */
export interface BusinessInsight {
  problem: string;
  productCategories: string[];
  bundleOpportunity: string;
  businessOpportunities: string[];
  digitalMarketingOpportunities: string[];
}

/** Combined staff summary and business insight. */
export interface StaffInsightOutput {
  staffSummary: string;
  businessInsight: BusinessInsight;
}

// ---------------------------------------------------------------------------
// Agent Reasoning & Arbitration
// ---------------------------------------------------------------------------

/** Standard reasoning metadata attached to every agent output. */
export interface AgentReasoningMetadata {
  agentName: string;
  inputSummary: string;
  outputSummary: string;
  confidence: number;
  reasoningBasis: string[];
  decisionCriteria: string[];
  rejectedAlternatives: string[];
  requiresHumanReview: boolean;
}

/** Generic agent output envelope used by the workflow audit trail. */
export interface AgentOutput<TStructuredOutput> extends AgentReasoningMetadata {
  structuredOutput: TStructuredOutput;
}

/** Output of the Decision Synthesizer / Arbitration Agent. */
export interface DecisionSynthesizerOutput {
  finalRecommendation: string;
  selectedBundleTitle: string;
  rationale: string;
  confidence: number;
  conflictsDetected: string[];
  conflictResolution: string[];
  humanReviewRequired: boolean;
  reviewReason: string;
  recommendedNextAction: string;
}

// ---------------------------------------------------------------------------
// Hybrid AI Mode Types
// ---------------------------------------------------------------------------

/**
 * Whether a triage step used LLM-assisted reasoning or deterministic fallback.
 *
 * "llm-assisted"         — an LLM provider responded with valid structured output.
 * "deterministic-fallback" — no provider available; deterministic logic was used.
 */
export type AIMode = "llm-assisted" | "deterministic-fallback";

/** Metadata about how a triage step was executed. */
export interface AIExecutionMetadata {
  /** The mode actually used in this run. */
  aiMode: AIMode;
  /** True if an LLM provider was available and responded successfully. */
  aiAvailable: boolean;
  /** Human-readable reason why the mode was selected (especially for fallback). */
  aiReason?: string;
  /** Provider identifier, e.g. "sumopod". Present when a provider was attempted. */
  aiProvider?: string;
  /** Model identifier used for the LLM call. Present when a provider was attempted. */
  aiModel?: string;
  /** Whether LLM output was normalized into canonical workflow values. */
  normalizationApplied?: boolean;
  /** Human-readable notes describing normalization decisions. */
  normalizationNotes?: string[];
  /** Raw validated LLM candidate kept for developer auditability. */
  rawLLMCandidate?: LLMTriageCandidate;
}

/**
 * Structured JSON candidate returned by an LLM provider.
 * All fields are optional — the adapter validates and fills missing values
 * from the deterministic fallback before accepting this as triage output.
 */
export interface LLMTriageCandidate {
  problemCategory?: string;
  primarySpace?: string;
  primaryUser?: string;
  constraints?: string[];
  normalizedNeed?: string;
  riskHints?: string[];
  reasoning?: string;
}

/** Triage output enriched with AI execution metadata. */
export interface HybridTriageOutput extends TriageOutput {
  /** Metadata about how this triage step was executed. */
  aiMeta: AIExecutionMetadata;
}

// ---------------------------------------------------------------------------
// Interaction Log
// ---------------------------------------------------------------------------

/** A single step in the interaction log. */
export interface InteractionLogStep {
  stepNumber: number;
  agentName: string;
  sourceAgent: string;
  targetAgent?: string;
  inputSummary: string;
  outputSummary: string;
  input: string;
  output: string;
  confidence: number;
  reasoningBasis: string[];
  decisionDependency: string;
  timestamp: string;
  fallbackStatus: string;
  humanReviewStatus: string;
  structuredOutput: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Workflow Run Metrics
// ---------------------------------------------------------------------------

/** Measurable output metrics from a workflow run. */
export interface WorkflowMetrics {
  risksDetected: number;
  highPriorityRisks: number;
  productsSuggested: number;
  serviceOptionsSuggested: number;
  bundleSections: number;
  staffSummaryGenerated: boolean;
  businessInsightGenerated: boolean;
  agentStepsLogged: number;
  decisionSynthesized: boolean;
  /** AI mode used by the triage step in this run. */
  triageAiMode: AIMode;
}

// ---------------------------------------------------------------------------
// Complete Workflow Run Result
// ---------------------------------------------------------------------------

/** The complete structured output of one end-to-end workflow run. */
export interface WorkflowRunResult {
  scenario: {
    id: string;
    title: string;
    userStory: string;
    selectedChips: string[];
    buyingPreference: BuyingPreference;
  };
  triage: TriageOutput;
  risks: RiskOutput;
  products: ProductMatchOutput;
  services: ServiceMatchOutput;
  bundle: BundleOutput;
  staffSummary: string;
  businessInsight: BusinessInsight;
  decision: DecisionSynthesizerOutput;
  agentOutputs: AgentOutput<Record<string, unknown>>[];
  interactionLog: InteractionLogStep[];
  metrics: WorkflowMetrics;
  technicalNote: string;
  /** AI execution metadata from the triage step. Always present. */
  aiMeta: AIExecutionMetadata;
}
