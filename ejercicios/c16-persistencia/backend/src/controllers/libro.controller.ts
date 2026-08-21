import { Request, Response } from "express";
import * as libroService from "../services/libro.service";
import { Libro } from "../types/libro.types";

export async function getAll(req: Request, res: Response) {
try {
    const { disponible } = req.query;
    let filtro: boolean | undefined;
    if (disponible === "true") filtro = true;
    if (disponible === "false") filtro = false;
    return res.json(await libroService.findAll(filtro));
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function getById(req: Request, res: Response) {
try {
    const libro = await libroService.findById(Number(req.params.id));
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(libro);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function create(req: Request, res: Response) {
try {
    const datos: Omit<Libro, "id"> = req.body;
    const nuevo = await libroService.create(datos);
    return res.status(201).json(nuevo);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function update(req: Request, res: Response) {
try {
    const datos: Omit<Libro, "id"> = req.body;
    const actualizado = await libroService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}

export async function remove(req: Request, res: Response) {
try {
    const ok = await libroService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();
} catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
}
}