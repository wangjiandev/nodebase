"use client";

import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "@/features/executions/components/base-execution-node";
import { HttpRequestDialog, type HttpRequestValues } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [open, setOpen] = useState(false);
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const nodeStatus = "initial";
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleSubmit = (values: HttpRequestValues) => {
    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  return (
    <>
      <HttpRequestDialog
        defaultValues={nodeData}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        open={open}
      />
      <BaseExecutionNode
        {...props}
        description={description}
        icon={GlobeIcon}
        id={props.id}
        name="HTTP Request"
        onDoubleClick={handleOpenSettings}
        onSettings={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
