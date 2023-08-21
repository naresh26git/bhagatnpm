import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { importPersonalInfo } from "./import";
import { remove } from "./remove";
import { set } from "./set";

export const personalInfoRoutes = trpc.router({
  get,
  getMany,
  import: importPersonalInfo,
  remove,
  set,
});
