import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

type WorkflowNodeProps = {
  children: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
};

export const WorkflowNode = ({
  children,
  showToolbar = true,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodeProps) => (
  <>
    {showToolbar && (
      <NodeToolbar>
        <Button onClick={onSettings} size="sm" variant="ghost">
          <SettingsIcon className="size-4" />
        </Button>
        <Button onClick={onDelete} size="sm" variant="ghost">
          <TrashIcon className="size-4" />
        </Button>
      </NodeToolbar>
    )}
    {children}
    {name && (
      <NodeToolbar
        className="max-w-[200px] text-center"
        isVisible
        position={Position.Bottom}
      >
        <p className="font-medium">{name}</p>
        {description && (
          <p className="truncate text-muted-foreground text-sm">
            {description}
          </p>
        )}
      </NodeToolbar>
    )}
  </>
);
