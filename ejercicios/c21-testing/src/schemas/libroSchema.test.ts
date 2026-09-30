import { describe, expect, it } from 'vitest';
import { libroSchema } from './libroSchema';

describe('libroSchema', () => {
    it('convierte los valores de texto del formulario a números', () => {
        const resultado = libroSchema.safeParse({
            titulo: ' Rayuela ',
            autorId: '1',
            precio: '5300',
            imagen: ' https://example.test/rayuela.jpg ',
        });

        expect(resultado.success).toBe(true);
        if (resultado.success) {
            expect(resultado.data.autorId).toBe(1);
            expect(resultado.data.precio).toBe(5300);
            expect(resultado.data.titulo).toBe('Rayuela');
        }
    });
});