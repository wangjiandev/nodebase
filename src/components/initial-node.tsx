import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { PlaceholderNode } from "./react-flow-ui/placeholder-node";
import { WorkflowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => (
  <WorkflowNode
    description="Click to add a node"
    name="Initial Node"
    showToolbar={false}
  >
    <PlaceholderNode {...props}>
      <div className="flex items-center justify-center">
        <PlusIcon className="size-4" />
      </div>
    </PlaceholderNode>
  </WorkflowNode>
));

InitialNode.displayName = "InitialNode";

InitialNode.displayName = "InitialNode";
