/**
 * LLM Triage Adapter — MAS QHomemart
 *
 * Provides a safe, provider-neutral interface for optional LLM-assisted triage.
 * Implements a real OpenAI-compatible call to Sumopod when environment variables
 * are configured.
 *
 * Design principles:
 * - NEVER crashes the workflow when LLM config is missing or invalid.
 * - ALWAYS returns a typed result — either an LLMTriageCandidate or fallback metadata.
 * - Only makes a real network call when all three env vars are present.
 * - Deterministic fallback is always the default when env vars are missing or
 *   the LLM call fails for any reason.
 * - Reads configuration only from environment variables (never hardcoded).
 *
 * Confirmed Sumopod API:
 *   Endpoint: POST {SUMOPOD_BASE_URL}/chat/completions
 *   Compatible: OpenAI chat completions format
 *   Recommended model: gemini/gemini-2.0-flash
 *
 * Required environment variables (all optional for build and default demo):
 *   SUMOPOD_API_KEY    — API key for authentication
 *   SUMOPOD_BASE_URL   — e.g. https://ai.sumopod.com/v1
 *   SUMOPOD_MODEL      — e.g. gemini/gemini-2.0-flash
 *
 * Prototype. Not a production autonomous AI system.
 * Not connected to real QHomemart inventory, pricing, or WhatsApp.
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

/** Reads LLM provider environment variables. */
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
// Response validation
// ---------------------------------------------------------------------------

/**
 * Validates that an LLM response object contains all required fields.
 * Returns true only if all six required string/array fields are present
 * and non-empty. Does not throw — returns false on any issue.
 */
function isValidLLMCandidate(obj: unknown): obj is LLMTriageCandidate {
  if (typeof obj !== "object" || obj === null) return false;
  const c = obj as Record<string, unknown>;
  return (
    typeof c.problemCategory === "string" && c.problemCategory.length > 0 &&
    typeof c.primarySpace === "string" && c.primarySpace.length > 0 &&
    typeof c.primaryUser === "string" && c.primaryUser.length > 0 &&
    Array.isArray(c.constraints) && c.constraints.length > 0 &&
    typeof c.normalizedNeed === "string" && c.normalizedNeed.length > 0 &&
    typeof c.reasoning === "string" && c.reasoning.length > 0
  );
}

/**
 * Safely parses a raw LLM response string as JSON.
 * Strips markdown code fences if present (e.g., ```json ... ```).
 * Returns null on any parse failure — never throws.
 */
function safeParseJSON(raw: string): unknown {
  try {
    // Strip markdown code fences if the model wrapped the JSON
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
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
  const { model } = readProviderConfig();
  if (!isProviderConfigured()) {
    return {
      aiMode: "deterministic-fallback",
      aiAvailable: false,
      aiReason:
        "LLM environment variables are not configured. Set SUMOPOD_API_KEY, SUMOPOD_BASE_URL, and SUMOPOD_MODEL to enable LLM-assisted triage.",
    };
  }

  return {
    aiMode: "deterministic-fallback",
    aiAvailable: true,
    aiProvider: "sumopod",
    aiModel: model,
    aiReason:
      "LLM provider is configured. Call runOptionalLLMTriage() to attempt LLM-assisted triage.",
  };
}

/**
 * Attempts optional LLM-assisted triage via the Sumopod OpenAI-compatible API.
 *
 * Behaviour matrix:
 *   - Env vars missing → returns null candidate + deterministic-fallback metadata
 *   - Env vars present, fetch succeeds, valid JSON → returns LLMTriageCandidate + llm-assisted metadata
 *   - Env vars present, fetch fails or invalid JSON → returns null candidate + deterministic-fallback metadata
 *
 * This function NEVER throws. All errors are caught and result in a null
 * candidate with "deterministic-fallback" metadata.
 *
 * Token usage is kept low via max_tokens: 500 and temperature: 0.1.
 *
 * @param input - Raw customer input from the UI
 * @returns Object with optional candidate and required aiMeta
 */
export async function runOptionalLLMTriage(
  input: CustomerInput
): Promise<{ candidate: LLMTriageCandidate | null; aiMeta: AIExecutionMetadata }> {
  const config = readProviderConfig();

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

  // Build the structured Indonesian-language prompt
  const userPrompt = buildTriagePrompt(input);

  try {
    const endpoint = `${config.baseUrl}/chat/completions`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "system",
            content:
              "You are a careful Indonesian home-improvement triage assistant. Return only valid JSON. Do not include markdown.",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "(unreadable)");
      return {
        candidate: null,
        aiMeta: {
          aiMode: "deterministic-fallback",
          aiAvailable: false,
          aiProvider: "sumopod",
          aiModel: config.model,
          aiReason: `Sumopod API returned HTTP ${response.status}: ${errorText.slice(0, 120)}`,
        },
      };
    }

    // Parse the OpenAI-compatible response envelope
    const envelope = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const rawContent = envelope?.choices?.[0]?.message?.content ?? "";
    if (!rawContent) {
      return {
        candidate: null,
        aiMeta: {
          aiMode: "deterministic-fallback",
          aiAvailable: false,
          aiProvider: "sumopod",
          aiModel: config.model,
          aiReason: "Sumopod returned an empty response content.",
        },
      };
    }

    // Safely parse the LLM's JSON output
    const parsed = safeParseJSON(rawContent);
    if (!isValidLLMCandidate(parsed)) {
      return {
        candidate: null,
        aiMeta: {
          aiMode: "deterministic-fallback",
          aiAvailable: false,
          aiProvider: "sumopod",
          aiModel: config.model,
          aiReason:
            "Sumopod response did not pass validation (missing required triage fields). Deterministic fallback used.",
        },
      };
    }

    // Success — return validated LLM candidate
    return {
      candidate: parsed,
      aiMeta: {
        aiMode: "llm-assisted",
        aiAvailable: true,
        aiProvider: "sumopod",
        aiModel: config.model,
      },
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err);
    return {
      candidate: null,
      aiMeta: {
        aiMode: "deterministic-fallback",
        aiAvailable: false,
        aiProvider: "sumopod",
        aiModel: config.model,
        aiReason: `LLM triage failed; deterministic fallback used. Error: ${message.slice(0, 120)}`,
      },
    };
  }
}
