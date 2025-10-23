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

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    id,
    name,
    description,
    onSettings,
    onDoubleClick,
    icon: Icon,
    children,
    status = "initial",
  }: BaseTriggerNodeProps) => {
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
        <NodeStatusIndicator className="rounded-l-2xl" status={status}>
          <BaseNode
            className="group relative rounded-l-2xl"
            onDoubleClick={onDoubleClick}
            status={status}
          >
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image alt={name} height={16} src={Icon} width={16} />
              ) : (
                <Icon className="size-5" />
              )}
              {children}
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

BaseTriggerNode.displayName = "BaseTriggerNode";
