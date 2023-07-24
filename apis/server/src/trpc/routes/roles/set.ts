import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";

export const insertRoleSchema = z.object({
  roleName: z.string(),
});

export type InsertRole = z.infer<typeof insertRoleSchema>;

export const set = adminOnlyProcedure
  .input(insertRoleSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const role = await prisma.role.create({
        data: {
          name: input.roleName,
          createdById: ctx.userId,
          updatedById: ctx.userId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return role;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
