import { authRouter } from "./auth-router";
import { reservationRouter } from "./reservation-router";
import { transferRouter } from "./transfer-router";
import { aiRouter } from "./ai-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  reservation: reservationRouter,
  transfer: transferRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
