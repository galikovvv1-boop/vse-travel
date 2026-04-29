import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { transferRequests } from "@db/schema";

export const reservationRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        checkInDate: z.string().min(1),
        checkOutDate: z.string().min(1),
        guests: z.string().min(1),
        roomType: z.string().min(1),
        roomId: z.string().optional(),
        fullName: z.string().min(1),
        email: z.string().email(),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(transferRequests).values({
        userId: input.userId ?? null,
        name: input.fullName,
        phone: input.guests,
        route: `${input.roomType} (${input.checkInDate} - ${input.checkOutDate})`,
        passengers: input.guests,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),
});
