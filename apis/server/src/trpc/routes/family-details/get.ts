import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type FamilyDetail = RouterOutput["familyDetail"]["get"];

const inputParameters = z.object({
  userId: z.number(),
  relationshipType: z.string(),
});

export const get = protectedProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const familyDetail = await prisma.familyDetail.findFirst({
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
          relationshipType: {
            select: {
              id: true,
              name: true,
            },
          },
          name: true,
          dateOfBirth: true,
        },
        where:
          ctx.role === "admin"
            ? {
                userId: input.userId,
                relationshipType: {
                  name: input.relationshipType,
                },
              }
            : {
                userId: ctx.userId,
                relationshipType: {
                  name: input.relationshipType,
                },
              },
      });
      8;

      return familyDetail;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
