import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const insertTimeSheetSchema = z.object({
  inTime: z.string(),
  outTime: z.string(),
  statusId: z.number(),
});

export type InsertTimeSheet = z.infer<typeof insertTimeSheetSchema>;

export const set = adminOnlyProcedure
  .input(insertTimeSheetSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const timeSheet = await prisma.timeSheet.create({
        data: {
          userId: ctx.userId,
          inTime: input.inTime,
          outTime: input.outTime,
          statusId: input.statusId,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          inTime: true,
          outTime: true,

          status: {
            select: {
              name: true,
            },
          },
        },
      });
      return timeSheet;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
