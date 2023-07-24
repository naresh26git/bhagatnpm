import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { set } from "./set";

export const addressRoutes = trpc.router({
  getMany,
  get,
  set,
});
