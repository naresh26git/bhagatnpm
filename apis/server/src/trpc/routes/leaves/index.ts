import { trpc } from "../../trpc";
import { adminUpdate } from "./admin-uppdate";
import { get } from "./get";
import { getMany } from "./get-many";
import { set } from "./set";
export const leaveRoutes = trpc.router({
  adminUpdate,
  getMany,
  get,
  set,
});
