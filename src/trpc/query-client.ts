import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

const STALE_TIME = 30_000; // 30 seconds

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}
