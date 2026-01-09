"use client";

import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "@/features/executions/components/base-execution-node";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiRealtimeToken } from "./actions";
import {
  AVAILABLE_MODELS,
  GeminiDialog,
  type GeminiFormValues,
} from "./dialog";

type GeminiNodeData = {
  variableName?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
  const [open, setOpen] = useState(false);
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GEMINI_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGeminiRealtimeToken,
  });
  const description = nodeData?.userPrompt
    ? `${nodeData.model || AVAILABLE_MODELS[0]}: ${nodeData.userPrompt.slice(0, 30)}...`
    : "Not configured";

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleSubmit = (values: GeminiFormValues) => {
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
      <GeminiDialog
        defaultValues={nodeData}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        open={open}
      />
      <BaseExecutionNode
        {...props}
        description={description}
        icon="/gemini.svg"
        id={props.id}
        name="Gemini"
        onDoubleClick={handleOpenSettings}
        onSettings={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

GeminiNode.displayName = "GeminiNode";
