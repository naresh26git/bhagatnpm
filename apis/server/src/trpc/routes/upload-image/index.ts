import { trpc } from "../../trpc";
import { uploadFileToBlob } from "./upload";
export const uploadRoutes = trpc.router({
  uploadFileToBlob,
});
