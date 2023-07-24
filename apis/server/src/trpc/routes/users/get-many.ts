import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type User = RouterOutput["user"]["getMany"][0];

export const getMany = protectedProcedure.query(async ({ ctx }) => {
  try {
    const employees = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        email: true,
        mobile: true,
      },
      where:
        ctx.role === "admin"
          ? { role: { name: "employee" } }
          : {
              id: ctx.userId,
            },
    });

    return employees;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
