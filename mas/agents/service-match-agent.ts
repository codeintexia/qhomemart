/**
 * Service Match Agent
 *
 * Role: Receives the TriageOutput, RiskOutput, and demo service catalog,
 * then selects optional service guidance entries appropriate for Section C
 * of the bundle ("Jika butuh bantuan jasa").
 *
 * Important: This agent does NOT guarantee service availability.
 * It returns guidance text that directs customers to ask a staff member.
 *
 * Current scope: deterministic for selected local scenarios.
 * Not connected to real QHomemart service booking or availability systems.
 */

import type {
  TriageOutput,
  RiskOutput,
  DemoService,
  ServiceMatchOutput,
  MatchedService,
} from "@/types/mas-types";

/**
 * Runs the Service Match Agent.
 *
 * Selects all demo services as optional guidance for Section C.
 * The availabilityNote is always surfaced so the UI can display it.
 *
 * @param triageOutput  - Output from the Customer Triage Agent
 * @param riskOutput    - Output from the Context & Risk Agent
 * @param services      - Demo service catalog from data/services.ts
 * @returns ServiceMatchOutput with optional service guidance for Section C
 */
export function runServiceMatchAgent(
  triageOutput: TriageOutput,
  riskOutput: RiskOutput,
  services: DemoService[]
): ServiceMatchOutput {
  void triageOutput;
  void riskOutput;

  const sectionC: MatchedService[] = services.map((service) => ({
    service,
    matchReason:
      "Beberapa produk yang direkomendasikan mungkin memerlukan pemasangan. Staf dapat membantu mengecek apakah layanan tersedia.",
  }));

  return {
    sectionC,
    availabilityNote:
      "Layanan ini bersifat arahan opsional dalam cakupan saat ini dan belum terhubung ke sistem layanan produksi QHomemart.",
  };
}
