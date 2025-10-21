"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { toast } from "sonner";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";

export const WorkflowList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <div className="flex flex-1 items-center justify-center">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
  );
};

export const WorkflowHeader = ({ disabled }: { disabled: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();

  const createHandler = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };
  return (
    <EntityHeader
      description="Create and Manager your Workflows"
      disabled={disabled}
      isCreating={createWorkflow.isPending}
      newButtonLabel="New Workflow"
      onNew={createHandler}
      title="Workflows"
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <EntityContainer
      header={<WorkflowHeader disabled={false} />}
      pagination={<>p</>}
      search={<>s</>}
    >
      {children}
    </EntityContainer>
  </>
);
