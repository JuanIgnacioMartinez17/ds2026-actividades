import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().email('El email no es válido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginValidado = z.infer<typeof loginSchema>;