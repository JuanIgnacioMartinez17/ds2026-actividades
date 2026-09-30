import { describe, expect, it } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("matriz de permisos de libros (sin DB)", () => {
    it("POST sin token responde 401", async () => {
        const respuesta = await request(app).post("/api/libros").send({});

        expect(respuesta.status).toBe(401);
        expect(respuesta.body).toEqual({ error: "Falta el token" });
    });

    it("POST con token CLIENTE responde 403", async () => {
        const respuesta = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${tokenCliente}`)
            .send({});

        expect(respuesta.status).toBe(403);
    });

    it("ADMIN con precio inválido recibe 400 antes de llegar a Prisma", async () => {
        const respuesta = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send({ titulo: "Rayuela", precio: -5, imagen: "x", autorId: 1 });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.detalles).toContainEqual(
            expect.objectContaining({ campo: "precio" }),
        );
    });

    it("POST con token adulterado responde 401", async () => {
        const respuesta = await request(app)
            .post("/api/libros")
            .set("Authorization", "Bearer token-adulterado")
            .send({});

        expect(respuesta.status).toBe(401);
        expect(respuesta.body).toEqual({ error: "Token inválido" });
    });

    it("DELETE con token CLIENTE responde 403", async () => {
        const respuesta = await request(app)
            .delete("/api/libros/1")
            .set("Authorization", `Bearer ${tokenCliente}`);

        expect(respuesta.status).toBe(403);
    });

    it("una ruta inexistente responde 404", async () => {
        const respuesta = await request(app).get("/api/no-existe");

        expect(respuesta.status).toBe(404);
        expect(respuesta.body).toEqual({ error: "Ruta no encontrada" });
    });
});