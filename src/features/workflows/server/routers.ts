import { generateSlug } from "random-word-slugs";
import z from "zod";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

const WORKFLOW_NAME_WORD_COUNT = 3;

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(({ ctx }) =>
    prisma.workflow.create({
      data: {
        name: generateSlug(WORKFLOW_NAME_WORD_COUNT),
        userId: ctx.auth.user.id,
      },
    })
  ),
  remove: protectedProcedure
    .input(z.object({ id: z.string("workflow id cannot be empty") }))
    .mutation(({ ctx, input }) =>
      prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      })
    ),
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string("update workflow error"),
        name: z.string().min(1, "workflow name cannot be empty"),
      })
    )
    .mutation(({ ctx, input }) =>
      prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      })
    ),
  getById: protectedProcedure
    .input(z.object({ id: z.string("workflow id cannot be empty") }))
    .query(({ ctx, input }) =>
      prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      })
    ),
  getAll: protectedProcedure.query(({ ctx }) =>
    prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    })
  ),
});
