import { z } from "zod"
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc"

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),
  
  getAllUsers: publicProcedure.query(({ ctx }) =>
    ctx.prisma.user.findMany()),
  
  getSecretMessage: protectedProcedure.query(() =>
    "you can now see this secret message!"),
})
