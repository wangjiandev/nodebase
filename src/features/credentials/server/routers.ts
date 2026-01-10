import z from "zod";
import { PAGINATION } from "@/config/constants";
import { CredentialType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const credentialsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        value: z.string().min(1, "Value is required"),
        type: z.enum(CredentialType),
      })
    )
    .mutation(({ ctx, input }) => {
      const { name, value, type } = input;
      return prisma.credential.create({
        data: {
          name,
          value,
          type,
          userId: ctx.auth.user.id,
        },
      });
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string("credential id cannot be empty") }))
    .mutation(({ ctx, input }) =>
      prisma.credential.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      })
    ),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
        value: z.string().min(1, "Value is required"),
        type: z.enum(CredentialType),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, name, value, type } = input;
      return prisma.credential.update({
        where: {
          id,
          userId: ctx.auth.user.id,
        },
        data: {
          name,
          value,
          type,
        },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      prisma.credential.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      })
    ),
  getByType: protectedProcedure
    .input(z.object({ type: z.enum(CredentialType) }))
    .query(({ ctx, input }) =>
      prisma.credential.findMany({
        where: {
          type: input.type,
          userId: ctx.auth.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
    ),
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE).optional(),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE)
          .optional(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        page = PAGINATION.DEFAULT_PAGE,
        pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
        search,
      } = input;

      const [items, totalCount] = await Promise.all([
        prisma.credential.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.credential.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search ?? "",
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
