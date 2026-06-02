const DEMO_INQUIRY_EVENT_KEY = "mas-qhomemart.latest-demo-inquiry-event";

export type DemoInquiryEvent = {
  eventId: string;
  timestamp: string;
  source: "public-home";
  customerNeed: string;
  selectedProblems: string[];
  preference: string;
  detectedCluster: string;
  scenarioId: string;
  scenarioName: string;
  selectedWorkflow: string;
  workflowOutputSummary: string;
  finalRecommendation: string;
  recommendedPackage: string;
  serviceRecommendation: string;
  humanReviewRequired: boolean;
  auditStatus: string;
  interactionLogSummary: string;
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function saveDemoInquiryEvent(event: DemoInquiryEvent) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(DEMO_INQUIRY_EVENT_KEY, JSON.stringify(event));
  } catch (error) {
    console.warn("Unable to save MAS demo inquiry event", error);
  }
}

export function getLatestDemoInquiryEvent(): DemoInquiryEvent | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const rawEvent = window.localStorage.getItem(DEMO_INQUIRY_EVENT_KEY);
    if (!rawEvent) {
      return null;
    }

    return JSON.parse(rawEvent) as DemoInquiryEvent;
  } catch (error) {
    console.warn("Unable to read MAS demo inquiry event", error);
    return null;
  }
}

export function clearDemoInquiryEvent() {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(DEMO_INQUIRY_EVENT_KEY);
  } catch (error) {
    console.warn("Unable to clear MAS demo inquiry event", error);
  }
}
