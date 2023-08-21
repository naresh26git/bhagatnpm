import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    dateOfJoining: z.string(),
    designation: z.string(),
    department: z.string(),
    reportingManagerId: z.number(),
  })
);

export type ImportPersonalInfo = RouterOutput["personalInfo"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importPersonalInfo = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {});
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
