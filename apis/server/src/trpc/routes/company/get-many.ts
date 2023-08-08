import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Company = RouterOutput["company"]["getMany"][0];

export const getMany = protectedProcedure.query(async ({ ctx, input }) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return companies;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
