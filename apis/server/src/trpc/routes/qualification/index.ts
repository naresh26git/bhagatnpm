import { trpc } from "../../trpc";
import { getMany } from "./get-many";
import { getRecentlyCreated } from "./get-recently-created";
import { set } from "./set";
export const qualificationRoutes = trpc.router({
  getMany,
  set,
  getRecentlyCreated,
});
