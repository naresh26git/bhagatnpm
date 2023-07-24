import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const insertPayRollSchema = z.object({
  month: z.string(),
  salaryId: z.number(),
  statusId: z.number(),
});

export type InsertPayRoll = z.infer<typeof insertPayRollSchema>;

export const set = adminOnlyProcedure
  .input(insertPayRollSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const payRoll = await prisma.payRoll.create({
        data: {
          userId: ctx.userId,
          month: input.month,
          salaryId: input.salaryId,
          statusId: input.statusId,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          month: true,
          salary: {
            select: {
              amount: true,
            },
          },
          status: {
            select: {
              name: true,
            },
          },
        },
      });

      return payRoll;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
