import { Hono, type Context } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";

export const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

app.get("/api/health", (c) => c.json({ ok: true, timestamp: Date.now() }));
app.get(Paths.oauthCallback, createOAuthCallbackHandler());
const trpcHandler = async (c: Context) => {
  const path = c.req.path;
  const endpoint = path.startsWith("/api/trpc")
    ? "/api/trpc"
    : path.startsWith("/trpc")
      ? "/trpc"
      : "/api/trpc";
  return fetchRequestHandler({
    endpoint,
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
};

app.use("/api/trpc/*", trpcHandler);
app.use("/trpc/*", trpcHandler);
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));
app.all("/trpc/*", (c) => c.json({ error: "Not Found" }, 404));
