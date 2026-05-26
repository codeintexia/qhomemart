/**
 * LLM Triage Adapter — MAS QHomemart
 *
 * Provides a safe, provider-neutral interface for optional LLM-assisted triage.
 *
 * Design principles:
 * - NEVER crashes the workflow when LLM config is missing or invalid.
 * - ALWAYS returns a typed result — either an LLMTriageCandidate or fallback metadata.
 * - NEVER performs a real network call in the default demo mode.
 * - Reads configuration only from environment variables (never hardcoded).
 *
 * Supported environment variables (all optional):
 *   SUMOPOD_API_KEY    — API key for the configured LLM provider
 *   SUMOPOD_BASE_URL   — Base URL of the LLM provider endpoint
 *   SUMOPOD_MODEL      — Model identifier to request
 *
 * When all three variables are present, the adapter is "available" but
 * will still only call the provider if a concrete implementation exists
 * (see the TODO comment below). Currently the adapter always returns
 * "deterministic-fallback" because no provider contract has been finalized.
 *
 * Prototype only. Not connected to any production LLM service.
 */

import { buildTriagePrompt } from "@/ai/triage-prompt";
import type {
  CustomerInput,
  LLMTriageCandidate,
  AIExecutionMetadata,
} from "@/types/mas-types";

// ---------------------------------------------------------------------------
// Provider config helpers
// ---------------------------------------------------------------------------

/** Reads and validates LLM provider environment variables. */
function readProviderConfig(): {
  apiKey: string | undefined;
  baseUrl: string | undefined;
  model: string | undefined;
} {
  return {
    apiKey: process.env.SUMOPOD_API_KEY,
    baseUrl: process.env.SUMOPOD_BASE_URL,
    model: process.env.SUMOPOD_MODEL,
  };
}

/** Returns true only when all three required env vars are present and non-empty. */
function isProviderConfigured(): boolean {
  const { apiKey, baseUrl, model } = readProviderConfig();
  return (
    typeof apiKey === "string" && apiKey.length > 0 &&
    typeof baseUrl === "string" && baseUrl.length > 0 &&
    typeof model === "string" && model.length > 0
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns whether an LLM provider is configured via environment variables.
 *
 * Does NOT perform a network call. Use this to display AI mode hints in the UI
 * or logs without triggering any provider request.
 *
 * @returns AIExecutionMetadata with aiAvailable reflecting env var presence
 */
export function getLLMTriageAvailability(): AIExecutionMetadata {
  if (!isProviderConfigured()) {
    return {
      aiMode: "deterministic-fallback",
      aiAvailable: false,
      aiReason: "LLM environment variables are not configured. Set SUMOPOD_API_KEY, SUMOPOD_BASE_URL, and SUMOPOD_MODEL to enable LLM-assisted triage.",
    };
  }

  // Provider env vars are present but provider integration is not yet implemented.
  // Return "available" flag so downstream code can distinguish "not configured"
  // from "configured but no implementation yet".
  return {
    aiMode: "deterministic-fallback",
    aiAvailable: true,
    aiReason: "LLM provider environment variables are configured but provider integration is not yet implemented. Falling back to deterministic triage.",
  };
}

/**
 * Attempts optional LLM-assisted triage for the given customer input.
 *
 * Returns either:
 *   - A validated LLMTriageCandidate (when LLM responds successfully), OR
 *   - null (when LLM is unavailable, unconfigured, or returns invalid output)
 *
 * Also returns AIExecutionMetadata describing what actually happened.
 *
 * This function NEVER throws. All errors are caught and result in a null
 * candidate with "deterministic-fallback" metadata.
 *
 * @param input - Raw customer input from the UI
 * @returns Object with optional candidate and required aiMeta
 */
export async function runOptionalLLMTriage(
  input: CustomerInput
): Promise<{ candidate: LLMTriageCandidate | null; aiMeta: AIExecutionMetadata }> {
  // Guard: check env config before attempting anything
  if (!isProviderConfigured()) {
    return {
      candidate: null,
      aiMeta: {
        aiMode: "deterministic-fallback",
        aiAvailable: false,
        aiReason: "LLM environment variables are not configured.",
      },
    };
  }

  // Build the prompt (this is safe — no network call)
  const prompt = buildTriagePrompt(input);
  void prompt; // consumed by provider implementation below

  // ---------------------------------------------------------------------------
  // TODO: Provider implementation
  //
  // When a finalized Sumopod (or other) API contract is available, replace
  // this block with the actual fetch call. Example structure:
  //
  //   const config = readProviderConfig();
  //   const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${config.apiKey}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       model: config.model,
  //       messages: [{ role: "user", content: prompt }],
  //       temperature: 0,
  //     }),
  //   });
  //   const json = await response.json();
  //   const rawText = json.choices?.[0]?.message?.content ?? "";
  //   const candidate = parseAndValidateLLMResponse(rawText);
  //   return { candidate, aiMeta: { aiMode: "llm-assisted", aiAvailable: true } };
  //
  // Do NOT implement this without a confirmed provider API contract.
  // The exact request/response shape must be verified against provider docs first.
  // ---------------------------------------------------------------------------

  return {
    candidate: null,
    aiMeta: {
      aiMode: "deterministic-fallback",
      aiAvailable: true,
      aiReason:
        "LLM provider environment variables are configured but provider integration is not yet implemented. Falling back to deterministic triage.",
    },
  };
}
