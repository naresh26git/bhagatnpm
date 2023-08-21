import { trpc } from "../../trpc";
import { getMany } from "./get-many";
import { getRecentlyCreated } from "./get-recently-created";
import { importQualification } from "./import";
import { set } from "./set";

export const qualificationRoutes = trpc.router({
  getMany,
  import: importQualification,
  set,
  getRecentlyCreated,
});
