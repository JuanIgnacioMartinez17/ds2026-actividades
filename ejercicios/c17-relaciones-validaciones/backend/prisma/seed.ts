import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Clásico" },
  { nombre: "Fantástico" },
];

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://example.com/principito.jpg",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6200,
    imagen: "https://example.com/cien-anos.jpg",
    disponible: true,
    cats: ["Novela", "Fantástico"],
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 5300,
    imagen: "https://example.com/rayuela.jpg",
    disponible: false,
    cats: ["Novela"],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main();