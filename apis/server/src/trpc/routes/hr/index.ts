import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const hrRoutes = trpc.router({
  getMany,
});
