import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../../db/prisma";
import { getErrorMessage } from "../../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../../trpc";

export const insertLeaveTypeSchema = z.object({
  leaveType: z.string(),
  dayAlloted: z.number(),
});

export type InsertLeaveType = z.infer<typeof insertLeaveTypeSchema>;

export const set = adminOnlyProcedure
  .input(insertLeaveTypeSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const leaveType = await prisma.leaveType.create({
        data: {
          name: input.leaveType,
          daysAlloted: input.dayAlloted,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          name: true,
          daysAlloted: true,
        },
      });

      return leaveType;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
