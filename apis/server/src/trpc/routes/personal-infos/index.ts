import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { remove } from "./remove";
import { set } from "./set";
export const personalInfoRoutes = trpc.router({
  getMany,
  set,
  get,
  remove,
});
