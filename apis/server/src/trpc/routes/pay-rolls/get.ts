import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type PayRoll = RouterOutput["payRoll"]["getMany"];

export const get = protectedProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    try {
      const payRoll = await prisma.payRoll.findMany({
        select: {
          id: true,
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          month: true,
          salary: {
            select: {
              id: true,
              amount: true,
            },
          },
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

      return payRoll;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
