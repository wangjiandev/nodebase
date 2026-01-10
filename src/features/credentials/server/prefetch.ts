import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.credentials.getAll>;

/**
 * Prefetch all credentials on the server
 */
export const prefetchCredentials = (input: Input) =>
  prefetch(trpc.credentials.getAll.queryOptions(input));

/**
 * Prefetch a credential by id on the server
 */
export const prefetchCredential = (id: string) =>
  prefetch(trpc.credentials.getById.queryOptions({ id }));
