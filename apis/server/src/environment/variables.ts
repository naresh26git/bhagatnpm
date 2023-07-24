import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const toBoolean = (secure: unknown) =>
  String(secure).toLowerCase() === "true";

export const envVariables = z.object({
  PORT: z.preprocess(Number, z.number()),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  COOKIE_SECURE: z.preprocess(toBoolean, z.boolean()),
  COOKIE_HTTP_ONLY: z.preprocess(toBoolean, z.boolean()),
  COOKIE_SAME_SITE: z.preprocess(toBoolean, z.boolean()),
});

declare global {
  export namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export default envVariables.parse(process.env);
