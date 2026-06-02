/**
 * Demo Product Catalog — Bathroom Safety
 *
 * Minimal, fictional product list for selected retail operating scenarios.
 * Contains no real QHomemart SKUs, real prices, or live stock data.
 *
 * In a future integration phase, replace this array with a live
 * QHomemart product feed or catalog API response.
 */

import type { DemoProduct } from "@/types/mas-types";

/**
 * Demo products covering bathroom-safety and plumbing-leak risks.
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
  {
    id: "product-pipe-sealant",
    name: "Sealant pipa anti bocor",
    category: "Plumbing",
    reason: "Membantu menutup rembesan sementara pada area sambungan pipa.",
    riskAddressed: "active-water-leak",
    budgetTier: "Hemat",
    priority: "Tinggi",
    sectionHint: "A",
  },
  {
    id: "product-flexible-hose",
    name: "Selang fleksibel sink dapur",
    category: "Plumbing",
    reason: "Alternatif penggantian komponen bila selang lama menjadi sumber bocor.",
    riskAddressed: "water-damage",
    budgetTier: "Sedang",
    priority: "Tinggi",
    sectionHint: "A",
  },
  {
    id: "product-fitting-set",
    name: "Set fitting pipa dapur",
    category: "Plumbing",
    reason: "Membantu staff mencocokkan ukuran sambungan yang tepat setelah validasi.",
    riskAddressed: "unclear-fitting-size",
    budgetTier: "Sedang",
    priority: "Sedang",
    sectionHint: "B",
  },
  {
    id: "product-led-garage-light",
    name: "Lampu LED area garasi",
    category: "Pencahayaan",
    reason: "Membantu membuat area garasi atau area rumah lebih terang dan mudah digunakan.",
    riskAddressed: "poor-home-lighting",
    budgetTier: "Hemat",
    priority: "Sedang",
    sectionHint: "A",
  },
  {
    id: "product-lamp-fitting-check",
    name: "Fitting dan aksesoris lampu",
    category: "Pencahayaan",
    reason: "Membantu staff mencocokkan kebutuhan fitting sebelum pemasangan atau penggantian lampu.",
    riskAddressed: "installation-unclear",
    budgetTier: "Hemat",
    priority: "Sedang",
    sectionHint: "B",
  },
  {
    id: "product-consultation-placeholder",
    name: "Konsultasi kebutuhan produk rumah",
    category: "Konsultasi Retail",
    reason: "Dipakai sebagai arahan staff saat kebutuhan pelanggan masih perlu diklarifikasi.",
    riskAddressed: "unclear-home-need",
    budgetTier: "Hemat",
    priority: "Sedang",
    sectionHint: "A",
  },
];
