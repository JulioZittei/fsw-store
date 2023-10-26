import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "./prisma";

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };

      return session;
    },
  },
};
