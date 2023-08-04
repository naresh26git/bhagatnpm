import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const relationShipRoutes = trpc.router({ getMany });
