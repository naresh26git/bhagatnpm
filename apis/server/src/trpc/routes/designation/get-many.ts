import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type Designation = RouterOutput["designation"]["getMany"][0];

export const getMany = protectedProcedure.query(async () => {
  try {
    const designations = await prisma.designation.findMany({
      select: {
        id: true,
        name: true,
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    return designations;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
