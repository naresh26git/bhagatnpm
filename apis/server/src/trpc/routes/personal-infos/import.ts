import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    dateOfJoining: z.string(),
    designation: z.string(),
    department: z.string(),
    reportingManagerUserId: z.number(),
  })
);

export type ImportPersonalInfo = RouterOutput["personalInfo"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importPersonalInfo = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await Promise.all(
          input.map(async (item) => {
            const { id: departmentId } = await tx.department.findFirstOrThrow({
              select: {
                id: true,
              },
              where: {
                name: item.department,
              },
            });

            const { id: designationId } = await tx.designation.findFirstOrThrow(
              {
                select: {
                  id: true,
                },
                where: {
                  name: item.designation,
                },
              }
            );

            const { department, designation, ...restOfItem } = item;

            const personalInfo = {
              ...restOfItem,
              dateOfBirth: new Date(item.dateOfBirth),
              dateOfJoining: new Date(item.dateOfJoining),
              designationId,
              departmentId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.personalInfo.upsert({
              create: personalInfo,
              update: personalInfo,
              where: {
                userId: personalInfo.userId,
              },
            });
          })
        );
      });
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
