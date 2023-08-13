import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertIdentificationSchema = z.object({
  number: z.string(),
  typeId: z.number(),
  imageUrl: z.string().optional(),
});

export type insertIdentification = z.infer<typeof insertIdentificationSchema>;

export const set = employeeOnlyProcedure
  .input(insertIdentificationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const identifications = await prisma.identification.create({
        data: {
          imageUrl: input.imageUrl,
          number: input.number,
          typeId: input.typeId,
          userId: ctx.userId,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          userId: true,
          imageUrl: true,
          number: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      });

      return identifications;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
