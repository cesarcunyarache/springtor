import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string({ message: "El email electrónico es obligatorio" })
    .min(1, "El email es obligatorio"),

  password: z.string({ message: "La contraseña es obligatoria" }).min(
    1,
    "La contraseña es obligatoria"
  ),
  check: z.boolean({
    required_error: "Debes aceptar los términos y condiciones",
  }).refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
  confirmPassword: z.string({ message: "La confirmación de la contraseña debe es obligatoria."}).min(1, "La confirmación de la contraseña debe es obligatoria."),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"]
});