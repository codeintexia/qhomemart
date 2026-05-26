/**
 * Customer Triage Agent
 *
 * Role: First agent in the pipeline. Receives raw customer input —
 * the user story, selected problem chips, and buying preference —
 * and produces a structured TriageOutput that downstream agents use.
 *
 * Two entry points are provided:
 *
 *   runCustomerTriageAgent(input)
 *     Deterministic, synchronous. Always produces identical output for the
 *     same input. Used as the canonical fallback and by tests.
 *
 *   runHybridCustomerTriageAgent(input)
 *     Async. Attempts optional LLM-assisted triage via Sumopod when
 *     SUMOPOD_API_KEY, SUMOPOD_BASE_URL, and SUMOPOD_MODEL are set.
 *     If the LLM responds with valid structured JSON, that output is used.
 *     Otherwise falls back to runCustomerTriageAgent(). Never throws.
 *     Always returns HybridTriageOutput including AIExecutionMetadata.
 *
 * Prototype: not connected to real QHomemart systems.
 * Not a production autonomous AI system.
 */

import type {
  CustomerInput,
  TriageOutput,
  HybridTriageOutput,
  LLMTriageCandidate,
} from "@/types/mas-types";
import { runOptionalLLMTriage } from "@/ai/llm-triage-adapter";

export type { CustomerInput };

// ---------------------------------------------------------------------------
// Deterministic Agent (synchronous)
// ---------------------------------------------------------------------------

/**
 * Runs the deterministic Customer Triage Agent.
 *
 * Classifies the customer's problem story and selected chips into a
 * structured TriageOutput. Reasoning is deterministic for the demo
 * bathroom-safety scenario so the output is fully reproducible.
 *
 * @param input - Raw customer input from the UI
 * @returns TriageOutput
 */
export function runCustomerTriageAgent(input: CustomerInput): TriageOutput {
  // Derive constraints from selected chips and buying preference
  const constraints: string[] = ["mudah dipahami staf"];

  if (
    input.selectedChips.includes("Budget terbatas") ||
    input.buyingPreference === "Hemat dulu"
  ) {
    constraints.unshift("budget terbatas", "mulai dari barang paling penting");
  }

  return {
    problemCategory: "Kamar mandi licin",
    primarySpace: "Kamar mandi",
    primaryUser: "Lansia",
    constraints,
    normalizedNeed:
      "Solusi kamar mandi lebih aman untuk lansia dengan prioritas hemat.",
    reasoning:
      "Dari cerita dan pilihan kondisi, pelanggan mengidentifikasi kamar mandi sebagai ruang berisiko utama bagi anggota lansia. Pilihan 'Hemat dulu' menunjukkan prioritas biaya, sehingga saran dimulai dari produk paling esensial terlebih dahulu.",
  };
}

// ---------------------------------------------------------------------------
// LLM candidate normalizer
// ---------------------------------------------------------------------------

/**
 * Normalizes a validated LLMTriageCandidate into a full TriageOutput.
 *
 * Any missing optional fields (e.g. riskHints, which is not in TriageOutput)
 * are dropped. Required TriageOutput fields not present in the candidate
 * fall back to the deterministic values to ensure the output is always valid.
 *
 * @param candidate - Validated LLM JSON candidate
 * @param fallback  - Deterministic triage output used as safety net
 * @returns TriageOutput
 */
function normalizeLLMCandidate(
  candidate: LLMTriageCandidate,
  fallback: TriageOutput
): TriageOutput {
  return {
    problemCategory:
      typeof candidate.problemCategory === "string" && candidate.problemCategory.length > 0
        ? candidate.problemCategory
        : fallback.problemCategory,
    primarySpace:
      typeof candidate.primarySpace === "string" && candidate.primarySpace.length > 0
        ? candidate.primarySpace
        : fallback.primarySpace,
    primaryUser:
      typeof candidate.primaryUser === "string" && candidate.primaryUser.length > 0
        ? candidate.primaryUser
        : fallback.primaryUser,
    constraints:
      Array.isArray(candidate.constraints) && candidate.constraints.length > 0
        ? candidate.constraints
        : fallback.constraints,
    normalizedNeed:
      typeof candidate.normalizedNeed === "string" && candidate.normalizedNeed.length > 0
        ? candidate.normalizedNeed
        : fallback.normalizedNeed,
    reasoning:
      typeof candidate.reasoning === "string" && candidate.reasoning.length > 0
        ? candidate.reasoning
        : fallback.reasoning,
  };
}

// ---------------------------------------------------------------------------
// Hybrid Agent (async, with optional LLM)
// ---------------------------------------------------------------------------

/**
 * Runs the hybrid Customer Triage Agent.
 *
 * Attempts optional LLM-assisted triage via Sumopod when env vars are set.
 * If the LLM responds with valid structured JSON, that result is normalized
 * and returned with aiMode: "llm-assisted".
 * If the LLM is unavailable, not configured, or returns invalid output,
 * the deterministic fallback is used with aiMode: "deterministic-fallback".
 *
 * Never throws. Always returns a valid HybridTriageOutput.
 *
 * @param input - Raw customer input from the UI
 * @returns HybridTriageOutput — triage result plus AI execution metadata
 */
export async function runHybridCustomerTriageAgent(
  input: CustomerInput
): Promise<HybridTriageOutput> {
  // Always compute the deterministic fallback — used as safety net and for
  // field-level normalization of incomplete LLM candidates.
  const deterministicTriage = runCustomerTriageAgent(input);

  // Attempt LLM triage (returns null candidate when unavailable/failed)
  const { candidate, aiMeta } = await runOptionalLLMTriage(input);

  if (candidate !== null) {
    // LLM succeeded — normalize candidate, fall back field-by-field for safety
    const triage = normalizeLLMCandidate(candidate, deterministicTriage);
    return {
      ...triage,
      aiMeta,
    };
  }

  // LLM unavailable or failed — use deterministic triage
  return {
    ...deterministicTriage,
    aiMeta,
  };
}
