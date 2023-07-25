import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const identificationRoutes = trpc.router({
  getMany,
});
