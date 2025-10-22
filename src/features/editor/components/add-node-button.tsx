"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "@/components/node-selector";
import { Button } from "@/components/ui/button";

export const AddNodeButton = memo(() => {
  const [open, setOpen] = useState(false);
  return (
    <NodeSelector onOpenChange={setOpen} open={open}>
      <Button
        className="bg-background"
        onClick={() => setOpen(true)}
        size="icon"
        variant="outline"
      >
        <PlusIcon className="size-4" />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";
