import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { baseGetManyInputParameters } from "../../shared/base-get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

const sortBys = ["name", "date", "inTime", "outTime", "fromPlace"] as const;

const inputParameters = baseGetManyInputParameters
  .merge(z.object({ sortBy: z.enum(sortBys).optional() }))
  .optional();

export type VisitorPass = RouterOutput["visitorPass"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const visitorPasses = await prisma.visitorPass.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
          fromPlace: true,
          mobileNumber: true,
          date: true,
          inTime: true,
          outTime: true,
          reason: true,
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          hr: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
              companyId: true,
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
      });

      const count = await prisma.visitorPass.count();

      return { totalCount: count, items: visitorPasses };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
