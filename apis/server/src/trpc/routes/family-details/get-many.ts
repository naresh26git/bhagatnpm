import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { getManyInputParameters } from "../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

export type FamilyDetail = RouterOutput["familyDetail"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const familyDetails = await prisma.familyDetail.findMany({
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
        take: input?.limit ?? 5,
        skip: (input?.page ?? 0) * (input?.limit ?? 5),
        orderBy:
          input?.sortBy && input?.sortOrder
            ? {
                [input.sortBy]: input.sortOrder,
              }
            : {
                createdAt: "desc",
              },
        where:
          ctx.role === "admin"
            ? {
                user: {
                  role: {
                    name: "employee",
                  },
                },
              }
            : {
                userId: ctx.userId,
              },
      });

      const count = await prisma.familyDetail.count();
      return { totalCount: count, items: familyDetails };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
