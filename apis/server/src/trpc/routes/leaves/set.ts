import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertLeaveSchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  noOfDays: z.number(),
  remarks: z.string(),
  statusId: z.number(),
  leaveTypeId: z.number(),
});

export type InsertLeave = z.infer<typeof insertLeaveSchema>;

export const set = employeeOnlyProcedure
  .input(insertLeaveSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const leave = await prisma.leave.create({
        data: {
          userId: ctx.userId,
          fromDate: input.fromDate,
          toDate: input.toDate,
          remarks: input.remarks,
          noOfDays: input.noOfDays,
          statusId: input.statusId,
          leaveTypeId: input.leaveTypeId,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          fromDate: true,
          toDate: true,
          remarks: true,
          noOfDays: true,
          status: {
            select: {
              name: true,
            },
          },
          leaveType: {
            select: {
              name: true,
            },
          },
        },
      });
      return leave;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
