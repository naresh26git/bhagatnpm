import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { baseGetManyInputParameters } from "../../shared/base-get-many-input-parameters";
import { protectedProcedure } from "../../trpc";

const sortBys = ["firstName", "dateOfBirth", "dateOfJoining"] as const;

const inputParameters = baseGetManyInputParameters
  .merge(z.object({ sortBy: z.enum(sortBys).optional() }))
  .optional();

export type PersonalInfo = RouterOutput["personalInfo"]["getMany"]["items"][0];

export const getMany = protectedProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      const where =
        ctx.role === "admin"
          ? {
              user: {
                role: {
                  name: {
                    in: ["admin", "employee"],
                  },
                },
              },
            }
          : {
              userId: ctx.userId,
            };

      const personalInfos = await prisma.personalInfo.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              status: {
                select: {
                  name: true,
                },
              },
            },
          },
          imageUrl: true,
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
        where,
      });

      const count = await prisma.personalInfo.count({ where });

      return { totalCount: count, items: personalInfos };
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
