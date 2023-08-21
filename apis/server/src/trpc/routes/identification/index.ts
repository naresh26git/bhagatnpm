import { trpc } from "../../trpc";
import { getMany } from "./get-many";
import { importIdentification } from "./import";
import { set } from "./set";

export const identificationRoutes = trpc.router({
  getMany,
  import: importIdentification,
  set,
});
