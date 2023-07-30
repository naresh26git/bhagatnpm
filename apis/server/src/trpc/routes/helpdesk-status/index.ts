import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const helpDeskStatusRoutes = trpc.router({ getMany });
