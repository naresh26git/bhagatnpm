import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterInput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

export const roles = ["admin", "employee"] as const;

export const insertUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(3).max(20),
  mobile: z.string().min(10).optional(),
  email: z.string().min(5).optional(),
  role: z.enum(roles),
});

export const hashSalt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = RouterInput["user"]["set"];

export const set = adminOnlyProcedure
  .input(insertUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const hashedPassword = await hashSalt(input.password);

      const user = await prisma.$transaction(async (tx) => {
        const { id: roleId } = await tx.role.findUniqueOrThrow({
          select: {
            id: true,
          },
          where: {
            name: input.role,
          },
        });

        const { id: activeStatusId } = await tx.userStatus.findUniqueOrThrow({
          select: { id: true },
          where: { name: "active" },
        });

        const user = await tx.user.create({
          data: {
            name: input.name,
            password: hashedPassword,
            username: input.username,
            mobile: input.mobile,
            email: input.email,
            roleId,
            statusId: activeStatusId,
          },
          select: {
            id: true,
            name: true,
            username: true,
            role: {
              select: {
                name: true,
              },
            },
            email: true,
            mobile: true,
          },
        });

        return user;
      });

      return user;
    } catch (error) {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
