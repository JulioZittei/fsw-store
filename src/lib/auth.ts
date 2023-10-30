import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "./prisma";
import bcrypt from "bcrypt";
import { profile } from "console";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password)
          throw new Error("Required field(s) are/is missing");

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Invalid user and/or password");

        if (!user.password)
          throw new Error("User is not registered with credentials");

        if (!(await bcrypt.compare(credentials?.password!, user.password))) {
          throw new Error("Invalid user and/or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, trigger, user }) {
      return {
        ...token,
      };
    },
    async session({ session, token, user }) {
      session.user = {
        id: token.sub,
        name: token.name,
        image: token.picture,
        email: token.email,
      };
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider && profile?.email) {
        const userExists = await prismaClient.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (userExists) {
          const newAccount = {
            userId: userExists.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          };

          await prismaClient.account.upsert({
            where: {
              provider: account.provider,
            },
            create: newAccount,
            update: newAccount,
          });

          await prismaClient.user.update({
            where: {
              email: userExists?.email!,
            },
            data: {
              image: (profile as any).picture,
              emailVerified: new Date(),
            },
          });

          return true;
        }

        return true;
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  debug: process.env.NODE_ENV === "development",
};
