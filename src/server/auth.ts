import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth"
import ldap from "ldapjs"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import SpotifyProvider from "next-auth/providers/spotify"
import DiscordProvider from "next-auth/providers/discord"
import OsuProvider from "next-auth/providers/osu"
import { env } from "~/env.mjs"
import { prisma } from "~/server/db"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Username",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        // lookup user in db from credentials supplied
        return null
      }
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        // lookup user in db from credentials supplied
        return null
      }
    }),
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "DN", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        if (!credentials)
          return null

        const client = ldap.createClient({
          url: env.LDAP_URI,
        })

        return new Promise((resolve, reject) => {
          client.bind(credentials.username, credentials.password, (error) => {
            if (error) {
              console.error("Failed")
              reject()
            } else {
              console.log("Logged in")
              resolve({
                id: "",
                // username: credentials.username,
                // password: credentials.password,
              })
            }
          })
        })
      }
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    OsuProvider({
      clientId: env.OSU_CLIENT_ID,
      clientSecret: env.OSU_CLIENT_SECRET
    }),
  ]
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => getServerSession(ctx.req, ctx.res, authOptions)
