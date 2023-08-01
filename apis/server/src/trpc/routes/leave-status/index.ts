import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const leaveStatusRoutes = trpc.router({ getMany });
