import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { authenticate, authorize } from "./auth.middleware";

function crearMocks(req: Partial<Request> = {}) {
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as Response;
    const next = vi.fn() as unknown as NextFunction;

    return { req: req as Request, res, next };
}

describe("authorize", () => {
    it("responde 403 a un CLIENTE cuando la ruta pide ADMIN", () => {
        const { req, res, next } = crearMocks({ usuario: { id: 2, rol: "CLIENTE" } });

        authorize("ADMIN")(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("authenticate", () => {
    it("carga el usuario desde un token válido y llama a next", () => {
        const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
        const { req, next } = crearMocks({ headers: { authorization: `Bearer ${token}` } });

        authenticate(req, {} as Response, next);

        expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("responde 401 cuando el token está vencido", () => {
        const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "-1s" });
        const { req, res, next } = crearMocks({ headers: { authorization: `Bearer ${token}` } });

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
        expect(next).not.toHaveBeenCalled();
    });
});