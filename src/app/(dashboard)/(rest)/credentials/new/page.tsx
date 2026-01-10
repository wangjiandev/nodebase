import { CredentialForm } from "@/features/credentials/components/credential";

const Page = () => (
  <div className="h-full p-4 md:px-10 md:py-6">
    <div className="mx-auto flex h-full w-full max-w-screen-md flex-col gap-y-8">
      <CredentialForm />
    </div>
  </div>
);

export default Page;
