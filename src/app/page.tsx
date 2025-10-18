import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import Client from "./client";

const Page = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
