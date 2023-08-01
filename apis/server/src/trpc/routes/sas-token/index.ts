import { trpc } from "../../trpc";
import { get } from "./get";
export const sasTokenRoutes = trpc.router({
  get,
});
