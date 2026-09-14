import { Request, Response } from "express";
import * as autorService from "../services/autor.service";
import { Autor } from "../types/autor.types";

export async function getAll(_req: Request, res: Response) {
    return res.json(await autorService.findAll());
}

export async function getById(req: Request, res: Response) {
    const autor = await autorService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
}

export async function create(req: Request, res: Response) {
    const datos: Omit<Autor, "id"> = req.body;
    const nuevo = await autorService.create(datos);
    return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
    const datos: Partial<Omit<Autor, "id">> = req.body;
    const actualizado = await autorService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
    const ok = await autorService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();
}