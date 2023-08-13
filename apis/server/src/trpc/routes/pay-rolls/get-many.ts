import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { baseGetManyInputParameters } from "../../shared/base-get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

const sortBy = (sortBy: string, sortOrder: "asc" | "desc") => {
  const complexSortBysMap: Record<string, unknown> = {
    statusId: { status: { name: sortOrder } },
    userId: { user: { personalInfo: { firstName: sortOrder } } },
  };

  return complexSortBysMap[sortBy] ?? { [sortBy]: sortOrder };
};

const sortBys = ["year", "month", "statusId", "userId"] as const;

const inputParameters = baseGetManyInputParameters.merge(
  z.object({
    limit: z.number().optional(),
    page: z.number().optional(),
    sortBy: z.enum(sortBys).optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
  })
);

export type PayRoll = RouterOutput["payRoll"]["getMany"]["items"][0];

export type InputParameters = z.infer<typeof inputParameters>;

export const getMany = protectedProcedure
  .input(inputParameters.optional())
  .mutation(async ({ ctx, input }) => {
    try {
      const where = {
        ...(input?.fromDate && input?.toDate
          ? {
              createdAt: {
                gte: input.fromDate,
                lt: input.toDate,
              },
            }
          : {}),
        ...(ctx.role === "admin"
          ? {
              user: {
                role: {
                  name: "employee",
                },
              },
            }
          : {
              userId: ctx.userId,
            }),
      };

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
        ...(input?.limit && input?.page
          ? {
              take: input.limit,
              skip: input.page * input.limit,
            }
          : {}),
        orderBy:
          input?.sortBy && input?.sortOrder
            ? sortBy(input.sortBy, input.sortOrder)
            : { createdAt: "desc" },
        where,
      });

      const count = await prisma.payRoll.count({ where });

      return { totalCount: count, items: payRolls };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
