import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { getManyInputParameters } from "../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

export type PayRoll = RouterOutput["payRoll"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const payRolls = await prisma.payRoll.findMany({
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
                  designation: {
                    select: {
                      name: true,
                    },
                  },
                  department: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          paySlipComponents: {
            select: {
              componentType: {
                select: {
                  name: true,
                },
              },
              amount: true,
            },
          },
          year: true,
          month: true,
          status: {
            select: {
              id: true,
              name: true,
            },
          },
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

      const count = await prisma.payRoll.count();
      return { totalCount: count, items: payRolls };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
