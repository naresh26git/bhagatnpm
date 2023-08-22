import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    inTime: z.string(),
    outTime: z.string(),
    status: z.string(),
  })
);

export type ImportTimeSheet = RouterOutput["timeSheet"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importTimeSheet = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: statusId } = await tx.timeSheetStatus.findFirstOrThrow({
              select: {
                id: true,
              },
              where: {
                name: item.status,
              },
            });

            const { status, ...restOfItem } = item;

            const timeSheet = {
              ...restOfItem,
              inTime: new Date(item.inTime),
              outTime: new Date(item.outTime),
              statusId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.timeSheet.upsert({
              create: timeSheet,
              update: timeSheet,
              where: {
                userId_inTime_outTime: {
                  userId: timeSheet.userId,
                  inTime: timeSheet.inTime,
                  outTime: timeSheet.outTime,
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
