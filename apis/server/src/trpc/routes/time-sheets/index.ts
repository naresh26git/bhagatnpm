import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { set } from "./set";

export const timeSheetRoutes = trpc.router({
  getMany,
  get,
  set,
});
