import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const helpDeskCategoryRoutes = trpc.router({ getMany });
