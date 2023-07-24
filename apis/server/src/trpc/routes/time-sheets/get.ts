import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type TimeSheet = RouterOutput["timeSheet"]["getMany"];

export const get = protectedProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    try {
      const timeSheet = await prisma.timeSheet.findMany({
        select: {
          id: true,
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
          inTime: true,
          outTime: true,
          status: true,
        },
        where:
          ctx.role === "admin"
            ? {
                userId: input,
              }
            : {
                userId: ctx.userId,
              },
      });

      return timeSheet;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
