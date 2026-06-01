/**
 * Hybrid Triage Test Script — MAS QHomemart
 *
 * Developer utility to inspect deterministic and optional LLM-assisted triage
 * behavior with generic server-side LLM environment variables.
 *
 * Usage:
 *   Set environment variables first, then run with tsx:
 *
 *   AGENT_EXECUTION_MODE=llm-assisted \
 *   LLM_API_KEY=your_key \
 *   LLM_BASE_URL=https://api.sumopod.com/v1 \
 *   LLM_MODEL=your-model \
 *   npx tsx mas/scripts/test-sumopod-triage.ts
 *
 * Or export them in your shell first:
 *   export AGENT_EXECUTION_MODE=llm-assisted
 *   export LLM_API_KEY=your_key
 *   export LLM_BASE_URL=https://api.sumopod.com/v1
 *   export LLM_MODEL=your-model
 *   npx tsx mas/scripts/test-sumopod-triage.ts
 *
 * Expected output when env vars are set:
 *   aiMode: "llm-assisted"
 *   aiAvailable: true
 *   aiProvider: "sumopod"
 *   raw LLM candidate, normalization metadata, and normalized triage output
 *
 * Expected output when env vars are missing:
 *   aiMode: "deterministic-fallback"
 *   aiAvailable: false
 *
 * This script does NOT affect the public demo UI.
 * No secrets should be committed to the repository.
 *
 * Prototype only. Not connected to real QHomemart production systems.
 */

import { runHybridCustomerTriageAgent } from "../agents/customer-triage-agent";
import type { CustomerInput } from "../types/mas-types";

const demoInput: CustomerInput = {
  userStory:
    "Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi.",
  selectedChips: [
    "Kamar mandi licin",
    "Lantai sering basah",
    "Pernah hampir terpeleset",
    "Kurang pegangan",
    "Cahaya kurang terang",
    "Budget terbatas",
  ],
  buyingPreference: "Hemat dulu",
};

async function main() {
  console.log("=== MAS QHomemart — Hybrid Triage Test ===\n");
  console.log("Input:");
  console.log(`  User story : ${demoInput.userStory}`);
  console.log(`  Chips      : ${demoInput.selectedChips.join(", ")}`);
  console.log(`  Preference : ${demoInput.buyingPreference}`);
  console.log();

  console.log("Env vars:");
  console.log(
    `  AGENT_EXECUTION_MODE : ${process.env.AGENT_EXECUTION_MODE ?? "[not set]"}`
  );
  console.log(
    `  LLM_API_KEY          : ${process.env.LLM_API_KEY ? "[set]" : "[not set]"}`
  );
  console.log(
    `  LLM_BASE_URL         : ${process.env.LLM_BASE_URL ?? "[not set]"}`
  );
  console.log(
    `  LLM_MODEL            : ${process.env.LLM_MODEL ?? "[not set]"}`
  );
  console.log();

  console.log("Running runHybridCustomerTriageAgent() ...\n");

  const result = await runHybridCustomerTriageAgent(demoInput);

  console.log("--- AI Metadata ---");
  console.log(`  aiMode      : ${result.aiMeta.aiMode}`);
  console.log(`  aiAvailable : ${result.aiMeta.aiAvailable}`);
  if (result.aiMeta.aiProvider) {
    console.log(`  aiProvider  : ${result.aiMeta.aiProvider}`);
  }
  if (result.aiMeta.aiModel) {
    console.log(`  aiModel     : ${result.aiMeta.aiModel}`);
  }
  if (result.aiMeta.aiReason) {
    console.log(`  aiReason    : ${result.aiMeta.aiReason}`);
  }
  console.log(
    `  normalizationApplied : ${result.aiMeta.normalizationApplied ?? false}`
  );
  if (result.aiMeta.normalizationNotes?.length) {
    console.log("  normalizationNotes   :");
    for (const note of result.aiMeta.normalizationNotes) {
      console.log(`    - ${note}`);
    }
  }

  console.log("\n--- Raw LLM Candidate ---");
  if (result.aiMeta.rawLLMCandidate) {
    console.log(JSON.stringify(result.aiMeta.rawLLMCandidate, null, 2));
  } else {
    console.log("  [not available — deterministic fallback or LLM unavailable]");
  }

  console.log("\n--- Normalized Triage Output ---");
  console.log(`  problemCategory : ${result.problemCategory}`);
  console.log(`  primarySpace    : ${result.primarySpace}`);
  console.log(`  primaryUser     : ${result.primaryUser}`);
  console.log(`  constraints     : ${result.constraints.join(", ")}`);
  console.log(`  normalizedNeed  : ${result.normalizedNeed}`);
  console.log(`  reasoning       : ${result.reasoning}`);

  console.log("\n=== Done ===");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
