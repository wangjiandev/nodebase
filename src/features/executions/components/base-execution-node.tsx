"use client";

import { type NodeProps, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode } from "react";
import { BaseHandle } from "@/components/react-flow-ui/base-handle";
import {
  BaseNode,
  BaseNodeContent,
} from "@/components/react-flow-ui/base-node";
import { WorkflowNode } from "@/components/workflow-node";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  //   status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    name,
    description,
    onSettings,
    onDoubleClick,
    icon: Icon,
    children,
  }: BaseExecutionNodeProps) => {
    const handleDelete = () => {};
    return (
      <WorkflowNode
        description={description}
        name={name}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <BaseNode onDoubleClick={onDoubleClick}>
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image alt={name} height={16} src={Icon} width={16} />
            ) : (
              <Icon className="size-5" />
            )}
            {children}
            <BaseHandle id="target-1" position={Position.Left} type="target" />
            <BaseHandle id="source-1" position={Position.Right} type="source" />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";
