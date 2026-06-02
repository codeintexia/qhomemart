/**
 * Bundle Strategy Agent
 *
 * Role: Receives matched products, matched services, the customer buying
 * preference, and bundle rules, then assembles the final three-section
 * solution bundle to display in the UI.
 *
 * The buying preference ("Hemat dulu") influences how the bundle title and
 * subtitle are framed. Items are always ordered: Section A → B → C.
 *
 * Current scope: deterministic for selected local scenarios.
 * Not connected to real QHomemart pricing, margin, or promo systems.
 */

import type {
  ProductMatchOutput,
  ServiceMatchOutput,
  BuyingPreference,
  BundleRulesConfig,
  BundleOutput,
  BundleSection,
  BundleItem,
} from "@/types/mas-types";

/**
 * Runs the Bundle Strategy Agent.
 *
 * Assembles the three-section bundle from product matches, service matches,
 * and bundle rules. Section labels come from bundleRules.sections.
 *
 * @param productMatches   - Output from the Product Match Agent
 * @param serviceMatches   - Output from the Service Match Agent
 * @param buyingPreference - Customer buying preference from the UI
 * @param bundleRulesConfig - Bundle section rules from data/bundle-rules.ts
 * @returns BundleOutput with three sections
 */
export function runBundleStrategyAgent(
  productMatches: ProductMatchOutput,
  serviceMatches: ServiceMatchOutput,
  buyingPreference: BuyingPreference,
  bundleRulesConfig: BundleRulesConfig
): BundleOutput {
  void buyingPreference; // framing is currently fixed for the demo

  const sections: BundleSection[] = [];

  for (const rule of bundleRulesConfig.sections) {
    if (rule.sectionId === "A") {
      const items: BundleItem[] = productMatches.sectionA.map((mp) => ({
        type: "product",
        name: mp.product.name,
        reason: mp.product.reason,
        budgetTier: mp.product.budgetTier,
        priority: mp.product.priority,
      }));
      sections.push({ sectionId: "A", label: rule.label, items });
    }

    if (rule.sectionId === "B") {
      const items: BundleItem[] = productMatches.sectionB.map((mp) => ({
        type: "product",
        name: mp.product.name,
        reason: mp.product.reason,
        budgetTier: mp.product.budgetTier,
        priority: mp.product.priority,
      }));
      sections.push({ sectionId: "B", label: rule.label, items });
    }

    if (rule.sectionId === "C") {
      const items: BundleItem[] = serviceMatches.sectionC.map((ms) => ({
        type: "service",
        name: ms.service.name,
        reason: ms.service.description,
        availabilityNote: ms.service.safeAvailabilityNote,
      }));
      sections.push({ sectionId: "C", label: rule.label, items });
    }
  }

  const itemNames = sections.flatMap((section) => section.items.map((item) => item.name.toLowerCase()));
  const bundleTitle = itemNames.some((name) => name.includes("sealant") || name.includes("pipa") || name.includes("selang"))
    ? "Paket Anti Bocor"
    : itemNames.some((name) => name.includes("anti-slip") || name.includes("pegangan"))
        ? "Paket Kamar Mandi Aman"
        : itemNames.some((name) => name.includes("lampu") || name.includes("fitting"))
          ? "Paket Pencahayaan Area Rumah"
          : "Paket Solusi Kebutuhan Rumah";

  return {
    bundleTitle,
    bundleSubtitle:
      "Dimulai dari yang paling penting dan mudah dilakukan.",
    sections,
  };
}
