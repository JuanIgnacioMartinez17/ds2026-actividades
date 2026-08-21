import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://example.com/principito.jpg",
    disponible: true,
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6200,
    imagen: "https://example.com/cien-anos.jpg",
    disponible: true,
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 5300,
    imagen: "https://example.com/rayuela.jpg",
    disponible: false,
  },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();
