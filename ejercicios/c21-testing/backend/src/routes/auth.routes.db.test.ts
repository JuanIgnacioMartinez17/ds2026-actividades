// Estos tests requieren PostgreSQL disponible y el seed de prisma cargado.
import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(async () => {
    await prisma.$disconnect();
});

describe("login (requiere DB)", () => {
    it("credenciales del seed devuelven token y usuario sin passwordHash", async () => {
        const respuesta = await request(app)
            .post("/api/auth/login")
            .send({ email: "cliente@libreria.test", password: "Cliente1234" });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.token).toEqual(expect.any(String));
        expect(respuesta.body.usuario).toMatchObject({
            email: "cliente@libreria.test",
            rol: "CLIENTE",
        });
        expect(respuesta.body.usuario).not.toHaveProperty("passwordHash");
    });

    it("mail inexistente y contraseña incorrecta devuelven el mismo 401", async () => {
        const [mailInexistente, passwordIncorrecta] = await Promise.all([
            request(app)
                .post("/api/auth/login")
                .send({ email: "nadie@libreria.test", password: "Cliente1234" }),
            request(app)
                .post("/api/auth/login")
                .send({ email: "cliente@libreria.test", password: "Incorrecta1" }),
        ]);

        expect(mailInexistente.status).toBe(401);
        expect(passwordIncorrecta.status).toBe(401);
        expect(mailInexistente.body).toEqual({ error: "Credenciales inválidas" });
        expect(passwordIncorrecta.body).toEqual(mailInexistente.body);
    });
});