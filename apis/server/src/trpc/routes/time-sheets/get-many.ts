import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { baseGetManyInputParameters } from "../../shared/base-get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

const sortBys = ["inTime", "outTime"] as const;

const inputParameters = baseGetManyInputParameters
  .merge(z.object({ sortBy: z.enum(sortBys).optional() }))
  .optional();

export type TimeSheet = RouterOutput["timeSheet"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const where =
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
            };

      const timeSheets = await prisma.timeSheet.findMany({
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

          inTime: true,
          outTime: true,
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
            ? { [input.sortBy]: input.sortOrder }
            : { createdAt: "desc" },
        where,
      });

      const count = await prisma.timeSheet.count({ where });

      return { totalCount: count, items: timeSheets };
    } catch (error) {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
