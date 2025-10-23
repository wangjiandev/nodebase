"use client";

import type { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);
  const nodeStatus = "initial";
  const handleOpenSettings = () => {
    setOpen(true);
  };
  return (
    <>
      <ManualTriggerDialog onOpenChange={setOpen} open={open} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute Workflow'"
        onDoubleClick={handleOpenSettings}
        onSettings={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
