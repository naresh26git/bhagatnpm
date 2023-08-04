import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type RelationShip = RouterOutput["relationShip"]["getMany"][0];

export const getMany = protectedProcedure.query(async () => {
  try {
    const relationShip = await prisma.relationshipType.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return relationShip;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
