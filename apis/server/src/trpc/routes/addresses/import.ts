import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    addressType: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
  })
);

export type ImportAddress = RouterOutput["address"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importAddress = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: addressTypeId } = await tx.addressType.findFirstOrThrow(
              {
                select: {
                  id: true,
                },
                where: {
                  name: item.addressType,
                },
              }
            );

            const { addressType, ...restOfItem } = item;

            const address = {
              ...restOfItem,
              addressTypeId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.address.upsert({
              create: address,
              update: address,
              where: {
                userId_addressTypeId: {
                  userId: address.userId,
                  addressTypeId,
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
