import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const inputDesignationSchema = z.object({
  departmentId: z.number(),
  name: z.string(),
});

export type InsertDesignation = z.infer<typeof inputDesignationSchema>;

export const set = adminOnlyProcedure
  .input(inputDesignationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const designation = await prisma.designation.create({
        data: {
          departmentId: input.departmentId,
          name: input.name,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          department: {
            select: {
              name: true,
            },
          },
          name: true,
        },
      });
      return designation;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
