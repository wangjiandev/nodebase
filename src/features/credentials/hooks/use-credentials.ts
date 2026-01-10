import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { CredentialType } from "@/generated/prisma/enums";
import { useTRPC } from "@/trpc/client";
import { useCredentialsParams } from "./use-credentials-params";

/**
 * Hook to fetch all credentials with suspense.
 */
export const useSuspenseCredentials = () => {
  const trpc = useTRPC();
  const [params] = useCredentialsParams();

  return useSuspenseQuery(trpc.credentials.getAll.queryOptions(params));
};

/**
 * Hook to create credentials.
 */
export const useCreateCredential = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.credentials.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Credential ${data.name} created`);
        queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
      },
      onError: () => {
        toast.error("Failed to create credential");
      },
    })
  );
};

/**
 * Hook to removed credentials.
 */
export const useDeleteCredential = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.credentials.remove.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.credentials.getById.queryFilter({ id: data.id })
        );
      },
      onError: () => {
        toast.error("Failed to removed credential");
      },
    })
  );
};

/**
 * Hook to fetch a single credential by id with suspense.
 */
export const useSuspenseCredential = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.credentials.getById.queryOptions({ id }));
};

/**
 * Hook to fetch credentials by type.
 */
export const useCredentialsByType = (type: CredentialType) => {
  const trpc = useTRPC();
  return useQuery(trpc.credentials.getByType.queryOptions({ type }));
};

/**
 * Hook to update credential.
 */
export const useUpdateCredential = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.credentials.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Credential ${data.name} Saved`);
        queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.credentials.getById.queryFilter({ id: data.id })
        );
      },
      onError: () => {
        toast.error("Failed to save credential");
      },
    })
  );
};
