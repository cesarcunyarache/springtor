import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./lib/db";

import type { NextAuthConfig } from "next-auth";
import NextAuth, { User } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./lib/db/schema";
import { getUserFromDb } from "./actions/user-action";


const adapter = await DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
  authenticatorsTable: authenticators,
});

export const authConfig: NextAuthConfig = {
  adapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, 
  },
  providers: [
    Github({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const res = await getUserFromDb(email as string, password as string);
        if (res.success) {
          return res.data as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
   async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },

     async redirect({ url, baseUrl }) {

      /* return baseUrl || '/'; */
      return '/scrum/roadmap';
    },
  },
  secret: process.env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },

   pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/roadmap",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
