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
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: typeId } = await tx.identificationType.findFirstOrThrow(
              {
                select: {
                  id: true,
                },
                where: {
                  name: item.type,
                },
              }
            );

            const { type, ...restOfItem } = item;

            const identification = {
              ...restOfItem,

              typeId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.identification.upsert({
              create: identification,
              update: identification,
              where: {
                userId_typeId: {
                  userId: identification.userId,
                  typeId,
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
