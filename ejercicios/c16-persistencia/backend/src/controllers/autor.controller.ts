import { Request, Response } from "express";
import * as autorService from "../services/autor.service";
import { Autor } from "../types/autor.types";

export async function getAll(_req: Request, res: Response) {
try {
    return res.json(await autorService.findAll());
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function getById(req: Request, res: Response) {
try {
    const autor = await autorService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function create(req: Request, res: Response) {
try {
    const datos: Omit<Autor, "id"> = req.body;
    const nuevo = await autorService.create(datos);
    return res.status(201).json(nuevo);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function update(req: Request, res: Response) {
try {
    const datos: Omit<Autor, "id"> = req.body;
    const actualizado = await autorService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function remove(req: Request, res: Response) {
try {
    const ok = await autorService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}