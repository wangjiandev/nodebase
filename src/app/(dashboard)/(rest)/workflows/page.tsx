import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  WorkflowContainer,
  WorkflowList,
} from "@/features/workflows/components/workflows";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";

const Page = async () => {
  await requireAuth();
  prefetchWorkflows();
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <Suspense fallback={<p>loading...</p>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default Page;
