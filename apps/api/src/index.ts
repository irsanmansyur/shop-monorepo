import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { auth } from "../auth";
import { cors } from "hono/cors";

import { appRouter } from "@packages/trpc/server/context";

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) =>
  origin.trim(),
);

const app = new Hono();

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: (origin) => {
      if (!origin) return undefined; // izinkan non-browser request
      return allowedOrigins?.includes(origin) ? origin : undefined;
    },
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
    origin: (origin) => {
      if (!origin) return undefined;
      return allowedOrigins?.includes(origin) ? origin : undefined;
    },
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
