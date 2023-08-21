import { trpc } from "../../trpc";
import { get } from "./get";
import { getMany } from "./get-many";
import { importFamilyDetail } from "./import";
import { set } from "./set";

export const familyDetailRoutes = trpc.router({
  getMany,
  get,
  import: importFamilyDetail,
  set,
});
