import { getLLMConfig, getRuntimeModeSummary } from "@/lib/agent-runtime-config";
import type { AgentExecutionMode, LLMProvider } from "@/lib/agent-runtime-config";

export interface LLMCompletionInput {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  purpose?: string;
}

export interface LLMCompletionOutput {
  requestedMode: AgentExecutionMode;
  effectiveMode: AgentExecutionMode;
  provider: LLMProvider;
  model: string;
  usedLLM: boolean;
  output: string;
  warning?: string;
  error?: string;
}

type JsonRecord = Record<string, unknown>;

export async function runLLMCompletion(
  input: LLMCompletionInput
): Promise<LLMCompletionOutput> {
  const runtime = getRuntimeModeSummary();
  const config = getLLMConfig();
  const temperature = input.temperature ?? 0.1;
  const maxTokens = input.maxTokens ?? 500;

  if (runtime.requestedMode === "deterministic") {
    return fallback(runtime.requestedMode, config.provider, config.model, "Deterministic mode active. Provider call skipped.");
  }

  if (runtime.effectiveMode !== "llm-assisted" || !runtime.llmAvailable || !config.apiKey) {
    return fallback(
      runtime.requestedMode,
      config.provider,
      config.model,
      runtime.warnings[0] ?? "LLM unavailable in current runtime. Deterministic fallback used."
    );
  }

  try {
    if (config.provider === "openai") {
      return await runOpenAIResponses(input, config.baseUrl, config.model, config.apiKey, temperature, maxTokens, runtime.requestedMode);
    }

    if (config.provider === "gemini") {
      return await runGeminiGenerateContent(input, config.baseUrl, config.model, config.apiKey, temperature, maxTokens, runtime.requestedMode);
    }

    if (config.provider === "sumopod") {
      return await runOpenAICompatibleChat(input, config.baseUrl, config.model, config.apiKey, temperature, maxTokens, runtime.requestedMode);
    }

    return fallback(runtime.requestedMode, "none", "", "Unsupported LLM provider. Deterministic fallback used.");
  } catch {
    return fallback(runtime.requestedMode, config.provider, config.model, "Provider call failed. Deterministic fallback used.");
  }
}

async function runOpenAIResponses(
  input: LLMCompletionInput,
  baseUrl: string,
  model: string,
  apiKey: string,
  temperature: number,
  maxTokens: number,
  requestedMode: AgentExecutionMode
): Promise<LLMCompletionOutput> {
  const response = await fetch(`${trimTrailingSlash(baseUrl)}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        { role: "system", content: input.systemPrompt },
        { role: "user", content: input.userPrompt },
      ],
      temperature,
      max_output_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    return fallback(requestedMode, "openai", model, `OpenAI provider returned HTTP ${response.status}. Deterministic fallback used.`);
  }

  const data = await response.json() as JsonRecord;
  const output = extractOpenAIResponseText(data);

  if (!output) {
    return fallback(requestedMode, "openai", model, "OpenAI response did not include output text. Deterministic fallback used.");
  }

  return success(requestedMode, "openai", model, output);
}

async function runGeminiGenerateContent(
  input: LLMCompletionInput,
  baseUrl: string,
  model: string,
  apiKey: string,
  temperature: number,
  maxTokens: number,
  requestedMode: AgentExecutionMode
): Promise<LLMCompletionOutput> {
  const endpoint = `${trimTrailingSlash(baseUrl)}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: input.systemPrompt }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: input.userPrompt }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    }),
  });

  if (!response.ok) {
    return fallback(requestedMode, "gemini", model, `Gemini provider returned HTTP ${response.status}. Deterministic fallback used.`);
  }

  const data = await response.json() as JsonRecord;
  const output = extractGeminiText(data);

  if (!output) {
    return fallback(requestedMode, "gemini", model, "Gemini response did not include text output. Deterministic fallback used.");
  }

  return success(requestedMode, "gemini", model, output);
}

async function runOpenAICompatibleChat(
  input: LLMCompletionInput,
  baseUrl: string,
  model: string,
  apiKey: string,
  temperature: number,
  maxTokens: number,
  requestedMode: AgentExecutionMode
): Promise<LLMCompletionOutput> {
  const response = await fetch(`${trimTrailingSlash(baseUrl)}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: input.systemPrompt },
        { role: "user", content: input.userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    return fallback(requestedMode, "sumopod", model, `Sumopod provider returned HTTP ${response.status}. Deterministic fallback used.`);
  }

  const data = await response.json() as JsonRecord;
  const output = extractChatCompletionText(data);

  if (!output) {
    return fallback(requestedMode, "sumopod", model, "Sumopod response did not include message content. Deterministic fallback used.");
  }

  return success(requestedMode, "sumopod", model, output);
}

function success(
  requestedMode: AgentExecutionMode,
  provider: LLMProvider,
  model: string,
  output: string
): LLMCompletionOutput {
  return {
    requestedMode,
    effectiveMode: "llm-assisted",
    provider,
    model,
    usedLLM: true,
    output,
  };
}

function fallback(
  requestedMode: AgentExecutionMode,
  provider: LLMProvider,
  model: string,
  warning: string
): LLMCompletionOutput {
  return {
    requestedMode,
    effectiveMode: "deterministic",
    provider,
    model,
    usedLLM: false,
    output: "",
    warning,
  };
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function extractOpenAIResponseText(data: JsonRecord): string {
  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  const output = Array.isArray(data.output) ? data.output : [];
  for (const item of output) {
    if (!isRecord(item)) continue;
    const content = Array.isArray(item.content) ? item.content : [];
    for (const block of content) {
      if (!isRecord(block)) continue;
      if (typeof block.text === "string") return block.text.trim();
      if (typeof block.output_text === "string") return block.output_text.trim();
    }
  }

  return "";
}

function extractGeminiText(data: JsonRecord): string {
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];
  const first = candidates.find(isRecord);
  if (!first) return "";
  const content = isRecord(first.content) ? first.content : undefined;
  const parts = content && Array.isArray(content.parts) ? content.parts : [];
  const part = parts.find(isRecord);
  return typeof part?.text === "string" ? part.text.trim() : "";
}

function extractChatCompletionText(data: JsonRecord): string {
  const choices = Array.isArray(data.choices) ? data.choices : [];
  const first = choices.find(isRecord);
  const message = first && isRecord(first.message) ? first.message : undefined;
  return typeof message?.content === "string" ? message.content.trim() : "";
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}
