"use strict";
const catalogo = [
    {
        isbn: "978-001",
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        precio: 1500,
        disponible: true,
        genero: "Cuentos"
    },
    {
        isbn: "978-002",
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        precio: 2200,
        disponible: false,
        genero: "Novela"
    },
    {
        isbn: "978-003",
        titulo: "Ficciones",
        autor: "Jorge Luis Borges",
        precio: 1800,
        disponible: true,
        genero: "Cuentos"
    },
    {
        isbn: "978-004",
        titulo: "Santa Evita",
        autor: "Tomás Eloy Martínez",
        precio: 3000,
        disponible: true
    },
    {
        isbn: "978-005",
        titulo: "Bestiario",
        autor: "Julio Cortázar",
        precio: 1200,
        disponible: false,
        genero: "Cuentos"
    }
];
function buscarPorAutor(autor) {
    return catalogo.filter(function (libro) {
        return libro.autor.toLowerCase().includes(autor.toLowerCase());
    });
}
function librosDisponibles() {
    return catalogo.filter(function (libro) {
        return libro.disponible === true;
    });
}
function precioPromedio(libro) {
    if (libro.length === 0)
        return 0;
    const suma = libro.reduce(function (acumulador, libro) {
        return acumulador + libro.precio;
    }, 0);
    return suma / libro.length;
}
function renderizar(libro) {
    const listado = document.querySelector('#listado');
    const stats = document.querySelector('#stats');
    listado.innerHTML = '';
    libro.forEach(function (libro) {
        const li = document.createElement('li');
        const estado = libro.disponible ? 'Disponible' : 'No disponible';
        li.textContent = `${libro.titulo} - ${libro.autor} - ${libro.precio} - ${estado}`;
        listado.appendChild(li);
    });
    const promedio = precioPromedio(libro);
    stats.textContent = `Mostrando ${libro.length} libros | Precio promedio: $${promedio.toFixed(2)}`;
}
const botonFiltrar = document.querySelector('#filtrar');
const botonMostrarDisponibles = document.querySelector('#mostrarDisponibles');
const botonMostrarTodos = document.querySelector('#mostrarTodos');
const filtrarAutor = document.querySelector('#filtroAutor');
botonFiltrar.addEventListener('click', function () {
    const buscarAutor = filtrarAutor.value;
    renderizar(buscarPorAutor(buscarAutor));
});
botonMostrarDisponibles.addEventListener('click', function () {
    renderizar(librosDisponibles());
});
botonMostrarTodos.addEventListener('click', function () {
    renderizar(catalogo);
});
renderizar(catalogo);
