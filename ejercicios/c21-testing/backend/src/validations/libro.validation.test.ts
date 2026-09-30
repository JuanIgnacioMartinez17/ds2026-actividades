import { describe, expect, it } from "vitest";
import { idParamSchema, libroCreateSchema } from "./libro.validation";

const libroValido = {
    titulo: "Rayuela",
    precio: 5300,
    imagen: "https://example.test/rayuela.jpg",
    autorId: 1,
};

describe("libroCreateSchema", () => {
    it("rechaza un precio negativo y señala el campo precio", () => {
        const resultado = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });

        expect(resultado.success).toBe(false);
        if (!resultado.success) {
            expect(resultado.error.issues[0].path).toEqual(["precio"]);
        }
    });

    it("recorta los espacios del título", () => {
        const resultado = libroCreateSchema.safeParse({ ...libroValido, titulo: " Rayuela " });

        expect(resultado.success).toBe(true);
        if (resultado.success) expect(resultado.data.titulo).toBe("Rayuela");
    });
});

describe("idParamSchema", () => {
    it("convierte el parámetro id a número", () => {
        const resultado = idParamSchema.safeParse({ id: "42" });

        expect(resultado.success).toBe(true);
        if (resultado.success) expect(resultado.data.id).toBe(42);
    });
});