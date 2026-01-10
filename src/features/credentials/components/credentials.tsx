"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { CredentialType } from "@/generated/prisma/enums";
import { useEntitySearch } from "@/hooks/use-entity-search";
import {
  useDeleteCredential,
  useSuspenseCredentials,
} from "../hooks/use-credentials";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import type { CredentialsGetMany } from "../types";

export const CredentialList = () => {
  const credentials = useSuspenseCredentials();
  return (
    <EntityList
      emptyView={<CredentialEmptyView />}
      getKey={(credential) => credential.id}
      items={credentials.data.items}
      renderItem={(credential) => <CredentialItem credential={credential} />}
    />
  );
};

const credentialLogos: Record<CredentialType, string> = {
  [CredentialType.DEEPSEEK]: "/deepseek.svg",
  [CredentialType.OPENAI]: "/openai.svg",
  [CredentialType.GEMINI]: "/gemini.svg",
};

export const CredentialItem = ({
  credential,
}: {
  credential: CredentialsGetMany;
}) => {
  const deleteCredential = useDeleteCredential();

  const deleteHandler = () => {
    deleteCredential.mutate({ id: credential.id });
  };

  const logo = credentialLogos[credential.type];

  return (
    <EntityItem
      href={`/credentials/${credential.id}`}
      image={
        <div className="flex size-8 items-center justify-center">
          <Image alt={credential.type} height={20} src={logo} width={20} />
        </div>
      }
      isRemoving={deleteCredential.isPending}
      onRemove={deleteHandler}
      subtitle={`Updated ${formatDistanceToNow(credential.updatedAt, { addSuffix: true })} - Created ${formatDistanceToNow(credential.createdAt, { addSuffix: true })}`}
      title={credential.name}
    />
  );
};

export const CredentialHeader = ({ disabled }: { disabled: boolean }) => (
  <EntityHeader
    description="Create and Manage your Credentials"
    disabled={disabled}
    newButtonHref="/credentials/new"
    newButtonLabel="New Credential"
    title="Credentials"
  />
);

export const CredentialContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <EntityContainer
      header={<CredentialHeader disabled={false} />}
      pagination={<CredentialPagination />}
      search={<CredentialSearch />}
    >
      {children}
    </EntityContainer>
  </>
);

export const CredentialSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      onChange={onSearchChange}
      placeholder="Search Workflows"
      value={searchValue}
    />
  );
};

export const CredentialPagination = () => {
  const [params, setParams] = useCredentialsParams();
  const { data, isPending } = useSuspenseCredentials();
  return (
    <EntityPagination
      disabled={isPending}
      onPageChange={(page) => setParams({ ...params, page })}
      page={data.page}
      totalPages={data.totalPages}
    />
  );
};

export const CredentialLoadingView = () => (
  <LoadingView message="Loading credentials..." />
);

export const CredentialErrorView = () => (
  <ErrorView message="Error loading credentials..." />
);

export const CredentialEmptyView = () => {
  const router = useRouter();

  const createHandler = () => {
    router.push("/credentials/new");
  };
  return (
    <EmptyView
      message="No credentials found. You haven't created any credentials yet."
      onNew={createHandler}
    />
  );
};
