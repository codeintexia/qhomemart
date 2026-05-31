/**
 * Demo Scenarios — Selected Retail Operating Cases
 *
 * Defines customer input seeds used by the MAS QHomemart workflow.
 *
 * All data is fictional. Not connected to real QHomemart systems.
 */

import type { CustomerInput, DemoScenarioDefinition } from "@/types/mas-types";

/**
 * The canonical demo scenario seed.
 *
 * Passed to runBathroomSafetyWorkflow() as the default CustomerInput
 * when no explicit input is provided.
 */
export const demoScenario: CustomerInput = {
  userStory:
    "Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi.",
  selectedChips: [
    "Kamar mandi licin",
    "Lantai sering basah",
    "Pernah hampir terpeleset",
    "Kurang pegangan",
    "Cahaya kurang terang",
    "Budget terbatas",
  ],
  buyingPreference: "Hemat dulu",
};

export const plumbingLeakScenario: CustomerInput = {
  userStory:
    "Pipa bawah sink dapur bocor dan air mulai merembes ke kabinet. Saya bingung harus beli seal, fitting, atau selang baru.",
  selectedChips: [
    "Pipa dapur bocor",
    "Air merembes",
    "Area bawah sink",
    "Ukuran fitting belum jelas",
    "Butuh arahan staf",
  ],
  buyingPreference: "Mudah dipasang",
};

export const demoScenarios = {
  bathroomSafety: {
    scenarioId: "bathroom-safety",
    scenarioName: "Bathroom Safety / Kamar Mandi Licin",
    customerInput: demoScenario,
    customerNeed: "Kamar mandi lebih aman untuk lansia.",
    channel: "Public Home guided intake",
    urgencySignal: "Risiko terpeleset dan pernah hampir jatuh.",
    businessContext: "Caregiver household membutuhkan produk safety dan kemungkinan arahan pemasangan.",
    expectedOutputType: "Package recommendation, staff summary, business insight, audit trail.",
  },
  plumbingLeak: {
    scenarioId: "plumbing-leak",
    scenarioName: "Plumbing Leak / Kebocoran Pipa",
    customerInput: plumbingLeakScenario,
    customerNeed: "Mengatasi pipa bawah sink dapur yang bocor.",
    channel: "Public Home guided intake",
    urgencySignal: "Air merembes ke kabinet dan ukuran fitting belum jelas.",
    businessContext: "Customer membutuhkan produk plumbing, validasi staff, dan arahan layanan opsional.",
    expectedOutputType: "Plumbing package recommendation, staff follow-up, review requirement, audit trail.",
  },
} satisfies Record<string, DemoScenarioDefinition>;
