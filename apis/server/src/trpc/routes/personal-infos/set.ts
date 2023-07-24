import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { employeeOnlyProcedure } from "../../trpc";

export const insertPersonalInfoSchema = z.object({
  userId: z.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  dateOfJoining: z.string(),
  departmentId: z.number(),
  designationId: z.number(),
  reportingManagerId: z.number(),
});

export type insertPersonalInfo = z.infer<typeof insertPersonalInfoSchema>;

export const set = employeeOnlyProcedure
  .input(insertPersonalInfoSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const personalInfo = await prisma.personalInfo.create({
        data: {
          userId: ctx.userId,
          firstName: input.firstName,
          middleName: input.middleName,
          lastName: input.lastName,
          dateOfBirth: input.dateOfBirth,
          dateOfJoining: input.dateOfJoining,
          createdById: ctx.userId,
          updatedById: ctx.userId,
          departmentId: input.departmentId,
          designationId: input.designationId,
          reportingManagerUserId: input.reportingManagerId,
        },
        select: {
          id: true,
          userId: true,
          firstName: true,
          middleName: true,
          lastName: true,
          dateOfBirth: true,
          dateOfJoining: true,
          department: {
            select: {
              name: true,
            },
          },
          designation: {
            select: {
              name: true,
            },
          },
          reportingManager: {
            select: {
              name: true,
            },
          },
        },
      });

      return personalInfo;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
