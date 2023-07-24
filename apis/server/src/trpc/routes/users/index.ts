import { trpc } from "../../trpc";
import { getMany } from "./get-many";
import { set } from "./set";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";

export const userRoutes = trpc.router({
  set,
  getMany,
  signIn,
  signOut,
});
