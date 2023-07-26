import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertQualificationSchema = z.object({
  name: z.string(),
});

export type InsertQualification = z.infer<typeof insertQualificationSchema>;

export const set = employeeOnlyProcedure
  .input(insertQualificationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const qualification = await prisma.qualification.create({
        data: {
          userId: ctx.userId,
          name: input.name,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          name: true,
        },
      });

      return qualification;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
