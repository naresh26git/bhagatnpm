import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type HelpDeskCategory = RouterOutput["helpDeskCategories"]["getMany"][0];

export const getMany = protectedProcedure.mutation(async () => {
  try {
    const helpDeskCategory = await prisma.helpDeskCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return helpDeskCategory;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
