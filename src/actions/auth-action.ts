"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/features/auth/domain/schema/SignInSchema";
import { signUpSchema } from "@/features/auth/domain/schema/SignUpSchema";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";


import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

/* import { loginSchema, registerSchema } from "@/lib/zod";
import bcrypt from "bcryptjs"; */
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof signInSchema
    >) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const signInGoogle = async () => {
try {

  await signIn("google");
 
} catch (error) {
  if (error instanceof AuthError) {
    return { error: error.cause?.err?.message };
  }
  return { error: "error 500" };
}
};


export const registerAction = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const { data, success } = signUpSchema.safeParse(values);
    if (!success) {
      return { error: "Datos inválidos" };
    }

    if (data.password !== data.confirmPassword) {
      return { error: "Las contraseñas no coinciden" };
    }

    // Check if user already exists by email using Drizzle ORM
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existingUser.length > 0) {
      return { error: "El usuario ya existe" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Insert new user using Drizzle ORM
    const [newUser] = await db
      .insert(users)
      .values({
        email: data.email,
        password: hashedPassword,
     /*    name: data.. || null, // i */
        // other fields if required
      })
      .returning();

    if (!newUser) {
      return { error: "Error al crear el usuario" };
    }

    // Automatically sign in the user after registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error interno del servidor" };
  }
};



