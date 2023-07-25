import { trpc } from "../../../trpc";
import { getMany } from "./get-many";

export const identificationTypeRoutes = trpc.router({
  getMany,
});
