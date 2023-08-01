import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { adminOnlyProcedure } from "../../trpc";
export const insertLeaveStatus = z.object({
  id: z.number(),

  remarks: z.string(),
  statusId: z.number(),
});

export type InsertLeaveStatus = z.infer<typeof insertLeaveStatus>;

export const adminUpdate = adminOnlyProcedure
  .input(insertLeaveStatus)
  .mutation(async ({ ctx, input }) => {
    try {
      const leave = await prisma.leave.update({
        where: { id: input.id },
        data: {
          remarks: input.remarks,
          statusId: input.statusId,
        },
      });

      return leave;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
