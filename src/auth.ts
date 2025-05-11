import NextAuth, { NextAuthConfig } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export  const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;


        console.log(email, password)
        const { data: user, error } = await supabase
        .schema('next_auth')
        .from("users")
        .select()
        .eq("email", credentials.email)
        .single();
        

          console.log(user)
        if (error || !user) {
          
          return null;
        }
        return {
          id: user.id,
          email: user.email,
        };
       
        if (credentials.password === user.password) {
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await supabase
          .schema('next_auth')
          .from("sessions")
          .insert?.({
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
  },
  secret: process.env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },
};


export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
export default authConfig