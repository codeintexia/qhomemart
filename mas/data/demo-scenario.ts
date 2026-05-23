/**
 * Demo Scenario — Bathroom Safety for Older Adults / Caregivers
 *
 * This file defines the canonical demo scenario used throughout the
 * MAS QHomemart prototype to illustrate the full multi-agent pipeline.
 *
 * The scenario is intentionally minimal and uses fictional data.
 * It is NOT connected to any real QHomemart production system,
 * real customer data, or live inventory.
 *
 * Replace this file with real QHomemart catalog / CRM data in a
 * production integration phase.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Persona representing the primary occupant whose safety we are solving for. */
export interface DemoPersona {
  /** Friendly display name */
  name: string;
  /** Age group of the persona */
  ageGroup: "child" | "adult" | "elderly";
  /** Short description of mobility status */
  mobilityStatus: string;
  /** Primary caregiver relationship (if any) */
  caregiverRelationship?: string;
}

/** High-level description of the home environment. */
export interface DemoHomeContext {
  /** Type of property */
  propertyType: "apartment" | "landed-house" | "townhouse";
  /** Number of bathrooms */
  bathroomCount: number;
  /** Whether the bathroom has a wet/dry separation */
  hasWetDrySeparation: boolean;
  /** Existing safety features already installed */
  existingSafetyFeatures: string[];
}

/** The top-level demo scenario object. */
export interface DemoScenario {
  /** Unique identifier for this scenario */
  id: string;
  /** Human-readable scenario title */
  title: string;
  /** Scenario vertical / domain */
  vertical: string;
  /** The primary persona */
  persona: DemoPersona;
  /** Home context */
  homeContext: DemoHomeContext;
  /** The raw problem statement as a customer would describe it */
  problemStatement: string;
  /** Intended outcome after MAS recommendation */
  intendedOutcome: string;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

/**
 * The canonical demo scenario: bathroom safety for an elderly occupant.
 *
 * Used by the workflow orchestrator (workflows/bathroom-safety-workflow.ts)
 * as the seed input for the entire multi-agent pipeline.
 */
export const demoScenario: DemoScenario = {
  id: "demo-bathroom-safety-001",
  title: "Keamanan Kamar Mandi untuk Lansia",
  vertical: "bathroom-safety",
  persona: {
    name: "Bu Sari (fiktif)",
    ageGroup: "elderly",
    mobilityStatus: "Berjalan dengan bantuan — keseimbangan kurang stabil",
    caregiverRelationship: "Putri (tinggal serumah)",
  },
  homeContext: {
    propertyType: "landed-house",
    bathroomCount: 2,
    hasWetDrySeparation: false,
    existingSafetyFeatures: [],
  },
  problemStatement:
    "Kamar mandi lantai satu licin dan tidak ada pegangan. Ibu saya (75 tahun) sudah pernah hampir jatuh dua kali bulan lalu. Kami ingin membuat kamar mandi lebih aman sebelum lebaran.",
  intendedOutcome:
    "Sistem merekomendasikan paket produk anti-slip, grab bar, dan layanan pemasangan yang sesuai anggaran keluarga, disertai ringkasan untuk staf QHomemart.",
};
