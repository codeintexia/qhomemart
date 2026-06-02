/**
 * Context & Risk Agent
 *
 * Role: Receives the TriageOutput from the Customer Triage Agent and
 * identifies the specific risk factors present in the customer's home.
 * Each risk is tagged with severity and priority order so downstream agents
 * can rank their recommendations accordingly.
 *
 * Current scope: deterministic for supported demo scenarios.
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
  if (triageOutput.problemCategory === "Kebocoran pipa dapur") {
    const risks: RiskItem[] = [
      {
        id: "active-water-leak",
        label: "Rembesan air aktif",
        severity: "Tinggi",
        reason:
          "Kebocoran aktif dapat memperluas kerusakan kabinet, lantai, dan area sekitar pipa.",
        priorityOrder: 1,
      },
      {
        id: "water-damage",
        label: "Risiko kerusakan material",
        severity: "Tinggi",
        reason:
          "Air yang dibiarkan merembes dapat merusak kayu, finishing, dan sambungan bawah sink.",
        priorityOrder: 2,
      },
      {
        id: "unclear-fitting-size",
        label: "Ukuran fitting belum jelas",
        severity: "Sedang",
        reason:
          "Rekomendasi produk plumbing perlu memvalidasi ukuran pipa, seal, atau fitting yang tepat.",
        priorityOrder: 3,
      },
    ];

    return {
      risks,
      riskNarrative:
        "Risiko utama adalah rembesan aktif dan potensi kerusakan material. Staff perlu memvalidasi jenis pipa dan ukuran fitting sebelum customer membeli komponen plumbing.",
    };
  }

  if (triageOutput.problemCategory === "Pencahayaan area rumah") {
    const risks: RiskItem[] = [
      {
        id: "poor-home-lighting",
        label: "Area kurang terang",
        severity: "Sedang",
        reason:
          "Pencahayaan yang kurang dapat mengganggu visibilitas dan kenyamanan aktivitas di area rumah.",
        priorityOrder: 1,
      },
      {
        id: "installation-unclear",
        label: "Kebutuhan pemasangan belum jelas",
        severity: "Sedang",
        reason:
          "Staff perlu memvalidasi titik lampu, jenis fitting, dan kebutuhan instalasi sebelum rekomendasi final.",
        priorityOrder: 2,
      },
    ];

    return {
      risks,
      riskNarrative:
        "Risiko utama adalah visibilitas area yang kurang dan kebutuhan validasi pemasangan. Staff perlu memastikan lokasi, fitting, dan tingkat terang yang dibutuhkan.",
    };
  }

  if (triageOutput.problemCategory === "Kebutuhan perbaikan rumah umum") {
    const risks: RiskItem[] = [
      {
        id: "unclear-home-need",
        label: "Kebutuhan belum spesifik",
        severity: "Sedang",
        reason:
          "Inquiry perlu diklarifikasi agar rekomendasi produk tidak salah kategori.",
        priorityOrder: 1,
      },
    ];

    return {
      risks,
      riskNarrative:
        "Kebutuhan pelanggan masih umum. Staff perlu melakukan follow-up singkat untuk mengunci kategori, lokasi, dan prioritas belanja.",
    };
  }

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
