import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertHelpDeskSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoryId: z.number(),
});

export type InsertHelpDesk = z.infer<typeof insertHelpDeskSchema>;

export const set = employeeOnlyProcedure
  .input(insertHelpDeskSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const status = await prisma.helpDeskStatus.findUniqueOrThrow({
        select: {
          id: true,
        },
        where: {
          name: "pending",
        },
      });

      const helpDesk = await prisma.helpDesk.create({
        data: {
          userId: ctx.userId,
          date: new Date(),
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          statusId: status.id,
          remarks: "",
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          title: true,
          description: true,
          category: {
            select: {
              name: true,
            },
          },
          status: {
            select: {
              name: true,
            },
          },
        },
      });

      return helpDesk;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
