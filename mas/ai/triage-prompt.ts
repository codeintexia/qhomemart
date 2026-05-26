/**
 * Triage Prompt Builder — MAS QHomemart
 *
 * Builds a structured Indonesian-language prompt suitable for an LLM
 * to produce a strict JSON triage output from customer input.
 *
 * The prompt specifies the exact JSON schema the LLM must follow and
 * includes clear instructions for responding only in JSON.
 *
 * Usage:
 *   const prompt = buildTriagePrompt(customerInput);
 *   // Pass `prompt` to an LLM provider via llm-triage-adapter.ts
 *
 * Prototype: this file builds the prompt only.
 * No network calls are made here. Provider integration is in llm-triage-adapter.ts.
 */

import type { CustomerInput } from "@/types/mas-types";

/**
 * Builds a structured Indonesian-language prompt for LLM-assisted triage.
 *
 * The resulting string can be sent as the user message to any chat-completion
 * LLM provider. The system instruction is embedded in the prompt so it works
 * with single-turn completion models as well as chat models.
 *
 * Expected LLM JSON response schema:
 * ```json
 * {
 *   "problemCategory": string,
 *   "primarySpace": string,
 *   "primaryUser": string,
 *   "constraints": string[],
 *   "normalizedNeed": string,
 *   "riskHints": string[],
 *   "reasoning": string
 * }
 * ```
 *
 * @param input - Raw customer input captured from the UI
 * @returns Prompt string ready to send to an LLM provider
 */
export function buildTriagePrompt(input: CustomerInput): string {
  const chipsText =
    input.selectedChips.length > 0
      ? input.selectedChips.join(", ")
      : "(tidak ada kondisi tambahan dipilih)";

  return `Kamu adalah agen triage untuk sistem rekomendasi rumah QHomemart.
Tugasmu adalah menganalisis masalah yang dilaporkan pelanggan dan menghasilkan output terstruktur.

Informasi pelanggan:
- Cerita pelanggan: "${input.userStory}"
- Kondisi yang dipilih: ${chipsText}
- Preferensi pembelian: "${input.buyingPreference}"

Hasilkan HANYA JSON valid dengan format berikut (tidak ada teks lain, tidak ada markdown code block):
{
  "problemCategory": "kategori masalah utama dalam satu frasa singkat",
  "primarySpace": "ruangan atau area utama yang bermasalah",
  "primaryUser": "pengguna utama yang terdampak",
  "constraints": ["kendala 1", "kendala 2"],
  "normalizedNeed": "satu kalimat kebutuhan yang sudah dinormalisasi",
  "riskHints": ["risiko potensial 1", "risiko potensial 2"],
  "reasoning": "penjelasan singkat alasan analisis ini dalam satu atau dua kalimat"
}

Aturan penting:
- Semua nilai harus dalam Bahasa Indonesia.
- Hanya berikan JSON. Jangan tambahkan penjelasan di luar JSON.
- Jika informasi tidak cukup, isi field dengan nilai yang masuk akal berdasarkan konteks.
- Jangan gunakan markdown code block atau backtick.`;
}
