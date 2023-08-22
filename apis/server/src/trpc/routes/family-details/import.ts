import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    relationShipType: z.string(),
    name: z.string(),
    dateOfBirth: z.string(),
  })
);

export type ImportFamilyDetail = RouterOutput["familyDetail"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importFamilyDetail = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: relationshipTypeId } =
              await tx.relationshipType.findFirstOrThrow({
                select: {
                  id: true,
                },
                where: {
                  name: item.relationShipType,
                },
              });

            const { relationShipType, ...restOfItem } = item;

            const familyDetail = {
              ...restOfItem,
              dateOfBirth: new Date(item.dateOfBirth),
              relationshipTypeId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.familyDetail.upsert({
              create: familyDetail,
              update: familyDetail,
              where: {
                userId_relationshipTypeId_name: {
                  userId: familyDetail.userId,
                  relationshipTypeId,
                  name: familyDetail.name,
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
