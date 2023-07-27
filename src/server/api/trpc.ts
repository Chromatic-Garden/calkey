import { initTRPC, TRPCError } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import { type Session } from "next-auth"
import superjson from "superjson"
import { ZodError } from "zod"
import { getServerAuthSession } from "~/server/auth"
import { prisma } from "~/server/db"

interface CreateContextOptions {
  session: Session | null
}

const createInnerTRPCContext = ({ session }: CreateContextOptions) => ({ session, prisma })

export const createTRPCContext = async ({ req, res }: CreateNextContextOptions) =>
  createInnerTRPCContext({ session: await getServerAuthSession({ req, res }) })

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})


export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx: { session }, next }) => {
  if (!session?.user)
    throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({
    ctx: {
      session: { ...session, user: session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
