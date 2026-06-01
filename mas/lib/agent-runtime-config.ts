export type AgentExecutionMode = "deterministic" | "llm-assisted";
export type LLMProvider = "sumopod" | "openai" | "gemini" | "none";

export interface LLMConfig {
  provider: LLMProvider;
  baseUrl: string;
  model: string;
  apiKey?: string;
  warnings: string[];
}

export interface RuntimeModeSummary {
  executionMode: AgentExecutionMode;
  requestedMode: AgentExecutionMode;
  effectiveMode: AgentExecutionMode;
  llmAvailable: boolean;
  provider: LLMProvider;
  model: string;
  warnings: string[];
}

const VALID_MODES: AgentExecutionMode[] = ["deterministic", "llm-assisted"];
const VALID_PROVIDERS: LLMProvider[] = ["sumopod", "openai", "gemini"];

function readRequestedMode(): { mode: AgentExecutionMode; warnings: string[] } {
  const rawMode = process.env.AGENT_EXECUTION_MODE?.trim();

  if (!rawMode) {
    return { mode: "deterministic", warnings: [] };
  }

  if (VALID_MODES.includes(rawMode as AgentExecutionMode)) {
    return { mode: rawMode as AgentExecutionMode, warnings: [] };
  }

  return {
    mode: "deterministic",
    warnings: [`Invalid AGENT_EXECUTION_MODE "${rawMode}". Falling back to deterministic mode.`],
  };
}

export function getAgentExecutionMode(): AgentExecutionMode {
  return readRequestedMode().mode;
}

function readProvider(): { provider: Exclude<LLMProvider, "none">; warnings: string[] } {
  const rawProvider = process.env.LLM_PROVIDER?.trim().toLowerCase() || "sumopod";

  if (VALID_PROVIDERS.includes(rawProvider as LLMProvider)) {
    return { provider: rawProvider as Exclude<LLMProvider, "none">, warnings: [] };
  }

  return {
    provider: "sumopod",
    warnings: [`Invalid LLM_PROVIDER "${rawProvider}". Falling back to sumopod provider config.`],
  };
}

export function getLLMConfig(): LLMConfig {
  const requestedMode = readRequestedMode();
  const provider = readProvider();
  const genericBaseUrl = process.env.LLM_BASE_URL?.trim() || "";
  const genericModel = process.env.LLM_MODEL?.trim() || "";
  const genericApiKey = process.env.LLM_API_KEY?.trim() || undefined;

  const providerConfig: Record<Exclude<LLMProvider, "none">, { baseUrl: string; model: string; apiKey?: string }> = {
    sumopod: {
      baseUrl: process.env.SUMOPOD_BASE_URL?.trim() || genericBaseUrl,
      model: process.env.SUMOPOD_MODEL?.trim() || genericModel,
      apiKey: process.env.SUMOPOD_API_KEY?.trim() || genericApiKey,
    },
    openai: {
      baseUrl: process.env.OPENAI_BASE_URL?.trim() || genericBaseUrl || "https://api.openai.com/v1",
      model: process.env.OPENAI_MODEL?.trim() || genericModel || "gpt-5.4-mini",
      apiKey: process.env.OPENAI_API_KEY?.trim() || genericApiKey,
    },
    gemini: {
      baseUrl: process.env.GEMINI_BASE_URL?.trim() || genericBaseUrl || "https://generativelanguage.googleapis.com/v1beta",
      model: process.env.GEMINI_MODEL?.trim() || genericModel || "gemini-3-flash-preview",
      apiKey: process.env.GEMINI_API_KEY?.trim() || genericApiKey,
    },
  };

  const selected = providerConfig[provider.provider];

  return {
    provider: provider.provider,
    baseUrl: selected.baseUrl,
    model: selected.model,
    apiKey: selected.apiKey,
    warnings: [...requestedMode.warnings, ...provider.warnings],
  };
}

export function isLLMAvailable(): boolean {
  const config = getLLMConfig();
  return Boolean(config.apiKey && config.baseUrl && config.model);
}

export function getRuntimeModeSummary(): RuntimeModeSummary {
  const { mode: requestedMode, warnings } = readRequestedMode();
  const config = getLLMConfig();
  const llmAvailable = isLLMAvailable();
  const runtimeWarnings = Array.from(new Set([...warnings, ...config.warnings]));
  let effectiveMode: AgentExecutionMode = requestedMode;

  if (requestedMode === "llm-assisted" && !llmAvailable) {
    effectiveMode = "deterministic";
    runtimeWarnings.push(
      config.apiKey
        ? "LLM-assisted mode requested but LLM_BASE_URL or LLM_MODEL is missing. Falling back to deterministic mode."
        : "LLM-assisted mode requested but LLM_API_KEY is missing. Falling back to deterministic mode."
    );
  }

  if (requestedMode === "deterministic") {
    effectiveMode = "deterministic";
  }

  return {
    executionMode: effectiveMode,
    requestedMode,
    effectiveMode,
    llmAvailable,
    provider: config.provider,
    model: config.model,
    warnings: runtimeWarnings,
  };
}
