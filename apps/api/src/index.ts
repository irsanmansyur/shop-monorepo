import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { auth } from "../auth";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

import { appRouter } from "@packages/trpc/server/context";

const app = new Hono();

app.use(
  "*",
  serveStatic({
    root: "./apps/web/dist",
    rewriteRequestPath: (p) => (p === "/" ? "/index.html" : p),
  }),
);

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/api/trpc/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "/api/trpc",
  }),
);

export default app;
