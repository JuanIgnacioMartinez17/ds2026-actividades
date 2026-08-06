import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, 'El título es obligatorio'),
    autor: z.string().trim().min(1, 'El autor es obligatorio'),
    anio: z.coerce.number().int('El año debe ser un número entero').positive('El año debe ser mayor a 0'),
    genero: z.string().trim().min(1, 'El género es obligatorio'),
    sinopsis: z.string().trim().min(10, 'La sinopsis debe tener al menos 10 caracteres'),
});

export type LibroValidado = z.infer<typeof libroSchema>;