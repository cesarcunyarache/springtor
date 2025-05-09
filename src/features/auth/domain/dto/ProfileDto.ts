import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "../schema/ProfileSchemas";


export type UpdateEmailDto = z.infer<typeof emailSchema>;


export type UpdateNameDto = z.infer<typeof nameSchema>;

export type UpdatePasswordDto = z.infer<typeof passwordSchema>;