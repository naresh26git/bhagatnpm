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
      const qualifications = await prisma.qualification.create({
        data: {
          name: input.name,
          userId: ctx.userId,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          userId: true,
          id: true,
          name: true,
        },
      });

      return qualifications;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
