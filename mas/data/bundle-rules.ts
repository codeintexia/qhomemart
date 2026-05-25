/**
 * Bundle Rules Configuration
 *
 * Defines the three bundle sections used to compose the solution package.
 * Each section maps to a group of product or service items with a specific
 * priority level and display label.
 *
 * Section A — "Mulai dari yang paling perlu"
 *   High-priority risk solutions. Always shown first.
 *
 * Section B — "Tambahan yang disarankan"
 *   Medium-priority improvements. Shown after essential items.
 *
 * Section C — "Jika butuh bantuan jasa"
 *   Optional service guidance. Not a guaranteed service offering.
 *
 * Prototype only — not connected to real QHomemart bundle, promo, or
 * margin systems.
 */

import type { BundleRulesConfig } from "@/types/mas-types";

/**
 * Bundle rules for the bathroom-safety demo scenario.
 *
 * Expand in the next integration phase with real QHomemart bundle,
 * promo, and margin rules.
 */
export const bundleRules: BundleRulesConfig = {
  version: "1.0.0-demo",
  sections: [
    {
      sectionId: "A",
      label: "Mulai dari yang paling perlu",
      includesPriority: ["Tinggi"],
      isServiceSection: false,
    },
    {
      sectionId: "B",
      label: "Tambahan yang disarankan",
      includesPriority: ["Sedang"],
      isServiceSection: false,
    },
    {
      sectionId: "C",
      label: "Jika butuh bantuan jasa",
      isServiceSection: true,
    },
  ],
};
