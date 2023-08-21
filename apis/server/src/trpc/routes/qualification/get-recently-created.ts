import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Qualification = RouterOutput["qualification"]["getRecentlyCreated"];

export const getRecentlyCreated = protectedProcedure
  .input(z.number())
  .mutation(async ({ ctx, input }) => {
    try {
      const qualification = await prisma.qualification.findFirst({
        select: {
          id: true,
          user: {
            select: {
              personalInfo: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          name: true,
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

      return qualification;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
