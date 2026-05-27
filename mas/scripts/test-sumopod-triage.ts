/**
 * Sumopod Triage Test Script — MAS QHomemart
 *
 * Developer utility to manually verify that the Sumopod LLM triage adapter
 * is working correctly with real environment variables.
 *
 * Usage:
 *   Set environment variables first, then run with tsx:
 *
 *   SUMOPOD_API_KEY=your_key \
 *   SUMOPOD_BASE_URL=https://ai.sumopod.com/v1 \
 *   SUMOPOD_MODEL=gemini/gemini-2.0-flash \
 *   npx tsx mas/scripts/test-sumopod-triage.ts
 *
 * Or export them in your shell first:
 *   export SUMOPOD_API_KEY=your_key
 *   export SUMOPOD_BASE_URL=https://ai.sumopod.com/v1
 *   export SUMOPOD_MODEL=gemini/gemini-2.0-flash
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
  console.log("=== MAS QHomemart — Sumopod Triage Test ===\n");
  console.log("Input:");
  console.log(`  User story : ${demoInput.userStory}`);
  console.log(`  Chips      : ${demoInput.selectedChips.join(", ")}`);
  console.log(`  Preference : ${demoInput.buyingPreference}`);
  console.log();

  console.log("Env vars:");
  console.log(
    `  SUMOPOD_API_KEY   : ${process.env.SUMOPOD_API_KEY ? "[set]" : "[not set]"}`
  );
  console.log(
    `  SUMOPOD_BASE_URL  : ${process.env.SUMOPOD_BASE_URL ?? "[not set]"}`
  );
  console.log(
    `  SUMOPOD_MODEL     : ${process.env.SUMOPOD_MODEL ?? "[not set]"}`
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
