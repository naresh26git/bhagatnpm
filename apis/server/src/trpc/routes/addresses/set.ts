import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertAddressSchema = z.object({
  userId: z.number(),
  addressTypeId: z.number(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
});

export type InsertAddress = z.infer<typeof insertAddressSchema>;

export const set = employeeOnlyProcedure
  .input(insertAddressSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const address = await prisma.address.create({
        data: {
          userId: ctx.userId,
          addressTypeId: input.addressTypeId,
          street: input.street,
          city: input.city,
          state: input.state,
          country: input.country,
          pincode: input.pincode,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          userId: true,
          addressType: {
            select: {
              name: true,
            },
          },
          street: true,
          city: true,
          country: true,
          pincode: true,
          state: true,
        },
      });
      return address;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
