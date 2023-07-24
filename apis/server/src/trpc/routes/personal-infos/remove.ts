import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const remove = adminOnlyProcedure
  .input(z.number())
  .mutation(async ({ ctx, input }) => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: input,
        },
      });

      return deletedUser;
    } catch (error) {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
