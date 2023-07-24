import { TRPCError } from "@trpc/server";
import { prisma } from "../../../../db/prisma";
import { getErrorMessage } from "../../../../utils/get-error-message";
import { RouterOutput } from "../../../router";
import { getManyInputParameters } from "../../../shared/get-many-input-parameters";
import { protectedProcedure } from "../../../trpc";

export type LeaveType = RouterOutput["leaveType"]["getMany"][0];

export const getMany = protectedProcedure
  .input(getManyInputParameters)
  .query(async ({ ctx, input }) => {
    try {
      const leaveType = await prisma.leaveType.findMany({
        select: {
          id: true,
          name: true,
          daysAlloted: true,
        },
        take: input?.limit ?? 5,
        skip: (input?.page ?? 0) * (input?.limit ?? 5),
        orderBy:
          input?.sortBy && input?.sortOrder
            ? { [input.sortBy]: input.sortOrder }
            : { createdAt: "desc" },
      });

      return leaveType;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
