import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getAll>;

/**
 * Prefetch all workflows on the server
 */
export const prefetchWorkflows = (input: Input) =>
  prefetch(trpc.workflows.getAll.queryOptions(input));

/**
 * Prefetch a workflow by id on the server
 */
export const prefetchWorkflow = (id: string) =>
  prefetch(trpc.workflows.getById.queryOptions({ id }));
