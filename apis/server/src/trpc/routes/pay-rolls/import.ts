import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

const inputParameters = z.array(
  z.object({
    userId: z.number(),
    year: z.number(),
    month: z.number(),
    status: z.string(),
    componentType: z.string(),
    amount: z.number(),
  })
);

export type ImportPaySlipComponent = RouterOutput["payRoll"]["import"];

export type InputParameters = z.infer<typeof inputParameters>;

export const importPaySlipComponent = adminOnlyProcedure
  .input(inputParameters)
  .mutation(async ({ ctx, input }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        const componentTypes = await tx.paySlipComponentType.findMany({
          select: { id: true, name: true },
        });

        const componentTypesMap = new Map(
          componentTypes.map((componentType) => [
            componentType.name,
            componentType.id,
          ])
        );

        const statuses = await tx.payRollStatus.findMany({
          select: { id: true, name: true },
        });

        const statusesMap = new Map(
          statuses.map((status) => [status.name, status.id])
        );

        if (
          input
            .map((item) => componentTypesMap.get(item.componentType))
            .filter((item) => item === undefined).length > 0
        )
          throw new TRPCError({ code: "BAD_REQUEST" });

        if (
          input
            .map((item) => statusesMap.get(item.status))
            .filter((item) => item === undefined).length > 0
        )
          throw new TRPCError({ code: "BAD_REQUEST" });

        await tx.importPaySlipComponent.createMany({
          data: input.map((item) => ({
            userId: item.userId,
            amount: item.amount,
            year: item.year,
            month: item.month,
            statusId: statusesMap.get(item.status)!,
            componentTypeId: componentTypesMap.get(item.componentType)!,
          })),
        });

        const payRolls = await tx.importPaySlipComponent.findMany({
          select: {
            userId: true,
            year: true,
            month: true,
            statusId: true,
          },
          distinct: ["userId", "year", "month"],
        });

        const payRollIds = await Promise.all(
          payRolls.map((payRoll) => {
            const payRollWithAuditFields = {
              ...payRoll,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            return tx.payRoll.upsert({
              create: payRollWithAuditFields,
              update: payRollWithAuditFields,
              where: {
                userId_year_month: {
                  userId: payRoll.userId,
                  year: payRoll.year,
                  month: payRoll.month,
                },
              },
              select: {
                id: true,
                userId: true,
                year: true,
                month: true,
              },
            });
          })
        );

        const payRollIdsMap = new Map(
          payRollIds.map((item) => [
            `${item.userId}-${item.year}-${item.month}`,
            item.id,
          ])
        );

        const importPaySlipComponents =
          await tx.importPaySlipComponent.findMany({
            select: {
              amount: true,
              componentTypeId: true,
              year: true,
              month: true,
              userId: true,
            },
          });

        await Promise.all(
          importPaySlipComponents.map(async (importPaySlipComponent) => {
            const payRollId = payRollIdsMap.get(
              `${importPaySlipComponent.userId}-${importPaySlipComponent.year}-${importPaySlipComponent.month}`
            )!;

            const paySlipComponent = {
              amount: importPaySlipComponent.amount,
              componentTypeId: importPaySlipComponent.componentTypeId,
              payRollId,
              createdById: ctx.userId,
              updatedById: ctx.userId,
            };

            await tx.paySlipComponent.upsert({
              create: paySlipComponent,
              update: paySlipComponent,
              where: {
                componentTypeId_payRollId: {
                  componentTypeId: importPaySlipComponent.componentTypeId,
                  payRollId,
                },
              },
            });
          })
        );

        await tx.importPaySlipComponent.deleteMany();
      });
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
