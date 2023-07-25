import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { getManyInputParameters } from "../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

export type Identification =
  RouterOutput["identification"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const identification = await prisma.identification.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          type: {
            select: {
              id: true,
              name: true,
            },
          },
          number: true,
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
      const count = await prisma.identification.count();
      return { totalCount: count, items: identification };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
