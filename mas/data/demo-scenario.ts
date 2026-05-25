/**
 * Demo Scenario — Bathroom Safety for Older Adults / Caregivers
 *
 * Defines the canonical customer input used as the default seed for the
 * MAS QHomemart bathroom-safety demo workflow.
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
