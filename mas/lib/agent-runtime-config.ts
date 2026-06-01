export type AgentExecutionMode = "deterministic" | "llm-assisted";

export interface LLMConfig {
  provider: string;
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
  provider: string;
  model: string;
  warnings: string[];
}

const VALID_MODES: AgentExecutionMode[] = ["deterministic", "llm-assisted"];

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

export function getLLMConfig(): LLMConfig {
  return {
    provider: process.env.LLM_PROVIDER?.trim() || "sumopod",
    baseUrl: process.env.LLM_BASE_URL?.trim() || "",
    model: process.env.LLM_MODEL?.trim() || "",
    apiKey: process.env.LLM_API_KEY?.trim() || undefined,
    warnings: readRequestedMode().warnings,
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
  const runtimeWarnings = [...warnings];
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
