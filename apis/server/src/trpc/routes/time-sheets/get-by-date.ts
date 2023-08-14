import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { employeeOnlyProcedure } from "../../trpc";

export type TimeSheet = RouterOutput["timeSheet"]["getMany"];

export const getByDate = employeeOnlyProcedure.mutation(async ({ ctx }) => {
  try {
    const timeSheet = await prisma.timeSheet.findFirstOrThrow({
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
        inTime: true,
        outTime: true,
        status: true,
      },
      where: {
        inTime: {
          gt: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(24, 59, 59, 999)),
        },
        userId: ctx.userId,
      },
    });

    return timeSheet;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
