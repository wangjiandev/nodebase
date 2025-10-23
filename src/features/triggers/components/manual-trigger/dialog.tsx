"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ManualTriggerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ManualTriggerDialog = ({
  open,
  onOpenChange,
}: ManualTriggerDialogProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Manual Trigger</DialogTitle>
        <DialogDescription>
          Configure the manual trigger for your workflow.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="text-muted-foreground text-sm">Manual Trigger</p>
      </div>
    </DialogContent>
  </Dialog>
);
