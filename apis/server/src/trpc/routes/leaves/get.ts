import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Leave = RouterOutput["leave"]["getMany"];

export const get = protectedProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    try {
      const leave = await prisma.leave.findMany({
        select: {
          id: true,
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
          leaveType: {
            select: {
              id: true,
              name: true,
              daysAlloted: true,
            },
          },
          fromDate: true,
          toDate: true,
          status: true,
          remarks: true,
          noOfDays: true,
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

      return leave;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
