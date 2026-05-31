/**
 * Demo Service Catalog — Selected Retail Scenarios
 *
 * Contains optional service guidance entries for selected scenarios.
 *
 * IMPORTANT: This is NOT a real QHomemart service booking entry.
 * - No booking, scheduling, or availability is tracked here.
 * - The safeAvailabilityNote must always be surfaced in the UI.
 *
 * In a future integration phase, replace this with a real QHomemart
 * service guidance source, if available.
 */

import type { DemoService } from "@/types/mas-types";

/**
 * Demo service guidance entries for the bathroom-safety scenario.
 *
 * Optional service entries represent the "Jika butuh bantuan jasa" section
 * in the bundle output.
 */
export const demoServices: DemoService[] = [
  {
    id: "service-light-installation-check",
    name: "Cek pemasangan atau renovasi ringan",
    description:
      "Tanyakan ke staf apakah layanan pemasangan atau renovasi ringan tersedia untuk kebutuhan ini.",
    safeAvailabilityNote:
      "Layanan ini bersifat arahan opsional dalam prototype dan belum terhubung ke sistem layanan produksi QHomemart.",
  },
  {
    id: "service-plumbing-check",
    name: "Arahan pengecekan plumbing",
    description:
      "Tanyakan ke staf apakah customer perlu konsultasi ukuran fitting, seal, atau komponen pipa sebelum membeli.",
    safeAvailabilityNote:
      "Arahan layanan ini belum terhubung ke jadwal teknisi atau sistem booking produksi QHomemart.",
  },
];
