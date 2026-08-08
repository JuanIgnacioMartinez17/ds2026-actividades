import { Request, Response } from "express";
import * as libroService from "../services/libro.service";
import { Libro } from "../types/libro.types";

export function getAll(req: Request, res: Response) {
    const { disponible } = req.query;
    let filtro: boolean | undefined;
    if (disponible === "true") filtro = true;
    if (disponible === "false") filtro = false;
    return res.json(libroService.findAll(filtro));
}

export function getById(req: Request, res: Response) {
    const libro = libroService.findById(Number(req.params.id));
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(libro);
}

export function create(req: Request, res: Response) {
    const datos: Omit<Libro, "id"> = req.body;
    const nuevo = libroService.create(datos);
    return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
    const datos: Omit<Libro, "id"> = req.body;
    const actualizado = libroService.update(Number(req.params.id), datos);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
    const ok = libroService.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();
}