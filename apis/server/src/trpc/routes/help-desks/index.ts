import { trpc } from "../../trpc";
import { getMany } from "./get-many";
import { set } from "./set";

export const helpDeskRoutes = trpc.router({
  getMany,
  set,
});
