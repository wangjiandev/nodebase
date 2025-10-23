"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  MiniMap,
  type Node,
  type NodeChange,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

import "@xyflow/react/dist/style.css";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { nodeComponents } from "@/config/node-components";
import { editorAtom } from "../store/atoms";
import { AddNodeButton } from "./add-node-button";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data } = useSuspenseWorkflow(workflowId);

  const setEditor = useSetAtom(editorAtom);

  const [nodes, setNodes] = useState<Node[]>(data.nodes);
  const [edges, setEdges] = useState<Edge[]>(data.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="size-full">
      <ReactFlow
        edges={edges}
        fitView
        nodes={nodes}
        nodeTypes={nodeComponents}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onInit={setEditor}
        onNodesChange={onNodesChange}
        // panOnDrag={false}
        // panOnScroll
        proOptions={{
          hideAttribution: true,
        }}
        // selectionOnDrag
        // snapGrid={[10, 10]}
        // snapToGrid
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export const EditorLoadingView = () => (
  <LoadingView message="Loading editor..." />
);

export const EditorErrorView = () => (
  <ErrorView message="Error loading editor..." />
);
