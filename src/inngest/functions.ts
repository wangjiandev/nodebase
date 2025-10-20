import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ step }) => {
    // Simulate Fetching the videos
    await step.sleep("Fetching-a-videos", "5s");
    // Transcribing the videos
    await step.sleep("Transcribing-a-videos", "5s");
    // Sending transcription to openAI
    await step.sleep("Sending-to-openAI", "5s");

    await step.run("create-workflow", async () =>
      prisma.workflow.create({
        data: {
          name: "test-workflow",
        },
      })
    );
  }
);
