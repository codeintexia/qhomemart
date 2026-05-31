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
 * Current scope: not connected to real QHomemart systems.
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
  const text = `${input.userStory} ${input.selectedChips.join(" ")}`.toLowerCase();

  if (
    input.selectedChips.includes("Budget terbatas") ||
    input.buyingPreference === "Hemat dulu"
  ) {
    constraints.unshift("budget terbatas", "mulai dari barang paling penting");
  }

  if (text.includes("pipa") || text.includes("bocor") || text.includes("dapur")) {
    return {
      problemCategory: "Kebocoran pipa dapur",
      primarySpace: "Dapur",
      primaryUser: "Pemilik rumah",
      constraints,
      normalizedNeed:
        "Solusi kebocoran pipa dapur dengan prioritas menghentikan rembesan dan mencegah kerusakan lanjutan.",
      reasoning:
        "Cerita pelanggan menunjukkan kebocoran pipa di area dapur. Fokus awal adalah menghentikan rembesan, melindungi area sekitar, dan menyiapkan arahan staff bila perlu pengecekan instalasi.",
    };
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
): { triage: TriageOutput; normalizationApplied: boolean; normalizationNotes: string[] } {
  const notes: string[] = [];
  const clean = (value: string | undefined): string => value?.trim() ?? "";
  const normalizeText = (value: string): string => value.trim().toLowerCase();
  const hasAny = (value: string, terms: string[]): boolean =>
    terms.some((term) => normalizeText(value).includes(term));

  const rawProblemCategory = clean(candidate.problemCategory);
  let problemCategory = rawProblemCategory || fallback.problemCategory;
  if (
    !rawProblemCategory ||
    hasAny(rawProblemCategory, [
      "keamanan kamar mandi",
      "risiko jatuh",
      "kamar mandi tidak aman",
      "keselamatan kamar mandi",
      "bahaya terpeleset",
      "terpeleset",
      "jatuh di kamar mandi",
    ])
  ) {
    problemCategory = "Kamar mandi licin";
  }
  if (problemCategory !== rawProblemCategory) {
    notes.push(`problemCategory normalized from "${rawProblemCategory || "(missing)"}" to "${problemCategory}".`);
  }

  const rawPrimarySpace = clean(candidate.primarySpace);
  let primarySpace = rawPrimarySpace || fallback.primarySpace;
  if (
    !rawPrimarySpace ||
    hasAny(rawPrimarySpace, ["toilet", "bathroom", "area mandi", "kamar mandi"])
  ) {
    primarySpace = "Kamar mandi";
  }
  if (primarySpace !== rawPrimarySpace) {
    notes.push(`primarySpace normalized from "${rawPrimarySpace || "(missing)"}" to "${primarySpace}".`);
  }

  const rawPrimaryUser = clean(candidate.primaryUser);
  let primaryUser = rawPrimaryUser || fallback.primaryUser;
  if (
    !rawPrimaryUser ||
    hasAny(rawPrimaryUser, ["ibu lansia", "orang tua", "elderly", "senior", "lansia"])
  ) {
    primaryUser = "Lansia";
  }
  if (primaryUser !== rawPrimaryUser) {
    notes.push(`primaryUser normalized from "${rawPrimaryUser || "(missing)"}" to "${primaryUser}".`);
  }

  const rawConstraints =
    Array.isArray(candidate.constraints) && candidate.constraints.length > 0
      ? candidate.constraints.map((constraint) => constraint.trim()).filter(Boolean)
      : [];
  const constraints = [...rawConstraints];
  const hasBudgetConstraint = constraints.some((constraint) =>
    hasAny(constraint, ["hemat", "budget terbatas", "biaya terbatas", "prioritas biaya"])
  );
  if (hasBudgetConstraint || rawConstraints.length === 0) {
    for (const canonicalConstraint of [
      "budget terbatas",
      "mulai dari barang paling penting",
      "mudah dipahami staf",
    ]) {
      if (!constraints.some((constraint) => normalizeText(constraint) === canonicalConstraint)) {
        constraints.push(canonicalConstraint);
      }
    }
  }
  if (constraints.length !== rawConstraints.length) {
    notes.push("constraints normalized to include canonical budget and staff-readability constraints.");
  }

  const rawNormalizedNeed = clean(candidate.normalizedNeed);
  const needLooksSafeAndSpecific =
    rawNormalizedNeed.length >= 24 &&
    hasAny(rawNormalizedNeed, ["kamar mandi", "toilet", "bathroom", "mandi"]) &&
    hasAny(rawNormalizedNeed, ["lansia", "orang tua", "elderly", "senior"]);
  const normalizedNeed = needLooksSafeAndSpecific
    ? rawNormalizedNeed
    : fallback.normalizedNeed;
  if (normalizedNeed !== rawNormalizedNeed) {
    notes.push(`normalizedNeed aligned to canonical demo need from "${rawNormalizedNeed || "(missing)"}".`);
  }

  const rawReasoning = clean(candidate.reasoning);

  return {
    triage: {
      problemCategory,
      primarySpace,
      primaryUser,
      constraints,
      normalizedNeed,
      reasoning: rawReasoning || fallback.reasoning,
    },
    normalizationApplied: notes.length > 0,
    normalizationNotes: notes,
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
    const { triage, normalizationApplied, normalizationNotes } =
      normalizeLLMCandidate(candidate, deterministicTriage);
    return {
      ...triage,
      aiMeta: {
        ...aiMeta,
        normalizationApplied,
        normalizationNotes,
        rawLLMCandidate: candidate,
      },
    };
  }

  // LLM unavailable or failed — use deterministic triage
  return {
    ...deterministicTriage,
    aiMeta: {
      ...aiMeta,
      normalizationApplied: false,
    },
  };
}
