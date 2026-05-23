/**
 * Demo Service Catalog
 *
 * Contains a minimal, fictional list of QHomemart-style installation and
 * professional services relevant to the bathroom-safety demo scenario.
 *
 * IMPORTANT: These are placeholder entries only.
 * - Fees are illustrative and do NOT reflect real QHomemart service rates.
 * - Service IDs are fictional.
 * - Availability and booking are not tracked here.
 *
 * In a future integration phase, replace this array with a live
 * QHomemart service feed or scheduling API response.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The format of service delivery. */
export type ServiceDeliveryMode = "on-site" | "remote-consultation";

/** A single service entry in the demo catalog. */
export interface DemoService {
  /** Fictional service identifier */
  serviceId: string;
  /** Display name (Bahasa Indonesia) */
  name: string;
  /** Service category */
  category: string;
  /** One-line service description */
  description: string;
  /** Estimated duration (human-readable, e.g. "2–3 jam") */
  estimatedDuration: string;
  /** Illustrative service fee in IDR (NOT a real QHomemart rate) */
  illustrativeFeelIdr: number;
  /** Delivery mode */
  deliveryMode: ServiceDeliveryMode;
  /** Tags used by the Service Match Agent for relevance scoring */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

/**
 * Minimal demo service list scoped to bathroom-safety solutions.
 *
 * Expand this array in the next implementation phase when connecting
 * to the real QHomemart service booking system.
 */
export const demoServices: DemoService[] = [
  {
    serviceId: "QHM-SVC-INST-001",
    name: "Pemasangan Grab Bar",
    category: "installation",
    description:
      "Teknisi QHomemart memasang grab bar di dinding kamar mandi dengan bor dan fisher.",
    estimatedDuration: "1–2 jam",
    illustrativeFeelIdr: 150000,
    deliveryMode: "on-site",
    tags: ["installation", "grab-bar", "bathroom", "elderly"],
  },
  {
    serviceId: "QHM-SVC-KONSUL-002",
    name: "Konsultasi Keamanan Rumah (Remote)",
    category: "consultation",
    description:
      "Sesi video 30 menit bersama konsultan rumah QHomemart untuk identifikasi risiko dan rekomendasi produk.",
    estimatedDuration: "30 menit",
    illustrativeFeelIdr: 50000,
    deliveryMode: "remote-consultation",
    tags: ["consultation", "home-safety", "elderly", "remote"],
  },
  {
    serviceId: "QHM-SVC-SURVEY-003",
    name: "Survey Lokasi Kamar Mandi",
    category: "survey",
    description:
      "Teknisi mengunjungi rumah untuk mengukur dan merancang layout pemasangan produk keamanan.",
    estimatedDuration: "1 jam",
    illustrativeFeelIdr: 75000,
    deliveryMode: "on-site",
    tags: ["survey", "bathroom", "measurement", "elderly"],
  },
];
