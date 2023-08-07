import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Hr = RouterOutput["hr"]["getMany"][0];

export const getManyHrParameters = z
  .object({ companyId: z.number() })
  .optional();

export type GetManyHrParameters = z.infer<typeof getManyHrParameters>;
export const getMany = protectedProcedure
  .input(getManyHrParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const hr = await prisma.hr.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          companyId: true,
        },
        where: {
          companyId: input?.companyId,
        },
      });

      return hr;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
