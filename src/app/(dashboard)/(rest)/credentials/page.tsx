import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CredentialContainer,
  CredentialErrorView,
  CredentialList,
  CredentialLoadingView,
} from "@/features/credentials/components/credentials";
import { credentialsParamsLoader } from "@/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await credentialsParamsLoader(searchParams);
  prefetchCredentials(params);

  return (
    <CredentialContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialErrorView />}>
          <Suspense fallback={<CredentialLoadingView />}>
            <CredentialList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialContainer>
  );
};

export default Page;
