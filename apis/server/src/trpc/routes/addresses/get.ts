import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Address = RouterOutput["address"]["get"];

const inputParameters = z.object({
  userId: z.number(),
  addressType: z.string(),
});

export const get = protectedProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const address = await prisma.address.findFirst({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              personalInfo: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          addressType: {
            select: {
              id: true,
              name: true,
            },
          },
          city: true,
          country: true,
          pincode: true,
          state: true,
          street: true,
        },
        where:
          ctx.role === "admin"
            ? {
                userId: input.userId,
                addressType: {
                  name: input.addressType,
                },
              }
            : {
                userId: ctx.userId,
                addressType: {
                  name: input.addressType,
                },
              },
      });

      return address;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
