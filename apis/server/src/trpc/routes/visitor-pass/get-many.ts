import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { getManyInputParameters } from "../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

export type VisitorPass = RouterOutput["visitorPass"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const visitorPass = await prisma.visitorPass.findMany({
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
          // status: {
          //   select: {
          //     id: true,
          //     name: true,
          //   },
          // },
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
      return { totalCount: count, items: visitorPass };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
