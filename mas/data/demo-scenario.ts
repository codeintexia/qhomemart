/**
 * Demo Scenarios — Selected Retail Operating Cases
 *
 * Defines customer input seeds used by the MAS QHomemart workflow.
 *
 * All data is fictional. Not connected to real QHomemart systems.
 */

import type { CustomerInput } from "@/types/mas-types";

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
  bathroomSafety: demoScenario,
  plumbingLeak: plumbingLeakScenario,
};
