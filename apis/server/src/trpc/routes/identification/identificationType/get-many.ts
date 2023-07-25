import { TRPCError } from "@trpc/server";
import { prisma } from "../../../../db/prisma";
import { getErrorMessage } from "../../../../utils/get-error-message";
import { RouterOutput } from "../../../router";
import { getManyInputParameters } from "../../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../../trpc";

export type IdentificationTypes =
  RouterOutput["identificationTypes"]["getMany"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .query(async ({ ctx, input }) => {
    try {
      const identificationTypes = await prisma.identificationType.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return identificationTypes;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
