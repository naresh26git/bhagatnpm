import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const helpdeskCategoryRoutes = trpc.router({
  getMany,
});
