import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    number: z.string(),
    type: z.string(),
  })
);

export type ImportIdentification = RouterOutput["identification"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importIdentification = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {});
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
