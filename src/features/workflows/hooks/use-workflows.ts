import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * Hook to fetch all workflows with suspense.
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getAll.queryOptions(params));
};

/**
 * Hook to create workflows.
 */
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
      },
      onError: () => {
        toast.error("Failed to create workflow");
      },
    })
  );
};

/**
 * Hook to removed workflows.
 */
export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getById.queryFilter({ id: data.id })
        );
      },
      onError: () => {
        toast.error("Failed to removed workflow");
      },
    })
  );
};

/**
 * Hook to fetch a workflow by id with suspense.
 */
export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getById.queryOptions({ id }));
};

/**
 * Hook to update workflow name.
 */
export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} Name updated`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getById.queryFilter({ id: data.id })
        );
      },
      onError: () => {
        toast.error("Failed to update workflow name");
      },
    })
  );
};

/**
 * Hook to update workflow.
 */
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} Saved`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getById.queryFilter({ id: data.id })
        );
      },
      onError: () => {
        toast.error("Failed to save workflow");
      },
    })
  );
};
