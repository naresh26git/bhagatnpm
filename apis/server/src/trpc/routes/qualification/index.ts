import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const qualificationRoutes = trpc.router({
  getMany,
});
