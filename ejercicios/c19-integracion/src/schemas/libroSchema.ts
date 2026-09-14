import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, 'El título es obligatorio'),
    autorId: z.coerce.number().int('El autor es obligatorio').positive('El autor es obligatorio'),
    precio: z.coerce.number().int('El precio debe ser un número entero').positive('El precio debe ser mayor a 0'),
    imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
    disponible: z.boolean().optional(),
});

export type LibroValidado = z.infer<typeof libroSchema>;