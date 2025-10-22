"use client";

import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import type React from "react";
import { toast } from "sonner";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import type { Workflow } from "@/generated/prisma";
import { useEntitySearch } from "@/hooks/use-entity-search";
import {
  useCreateWorkflow,
  useDeleteWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export const WorkflowList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <EntityList
      emptyView={<WorkflowEmptyView />}
      getKey={(workflow) => workflow.id}
      items={workflows.data.items}
      renderItem={(workflow) => <WorkflowItem workflow={workflow} />}
    />
  );
};

export const WorkflowItem = ({ workflow }: { workflow: Workflow }) => {
  const deleteWorkflow = useDeleteWorkflow();

  const deleteHandler = () => {
    deleteWorkflow.mutate({ id: workflow.id });
  };
  return (
    <EntityItem
      href={`/workflows/${workflow.id}`}
      isRemoving={deleteWorkflow.isPending}
      onRemove={deleteHandler}
      subtitle={`Updated ${formatDistanceToNow(workflow.updatedAt, { addSuffix: true })} - Created ${formatDistanceToNow(workflow.createdAt, { addSuffix: true })}`}
      title={workflow.name}
    />
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
      pagination={<WorkflowPagination />}
      search={<WorkflowSearch />}
    >
      {children}
    </EntityContainer>
  </>
);

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      onChange={onSearchChange}
      placeholder="Search Workflows"
      value={searchValue}
    />
  );
};

export const WorkflowPagination = () => {
  const [params, setParams] = useWorkflowsParams();
  const { data, isPending } = useSuspenseWorkflows();
  return (
    <EntityPagination
      disabled={isPending}
      onPageChange={(page) => setParams({ ...params, page })}
      page={data.page}
      totalPages={data.totalPages}
    />
  );
};

export const WorkflowLoadingView = () => (
  <LoadingView message="Loading workflows..." />
);

export const WorkflowErrorView = () => (
  <ErrorView message="Error loading workflows..." />
);

export const WorkflowEmptyView = () => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();

  const createHandler = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };
  return (
    <EmptyView
      message="No workflows found. You haven't created any workflows yet."
      onNew={createHandler}
    />
  );
};
