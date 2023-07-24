import { z } from "zod";

export const getManyInputParameters = z
  .object({
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    limit: z.number(),
    page: z.number(),
  })
  .optional();

export type GetManyInputParameters = z.infer<typeof getManyInputParameters>;
