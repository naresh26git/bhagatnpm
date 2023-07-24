import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const insertDesignationSchema = z.object({
  name: z.string(),
});

export type InsertDesignation = z.infer<typeof insertDesignationSchema>;

export const set = adminOnlyProcedure
  .input(insertDesignationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const designations = await prisma.$transaction(async tx => {
        const designations = await tx.department.create({
          data: {
            name: input.name,
            createdById: ctx.userId,
            updatedById: ctx.userId,
          },
        });

        return designations;
      });

      return designations;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
