import { OperationsDashboard } from "@/components/operations/operations-dashboard";
import { runBathroomSafetyWorkflow } from "@/workflows/bathroom-safety-workflow";

const workflowOutput = runBathroomSafetyWorkflow();

export default function OperationsPage() {
  return <OperationsDashboard workflow={workflowOutput} />;
}
