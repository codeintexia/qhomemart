/**
 * Context & Risk Agent
 *
 * Role: Receives the TriageOutput from the Customer Triage Agent and
 * identifies the specific risk factors present in the customer's home.
 * Each risk is tagged with severity and priority order so downstream agents
 * can rank their recommendations accordingly.
 *
 * Prototype: deterministic for the bathroom-safety demo scenario.
 * Not connected to real QHomemart systems.
 */

import type { TriageOutput, RiskOutput, RiskItem } from "@/types/mas-types";

/**
 * Runs the Context & Risk Agent.
 *
 * Maps the triage output to a structured list of risk factors with severity
 * ratings and priority order. For the bathroom-safety demo, four risks are
 * always produced.
 *
 * @param triageOutput - Structured output from the Customer Triage Agent
 * @returns RiskOutput containing all identified risks
 */
export function runContextRiskAgent(triageOutput: TriageOutput): RiskOutput {
  void triageOutput; // used by downstream agents via workflow

  const risks: RiskItem[] = [
    {
      id: "slip-hazard",
      label: "Risiko terpeleset",
      severity: "Tinggi",
      reason:
        "Lantai kamar mandi yang basah dan licin merupakan penyebab utama cedera jatuh pada lansia.",
      priorityOrder: 1,
    },
    {
      id: "no-grab-support",
      label: "Kurang pegangan",
      severity: "Tinggi",
      reason:
        "Tanpa pegangan dinding, lansia kesulitan berdiri dan berpindah dengan stabil di kamar mandi.",
      priorityOrder: 2,
    },
    {
      id: "poor-lighting",
      label: "Cahaya kurang jelas",
      severity: "Sedang",
      reason:
        "Pencahayaan yang kurang mempersulit pengenalan bahaya seperti genangan air atau lantai basah.",
      priorityOrder: 3,
    },
    {
      id: "items-hard-to-reach",
      label: "Barang sulit dijangkau",
      severity: "Sedang",
      reason:
        "Membungkuk atau meraih barang yang jauh meningkatkan risiko kehilangan keseimbangan.",
      priorityOrder: 4,
    },
  ];

  return {
    risks,
    riskNarrative:
      "Dua risiko utama memerlukan perhatian segera: lantai licin dan kurangnya pegangan. Dua risiko tambahan — pencahayaan dan jangkauan barang — disarankan untuk ditangani setelah kebutuhan utama terpenuhi.",
  };
}
