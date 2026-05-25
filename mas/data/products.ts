/**
 * Demo Product Catalog — Bathroom Safety
 *
 * Minimal, fictional product list for the bathroom-safety demo scenario.
 * Contains no real QHomemart SKUs, real prices, or live stock data.
 *
 * In a future integration phase, replace this array with a live
 * QHomemart product feed or catalog API response.
 */

import type { DemoProduct } from "@/types/mas-types";

/**
 * Four demo products covering the four identified bathroom-safety risks.
 *
 * sectionHint: "A" = essential (high-priority risks)
 *              "B" = recommended addition (medium-priority improvements)
 */
export const demoProducts: DemoProduct[] = [
  {
    id: "product-anti-slip-mat",
    name: "Keset anti-slip kamar mandi",
    category: "Keamanan Lantai",
    reason: "Membantu mengurangi risiko terpeleset di lantai basah.",
    riskAddressed: "slip-hazard",
    budgetTier: "Hemat",
    priority: "Tinggi",
    sectionHint: "A",
  },
  {
    id: "product-grab-bar",
    name: "Pegangan dinding kamar mandi",
    category: "Keamanan Dinding",
    reason: "Membantu pengguna berdiri dan bergerak lebih stabil.",
    riskAddressed: "no-grab-support",
    budgetTier: "Sedang",
    priority: "Tinggi",
    sectionHint: "A",
  },
  {
    id: "product-brighter-light",
    name: "Lampu kamar mandi lebih terang",
    category: "Pencahayaan",
    reason: "Membantu melihat lantai basah dan area berisiko.",
    riskAddressed: "poor-lighting",
    budgetTier: "Hemat",
    priority: "Sedang",
    sectionHint: "B",
  },
  {
    id: "product-low-shelf",
    name: "Rak rendah yang mudah dijangkau",
    category: "Penyimpanan",
    reason: "Mengurangi kebutuhan membungkuk atau meraih terlalu jauh.",
    riskAddressed: "items-hard-to-reach",
    budgetTier: "Hemat",
    priority: "Sedang",
    sectionHint: "B",
  },
];
