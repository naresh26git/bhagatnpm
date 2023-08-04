import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertFamilyDetailSchema = z.object({
  relationshipTypeId: z.number(),
  name: z.string(),
  dateOfBirth: z.string(),
});

export type InsertFamilyDetail = z.infer<typeof insertFamilyDetailSchema>;

export const set = employeeOnlyProcedure
  .input(insertFamilyDetailSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const familyDetail = await prisma.familyDetail.create({
        data: {
          userId: ctx.userId,
          relationshipTypeId: input.relationshipTypeId,
          name: input.name,
          dateOfBirth: new Date(input.dateOfBirth),
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          userId: true,
          relationshipType: {
            select: {
              name: true,
            },
          },
          name: true,
          dateOfBirth: true,
        },
      });
      return familyDetail;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
