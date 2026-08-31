import bcrypt from "bcrypt";
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

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  for (const { autor, cats, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!existente) {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: { connect: { nombre: autor } },
          categorias: { connect: cats.map((nombre) => ({ nombre })) },
        },
      });
    }
  }

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }
}

main();