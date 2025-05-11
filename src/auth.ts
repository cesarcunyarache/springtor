import NextAuth, { NextAuthConfig } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { encode as defaultEncode } from "next-auth/jwt";
import { v4 as uuid } from "uuid";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import {
  AuthError,
  AuthenticationError,
  ValidationError,
} from "./features/auth/domain/errors/AuthError";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        /* try { */
          const { email, password } = credentials;

          if (!email || !password) {
           
            throw new Error("Correo electrónico y contraseña son requeridos");
            /* throw new ValidationError(
              "Correo electrónico y contraseña son requeridos"
            ); */
          }

          const {
            data: user,
            error,
          } = await supabase
            .schema("next_auth")
            .from("users")
            .select()
            .eq("email", credentials.email)
            .single();

          if (!user) {
            console.log("No se encontró el usuario");
            throw new Error("Email o contraseña incorrectos");
            throw new AuthenticationError("Email o contraseña incorrectos");
          }
          return {
            id: user.id,
            email: user.email,
          };

          if (credentials.password === user.password) {
          } else {
            return null;
          }
       /*  } catch (error) {
          if (error instanceof AuthError) {
            throw new Error(error.message);
          }
          throw new Error(
            "Parece que algo salió mal. Estamos trabajando en ello, por favor intenta nuevamente más tarde."
          );
        } */
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
          .schema("next_auth")
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

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export default authConfig;
