"use client";

import { useAtomValue } from "jotai";
import { SaveIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useSuspenseWorkflow,
  useUpdateWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";
import { editorAtom } from "../store/atoms";

export const EditorBreadcrumb = ({ workflowId }: { workflowId: string }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/workflows">workflows</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <EditorNameInput workflowId={workflowId} />
    </BreadcrumbList>
  </Breadcrumb>
);

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const editor = useAtomValue(editorAtom);
  const updateWorkflow = useUpdateWorkflow();

  const handleSave = async () => {
    if (!editor) return;
    const nodes = editor.getNodes();
    const edges = editor.getEdges();
    await updateWorkflow.mutateAsync({ id: workflowId, nodes, edges });
  };

  return (
    <div className="ml-auto">
      <Button
        disabled={updateWorkflow.isPending}
        onClick={handleSave}
        size="sm"
      >
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data } = useSuspenseWorkflow(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.name) {
      setName(data.name);
    }
  }, [data.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === data.name) {
      setIsEditing(false);
      return;
    }
    try {
      await updateWorkflowName.mutateAsync({ id: workflowId, name });
      setIsEditing(false);
    } catch {
      setName(data.name);
      toast.error("Failed to update workflow name");
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(data.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <BreadcrumbItem>
        <Input
          className="rounded-none"
          disabled={updateWorkflowName.isPending}
          onBlur={handleSave}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          type="text"
          value={name}
        />
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem
      className="cursor-pointer transition-colors hover:text-foreground"
      onClick={() => setIsEditing(true)}
    >
      <BreadcrumbPage>{data.name}</BreadcrumbPage>
    </BreadcrumbItem>
  );
};

export const EditorHeader = ({ workflowId }: { workflowId: string }) => (
  <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background px-4">
    <SidebarTrigger />
    <div className="flex h-full w-full flex-row items-center justify-between gap-x-4">
      <EditorBreadcrumb workflowId={workflowId} />
      <EditorSaveButton workflowId={workflowId} />
    </div>
  </header>
);
