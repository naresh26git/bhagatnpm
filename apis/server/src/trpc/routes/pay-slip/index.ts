import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const paySlipRoutes = trpc.router({
  getMany,
});
