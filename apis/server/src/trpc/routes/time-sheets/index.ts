import { trpc } from "../../trpc";
import { get } from "./get";
import { getByDate } from "./get-by-date";
import { getMany } from "./get-many";
import { set } from "./set";

export const timeSheetRoutes = trpc.router({
  getByDate,
  getMany,
  get,
  set,
});
