import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth, { User } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { v4 as uuid } from "uuid";

import { db } from "./lib/db";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./lib/db/schema";
import { getUserFromDb } from "./actions/user-action";
import { closeSingleQuote } from "prosemirror-inputrules";

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

   /*  async session({ session, user }) {
      // Puedes agregar datos adicionales a la sesión aquí si quieres
      return session;
    }, */
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
    /*  async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    }, 

    async signIn({ user, account, profile }) {
      console.log("signIn callback:", { user, account, profile });
      return true;
    },
 
    async session({ session, token }) {
      console.log("session callback:", { session, token });
      return session;
    }, */

     async redirect({ url, baseUrl }) {
      // Siempre redirige a la raíz después de iniciar sesión
      return baseUrl || '/';
    },
  },
  /* jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  }, */
  events: {
    /*  createUser(res) {
      console.log("User signed in:", res)
    }, */
  },
  /* 
   logger: {
    error(code, ...message) {
      console.log(message)
    },
    warn(code, ...message) {
       console.log(message)
    },
    debug(code, ...message) {
      console.log(message)
    },
  }, */

  secret: process.env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },

   pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
