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
 *     Async. Checks for an optional LLM provider first (via llm-triage-adapter).
 *     If a valid LLM response is available, it uses that; otherwise falls back
 *     to runCustomerTriageAgent(). Always returns HybridTriageOutput including
 *     AIExecutionMetadata so callers know which mode was used.
 *
 * Prototype: not connected to real QHomemart systems.
 */

import type {
  CustomerInput,
  TriageOutput,
  HybridTriageOutput,
} from "@/types/mas-types";
import { getLLMTriageAvailability } from "@/ai/llm-triage-adapter";

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
// Hybrid Agent (async, with optional LLM)
// ---------------------------------------------------------------------------

/**
 * Runs the hybrid Customer Triage Agent.
 *
 * Checks LLM provider availability first. If an LLM provider is configured
 * and responds with valid structured output, that result is used. Otherwise,
 * the deterministic fallback is used.
 *
 * In the current prototype, LLM provider integration is not yet implemented,
 * so this always returns the deterministic fallback with:
 *   aiMode: "deterministic-fallback"
 *   aiAvailable: false
 *
 * The function is async to support future async LLM calls without changing
 * the caller interface.
 *
 * @param input - Raw customer input from the UI
 * @returns HybridTriageOutput — triage result plus AI execution metadata
 */
export async function runHybridCustomerTriageAgent(
  input: CustomerInput
): Promise<HybridTriageOutput> {
  // Check availability synchronously first (no network call)
  const availability = getLLMTriageAvailability();

  if (!availability.aiAvailable) {
    // Fast path: no LLM configured — use deterministic fallback immediately
    const triage = runCustomerTriageAgent(input);
    return {
      ...triage,
      aiMeta: {
        aiMode: "deterministic-fallback",
        aiAvailable: false,
        aiReason: availability.aiReason,
      },
    };
  }

  // LLM is configured but integration is not yet implemented.
  // The adapter's runOptionalLLMTriage() will return null candidate,
  // so we always arrive at the deterministic fallback here too.
  //
  // When a provider implementation is added to llm-triage-adapter.ts,
  // this block will receive a valid LLMTriageCandidate and should
  // normalize it into a TriageOutput before returning.
  const triage = runCustomerTriageAgent(input);
  return {
    ...triage,
    aiMeta: availability,
  };
}
