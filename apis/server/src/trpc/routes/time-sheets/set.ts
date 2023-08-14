import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertTimeSheetSchema = z.object({
  inTime: z.date().optional(),
  outTime: z.date().optional(),
});

export type InsertTimeSheet = z.infer<typeof insertTimeSheetSchema>;

export const set = employeeOnlyProcedure
  .input(insertTimeSheetSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { id: presentStatusId } =
        await prisma.timeSheetStatus.findFirstOrThrow({
          select: { id: true },
          where: {
            name: "present",
          },
        });

      if (input.outTime) {
        const { id: timeSheetId } = await prisma.timeSheet.findFirstOrThrow({
          select: {
            id: true,
          },
          where: {
            inTime: {
              gt: new Date(new Date().setHours(0, 0, 0, 0)),
              lte: new Date(new Date().setHours(24, 59, 59, 999)),
            },
            userId: ctx.userId,
          },
        });

        const timeSheet = await prisma.timeSheet.update({
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
          data: {
            outTime: input.outTime,
          },
          where: {
            id: timeSheetId,
          },
        });

        return timeSheet;
      }

      const timeSheet = await prisma.timeSheet.create({
        data: {
          userId: ctx.userId,
          inTime: input.inTime ? input.inTime : null,
          outTime: input.outTime ? input.outTime : null,
          statusId: presentStatusId,
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
