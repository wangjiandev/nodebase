import { FlaskConicalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

type ExecuteWorkflowButtonProps = {
  workflowId: string;
};

const ExecuteWorkflowButton = ({ workflowId }: ExecuteWorkflowButtonProps) => {
  const executeWorkflow = useExecuteWorkflow();
  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };
  return (
    <Button
      disabled={executeWorkflow.isPending}
      onClick={handleExecute}
      size="lg"
    >
      <FlaskConicalIcon className="size-4" />
      Execute Workflow
    </Button>
  );
};

export default ExecuteWorkflowButton;
