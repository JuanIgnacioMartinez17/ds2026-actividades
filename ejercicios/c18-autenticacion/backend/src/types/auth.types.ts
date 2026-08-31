import { z } from "zod";
import type { registroSchema, loginSchema } from "../validations/auth.validation";

export type Registro = z.infer<typeof registroSchema>;
export type Login = z.infer<typeof loginSchema>;