"use client";

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
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";

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

export const EditorSaveButton = () => (
  <div className="ml-auto">
    <Button size="sm" variant="ghost">
      <SaveIcon className="size-4" />
      Save
    </Button>
  </div>
);

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
      <EditorSaveButton />
    </div>
  </header>
);
