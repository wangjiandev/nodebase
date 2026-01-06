"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { GoogleFormTriggerDialog } from "./dialog";

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);
  const nodeStatus = "initial";
  const handleOpenSettings = () => setOpen(true);
  return (
    <>
      <GoogleFormTriggerDialog onOpenChange={setOpen} open={open} />
      <BaseTriggerNode
        {...props}
        description="When form is submitted"
        icon="/googleform.svg"
        name="Google Form"
        onDoubleClick={handleOpenSettings}
        onSettings={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

GoogleFormTrigger.displayName = "GoogleFormTrigger";
