import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    name: z.string(),
  })
);

export type ImportQualification = RouterOutput["qualification"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importQualification = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map((item) => {
            const qualification = {
              ...item,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };
            return tx.qualification.upsert({
              create: qualification,
              update: qualification,
              where: {
                name_userId: {
                  name: item.name,
                  userId: item.userId,
                },
              },
            });
          })
        );
      });
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
