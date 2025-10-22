"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data } = useSuspenseWorkflow(workflowId);
  return <div>Editor: {data.name}</div>;
};

export const EditorLoadingView = () => (
  <LoadingView message="Loading editor..." />
);

export const EditorErrorView = () => (
  <ErrorView message="Error loading editor..." />
);
