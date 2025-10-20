import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { inngest } from "./client";

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
});

export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ step }) => {
    const { steps } = await step.ai.wrap(
      "deepseek-generate-text",
      generateText,
      {
        model: deepseek("deepseek-chat"),
        system: "You are a helpful assistant.",
        prompt: "What is 2+2 ?",
      }
    );
    return steps;
  }
);
