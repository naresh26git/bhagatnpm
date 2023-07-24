import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const companyRoutes = trpc.router({
  getMany,
});
