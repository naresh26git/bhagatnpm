import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Department = RouterOutput["department"]["getMany"][0];

export const getMany = protectedProcedure.query(async () => {
  try {
    const department = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return department;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
