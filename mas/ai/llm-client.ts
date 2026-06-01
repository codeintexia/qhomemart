import { getLLMConfig, getRuntimeModeSummary } from "@/lib/agent-runtime-config";
import type { AgentExecutionMode } from "@/lib/agent-runtime-config";

export interface LLMCompletionInput {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  purpose: string;
}

export interface LLMCompletionOutput {
  requestedMode: AgentExecutionMode;
  effectiveMode: AgentExecutionMode;
  provider: string;
  model: string;
  usedLLM: boolean;
  output: string;
  warning?: string;
  error?: string;
}

export async function runLLMCompletion(
  input: LLMCompletionInput
): Promise<LLMCompletionOutput> {
  void input;

  const runtime = getRuntimeModeSummary();
  const config = getLLMConfig();

  if (runtime.effectiveMode !== "llm-assisted" || !runtime.llmAvailable) {
    return {
      requestedMode: runtime.requestedMode,
      effectiveMode: "deterministic",
      provider: runtime.provider,
      model: runtime.model,
      usedLLM: false,
      output: "",
      warning:
        runtime.warnings[0] ??
        "LLM unavailable in current runtime. Deterministic fallback used.",
    };
  }

  if (!config.apiKey) {
    return {
      requestedMode: runtime.requestedMode,
      effectiveMode: "deterministic",
      provider: runtime.provider,
      model: runtime.model,
      usedLLM: false,
      output: "",
      warning:
        "LLM-assisted mode requested but LLM_API_KEY is missing. Falling back to deterministic mode.",
    };
  }

  return {
    requestedMode: runtime.requestedMode,
    effectiveMode: "deterministic",
    provider: runtime.provider,
    model: runtime.model,
    usedLLM: false,
    output: "",
    warning:
      "LLM provider call not implemented in local preview. Deterministic fallback used.",
  };
}
