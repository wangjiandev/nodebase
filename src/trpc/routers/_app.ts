import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  textAi: protectedProcedure.mutation(async () => {
    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });
    return { text };
  }),
  getWorkflows: protectedProcedure.query(
    async () => await prisma.workflow.findMany()
  ),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "wangjian0504@gmail.com",
      },
    });

    return {
      success: true,
      message: "Workflow creation started",
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
