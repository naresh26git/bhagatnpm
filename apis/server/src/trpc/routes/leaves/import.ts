import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    fromDate: z.string(),
    toDate: z.string(),
    noOfDays: z.number(),
    leaveType: z.string(),
    remarks: z.string().optional(),
    status: z.string(),
  })
);

export type ImportLeave = RouterOutput["leave"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importLeave = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: statusId } = await tx.leaveStatus.findFirstOrThrow({
              select: {
                id: true,
              },
              where: {
                name: item.status,
              },
            });

            const { id: leaveTypeId } = await tx.leaveType.findFirstOrThrow({
              select: {
                id: true,
              },
              where: {
                name: item.leaveType,
              },
            });

            const { status, leaveType, ...restOfItem } = item;

            const leave = {
              ...restOfItem,
              fromDate: new Date(item.fromDate),
              toDate: new Date(item.toDate),
              statusId,
              leaveTypeId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.leave.upsert({
              create: leave,
              update: leave,
              where: {
                userId_leaveTypeId_fromDate_toDate_noOfDays: {
                  userId: leave.userId,
                  leaveTypeId,
                  fromDate: leave.fromDate,
                  toDate: leave.toDate,
                  noOfDays: leave.noOfDays,
                },
              },
            });
          })
        );
      });
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
