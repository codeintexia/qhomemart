/**
 * Product Match Agent
 *
 * Role: Receives the TriageOutput, RiskOutput, and demo product catalog,
 * then groups products into bundle sections based on risk priority and
 * the sectionHint on each product.
 *
 * Section A — products for high-priority risks ("Mulai dari yang paling perlu")
 * Section B — products for medium-priority improvements ("Tambahan yang disarankan")
 *
 * Current scope: deterministic matching against the demo product list.
 * Not connected to real QHomemart catalog or inventory systems.
 */

import type {
  TriageOutput,
  RiskOutput,
  DemoProduct,
  ProductMatchOutput,
  MatchedProduct,
} from "@/types/mas-types";

/**
 * Runs the Product Match Agent.
 *
 * Groups demo products into Section A (highest-priority) and Section B
 * (recommended additions) based on each product's sectionHint and the
 * risk severity from the RiskOutput.
 *
 * @param triageOutput   - Output from the Customer Triage Agent
 * @param riskOutput     - Output from the Context & Risk Agent
 * @param products       - Demo product catalog from data/products.ts
 * @returns ProductMatchOutput with products sorted into sections
 */
export function runProductMatchAgent(
  triageOutput: TriageOutput,
  riskOutput: RiskOutput,
  products: DemoProduct[]
): ProductMatchOutput {
  void triageOutput;

  const sectionA: MatchedProduct[] = [];
  const sectionB: MatchedProduct[] = [];
  const riskIds = new Set(riskOutput.risks.map((risk) => risk.id));

  for (const product of products) {
    if (!riskIds.has(product.riskAddressed)) continue;

    if (product.sectionHint === "A") {
      sectionA.push({ product, section: "A" });
    } else {
      sectionB.push({ product, section: "B" });
    }
  }

  return { sectionA, sectionB };
}
