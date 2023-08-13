import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { importPaySlipComponent } from "./import";
import { set } from "./set";

export const payRollRoutes = trpc.router({
  getMany,
  get,
  set,
  import: importPaySlipComponent,
});
