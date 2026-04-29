import { z } from "zod";
import { eq, and, desc } from "drizzle-orm";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { transferRequests } from "@db/schema";

export const transferRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        route: z.string().min(1),
        passengers: z.string().min(1),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(transferRequests).values({
        userId: input.userId ?? null,
        name: input.name,
        phone: input.phone,
        route: input.route,
        passengers: input.passengers,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(transferRequests).orderBy(desc(transferRequests.createdAt));
  }),

  myRequests: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(transferRequests)
      .where(eq(transferRequests.userId, ctx.user.id))
      .orderBy(desc(transferRequests.createdAt));
  }),

  cancel: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .update(transferRequests)
        .set({ status: "cancelled" })
        .where(
          and(
            eq(transferRequests.id, input.id),
            eq(transferRequests.userId, ctx.user.id)
          )
        );
      return { success: true };
    }),
});
