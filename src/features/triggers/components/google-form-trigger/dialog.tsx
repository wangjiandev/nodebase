"use client";

import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateGoogleFormScript } from "./utils";

type GoogleFormTriggerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const GoogleFormTriggerDialog = ({
  open,
  onOpenChange,
}: GoogleFormTriggerDialogProps) => {
  const params = useParams();
  const workflowId = params.workflowId;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/workflows/google-form?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy webhook URL to clipboard.");
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Form Trigger</DialogTitle>
          <DialogDescription>
            Configure the Google Form trigger for your workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                className="font-mono text-sm"
                id="webhook-url"
                readOnly
                value={webhookUrl}
              />
              <Button
                onClick={copyToClipboard}
                size="icon"
                type="button"
                variant="outline"
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <h4 className="font-medium text-sm">Setup Instructions</h4>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground text-sm">
              <li>Open your Google Form</li>
              <li>Click the three dots menu - script editor</li>
              <li>Copy and paste the script below</li>
              <li>Replace WEBHOOK_URL with your webhook URL above</li>
              <li>Save and click "Trigger" - add trigger</li>
              <li>Choose: From form - on form submit - Save</li>
            </ol>
          </div>
          <div className="space-y-3 rounded-lg bg-muted p-4">
            <h4 className="font-medium text-sm">Google Apps Script:</h4>
            <Button
              onClick={async () => {
                const script = generateGoogleFormScript(webhookUrl);
                try {
                  await navigator.clipboard.writeText(script);
                  toast.success("Google Apps Script copied to clipboard!");
                } catch {
                  toast.error(
                    "Failed to copy Google Apps Script to clipboard."
                  );
                }
              }}
              type="button"
              variant="outline"
            >
              <CopyIcon className="mr-2 size-4" /> Copy Google Apps Script
            </Button>
            <p className="text-muted-foreground text-xs">
              This script includes the necessary code to trigger your workflow
              when the form is submitted.
            </p>
          </div>
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <h4 className="font-medium text-sm">Available Variables:</h4>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>
                <code className="rounded bg-background px-1 py-0.5">
                  {"{{googleForm.respondentEmail}}"}
                </code>
                - Respondent's email
              </li>
              <li>
                <code className="rounded bg-background px-1 py-0.5">
                  {"{{googleForm.response['Question Name']}}"}
                </code>
                - Specific answer
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
