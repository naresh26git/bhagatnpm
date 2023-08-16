import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type LeaveStatus = RouterOutput["leaveStatus"]["getMany"][0];

export const getMany = protectedProcedure.mutation(async () => {
  try {
    const leaveStatus = await prisma.leaveStatus.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return leaveStatus;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
