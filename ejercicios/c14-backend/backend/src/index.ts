import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    precio: number;
    imagen: string;
    disponible: boolean;
}

const libros: Libro[] = [
    {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://example.com/principito.jpg",
    disponible: true,
    },
    {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6200,
    imagen: "https://example.com/cien-anos.jpg",
    disponible: true,
    },
    {
    id: 3,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 5300,
    imagen: "https://example.com/rayuela.jpg",
    disponible: false,
    },
];

app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Hello World! Backend funcionando 🚀" });
});

app.get("/libros", (_req: Request, res: Response) => {
    res.json(libros);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});