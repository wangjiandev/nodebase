import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CredentialView } from "@/features/credentials/components/credential";
import { prefetchCredential } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";

type PageProps = {
  params: Promise<{ credentialId: string }>;
};

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { credentialId } = await params;
  prefetchCredential(credentialId);
  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="mx-auto flex h-full w-full max-w-screen-md flex-col gap-y-8">
        <HydrateClient>
          <ErrorBoundary fallback={<p>error</p>}>
            <Suspense fallback={<p>loading...</p>}>
              <CredentialView id={credentialId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
};

export default Page;
