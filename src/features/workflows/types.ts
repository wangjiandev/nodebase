import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type WorkflowGetOne =
  inferRouterOutputs<AppRouter>["workflows"]["getById"];

export type WorkflowsGetMany =
  inferRouterOutputs<AppRouter>["workflows"]["getAll"]["items"][0];
