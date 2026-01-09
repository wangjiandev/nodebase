"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/google-form-trigger";
import { BaseTriggerNode } from "../base-trigger-node";
import { fetchGoogleFormTriggerRealtimeToken } from "./actions";
import { GoogleFormTriggerDialog } from "./dialog";

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGoogleFormTriggerRealtimeToken,
  });

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
