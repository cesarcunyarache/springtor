import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ message: "El email electrónico es obligatorio" })
    .min(1, "El email es obligatorio")
    .email("email inválido"),
  password: string({ message: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria")
})