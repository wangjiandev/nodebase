"use client";

import { type NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode } from "react";
import { BaseHandle } from "@/components/react-flow-ui/base-handle";
import {
  BaseNode,
  BaseNodeContent,
} from "@/components/react-flow-ui/base-node";
import {
  type NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flow-ui/node-status-indicator";
import { WorkflowNode } from "@/components/workflow-node";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    id,
    name,
    description,
    onSettings,
    onDoubleClick,
    icon: Icon,
    children,
    status = "initial",
  }: BaseExecutionNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();
    const handleDelete = () => {
      setNodes((nodes) => {
        const updatedNodes = nodes.filter((node) => node.id !== id);
        return updatedNodes;
      });

      setEdges((edges) => {
        const updatedEdges = edges.filter(
          (edge) => edge.source !== id && edge.target !== id
        );
        return updatedEdges;
      });
    };
    return (
      <WorkflowNode
        description={description}
        name={name}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <NodeStatusIndicator status={status}>
          <BaseNode onDoubleClick={onDoubleClick} status={status}>
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image alt={name} height={16} src={Icon} width={16} />
              ) : (
                <Icon className="size-5" />
              )}
              {children}
              <BaseHandle
                id="target-1"
                position={Position.Left}
                type="target"
              />
              <BaseHandle
                id="source-1"
                position={Position.Right}
                type="source"
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";
