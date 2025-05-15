"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/features/auth/domain/schema/SignInSchema";
import { signUpSchema } from "@/features/auth/domain/schema/SignUpSchema";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

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

  console.log("signInGoogle")
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
      return {
        error: "Datos inválidos",
      };
    }

    if (data.password !== data.confirmPassword) {
      return {
        error: "Las contraseñas no coinciden",
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .schema("next_auth")
      .from("users")
      .select()
      .eq("email", data.email)
      .single();

    if (existingUser) {
      return {
        error: "El usuario ya existe",
      };
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el usuario
    const { data: newUser, error: createError } = await supabase
      .schema("next_auth")
      .from("users")
      .insert({
        email: data.email,
        password: hashedPassword,
      })
      .select()
      .single();

    if (createError || !newUser) {
      return {
        error: "Error al crear el usuario",
      };
    }

    // Iniciar sesión automáticamente
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



