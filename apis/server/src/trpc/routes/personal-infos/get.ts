import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type PersonalInfo = RouterOutput["personalInfo"]["getMany"];

export const get = protectedProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    try {
      const personalInfo = await prisma.personalInfo.findUnique({
        select: {
          id: true,
          user: {
            select: {
              status: {
                select: {
                  name: true,
                },
              },
            },
          },
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          dateOfJoining: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          designation: {
            select: {
              id: true,
              name: true,
            },
          },
          reportingManager: {
            select: {
              id: true,
              name: true,
            },
          },
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

      return personalInfo;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
