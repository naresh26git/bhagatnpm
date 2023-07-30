import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { getManyInputParameters } from "../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

export type PaySlip = RouterOutput["paySlip"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const paySlipFilter = await prisma.paySlip.groupBy({
        by: ["month", "year", "userId"],
        _sum: {
          amount: true,
        },
      });
      // const paySlips=await prisma.paySlip.getMany

      console.log({ paySlipFilter });
      const count = await prisma.paySlip.count();
      return { totalCount: count, items: paySlipFilter };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
