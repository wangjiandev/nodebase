"use client";

import { Handle, type NodeProps, Position } from "@xyflow/react";
import { forwardRef, type ReactNode } from "react";

import { BaseNode } from "@/components/react-flow-ui/base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
  onClick?: () => void;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
  ({ children, onClick }, ref) => (
    <BaseNode
      className="h-auto w-auto cursor-pointer border-gray-400 border-dashed bg-card p-4 text-center text-gray-400 shadow-none hover:border-gray-500 hover:bg-gray-50"
      onClick={onClick}
      ref={ref}
    >
      {children}
      <Handle
        isConnectable={false}
        position={Position.Top}
        style={{ visibility: "hidden" }}
        type="target"
      />
      <Handle
        isConnectable={false}
        position={Position.Bottom}
        style={{ visibility: "hidden" }}
        type="source"
      />
    </BaseNode>
  )
);

PlaceholderNode.displayName = "PlaceholderNode";
