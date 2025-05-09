import { z } from "zod";


export const emailSchema = z.object({
  email: z
    .string({ message: "El correo electrónico es obligatorio." })
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Por favor, ingresa un correo electrónico válido." })
});

export const nameSchema =
  z.object({
    name: z.string()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(50, "El nombre no puede tener más de 50 caracteres.")
      .regex(/^[A-Za-zÀ-ÿ ,.'-]+$/, "El nombre solo puede contener letras, espacios y algunos caracteres especiales.")
      .refine(value => value.trim() !== "", "El nombre no puede estar vacío.")
  });

export const passwordSchema = z.object({
  currentPassword: z.string().min(6, "La contraseña actual debe tener al menos 6 caracteres."),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres."),
  confirmNewPassword: z.string().min(6, "La confirmación de la nueva contraseña debe tener al menos 6 caracteres."),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmNewPassword"]
});
