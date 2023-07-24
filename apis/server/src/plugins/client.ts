import { type FastifySessionOptions } from "@fastify/session";
import fpStatic from "@fastify/static";
import fp from "fastify-plugin";
import path from "path";

export default fp<FastifySessionOptions>(async (fastify, opts) => {
  fastify.register(fpStatic, {
    root: path.join(process.cwd(), "public"),
    wildcard: false,
  });
});
