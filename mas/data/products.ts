/**
 * Demo Product Catalog
 *
 * Contains a minimal, fictional list of QHomemart-style products relevant
 * to the bathroom-safety demo scenario.
 *
 * IMPORTANT: These are placeholder entries only.
 * - Prices are illustrative and do NOT reflect real QHomemart prices.
 * - SKUs are fictional identifiers.
 * - Stock levels are not tracked here (no real inventory system).
 *
 * In a future integration phase, replace this array with a live
 * QHomemart product feed or catalog API response.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single product entry in the demo catalog. */
export interface DemoProduct {
  /** Fictional SKU identifier */
  sku: string;
  /** Display name (Bahasa Indonesia) */
  name: string;
  /** Product category */
  category: string;
  /** One-line product description */
  description: string;
  /** Illustrative price in IDR (NOT a real QHomemart price) */
  illustrativePriceIdr: number;
  /** Tags used by the Product Match Agent for relevance scoring */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

/**
 * Minimal demo product list scoped to bathroom-safety solutions.
 *
 * Expand this array in the next implementation phase when connecting
 * to the real QHomemart catalog.
 */
export const demoProducts: DemoProduct[] = [
  {
    sku: "QHM-AS-001",
    name: "Karpet Anti-Slip Kamar Mandi (60×90 cm)",
    category: "bathroom-safety",
    description:
      "Karpet anti-selip berbahan karet EVA, cocok untuk area basah.",
    illustrativePriceIdr: 89000,
    tags: ["anti-slip", "bathroom", "elderly", "floor"],
  },
  {
    sku: "QHM-GB-002",
    name: "Grab Bar Stainless 60 cm",
    category: "bathroom-safety",
    description:
      "Pegangan dinding tahan karat untuk kamar mandi, kapasitas 150 kg.",
    illustrativePriceIdr: 275000,
    tags: ["grab-bar", "bathroom", "elderly", "wall-mount"],
  },
  {
    sku: "QHM-NS-003",
    name: "Stiker Anti-Slip Transparan (10 pcs)",
    category: "bathroom-safety",
    description:
      "Stiker tekstur transparan untuk ubin kamar mandi, tahan air.",
    illustrativePriceIdr: 45000,
    tags: ["anti-slip", "bathroom", "tile", "easy-install"],
  },
  {
    sku: "QHM-SS-004",
    name: "Kursi Mandi Lipat Aluminium",
    category: "bathroom-safety",
    description:
      "Kursi mandi ringan dengan sandaran, mudah dilipat dan disimpan.",
    illustrativePriceIdr: 420000,
    tags: ["shower-seat", "bathroom", "elderly", "mobility"],
  },
];
