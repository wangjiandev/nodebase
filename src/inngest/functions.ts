import { inngest } from "./client";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" },
  async ({ step }) => {
    await step.sleep("test", "5s");
  }
);
