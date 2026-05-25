/**
 * Customer Triage Agent
 *
 * Role: First agent in the pipeline. Receives raw customer input —
 * the user story, selected problem chips, and buying preference —
 * and produces a structured TriageOutput that downstream agents use.
 *
 * Prototype: uses modular dummy data. Not connected to real QHomemart systems.
 */

import type {
  CustomerInput,
  TriageOutput,
} from "@/types/mas-types";

export type { CustomerInput };

/**
 * Runs the Customer Triage Agent.
 *
 * Classifies the customer's problem story and selected chips into a
 * structured triage summary. Reasoning is deterministic for the demo
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
