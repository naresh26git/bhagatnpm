import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const remove = employeeOnlyProcedure
  .input(z.number())
  .mutation(async ({ ctx, input }) => {
    try {
      const deletePersonalInfo = await prisma.personalInfo.delete({
        where: {
          id: input,
        },
      });

      return deletePersonalInfo;
    } catch (error) {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
