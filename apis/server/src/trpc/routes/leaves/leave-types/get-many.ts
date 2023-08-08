import { TRPCError } from "@trpc/server";
import { prisma } from "../../../../db/prisma";
import { getErrorMessage } from "../../../../utils/get-error-message";
import { RouterOutput } from "../../../router";
import { protectedProcedure } from "../../../trpc";

export type LeaveType = RouterOutput["leaveType"]["getMany"][0];

export const getMany = protectedProcedure.query(async () => {
  try {
    const leaveType = await prisma.leaveType.findMany({
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
