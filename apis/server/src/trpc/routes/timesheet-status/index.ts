import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const timeSheetStatusRoutes = trpc.router({
  getMany,
});
