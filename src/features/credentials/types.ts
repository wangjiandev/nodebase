import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type CredentialGetOne =
  inferRouterOutputs<AppRouter>["credentials"]["getById"];

export type CredentialsGetMany =
  inferRouterOutputs<AppRouter>["credentials"]["getAll"]["items"][0];
