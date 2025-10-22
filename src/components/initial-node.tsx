import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "./node-selector";
import { PlaceholderNode } from "./react-flow-ui/placeholder-node";
import { WorkflowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);
  return (
    <NodeSelector onOpenChange={setOpen} open={open}>
      <WorkflowNode
        description="Click to add a node"
        name="Initial Node"
        showToolbar={false}
      >
        <PlaceholderNode {...props} onClick={() => setOpen(true)}>
          <div className="flex items-center justify-center">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
});

InitialNode.displayName = "InitialNode";

InitialNode.displayName = "InitialNode";
