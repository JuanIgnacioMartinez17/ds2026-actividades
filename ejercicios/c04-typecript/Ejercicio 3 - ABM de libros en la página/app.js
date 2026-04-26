"use strict";
let catalogo = [
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
        titulo: "Santa Evita",
        autor: "Tomás Eloy Martínez",
        precio: 3000,
        disponible: true
    }
];
function renderizar(libro) {
    const listado = document.querySelector('#listado');
    const stats = document.querySelector('#stats');
    listado.innerHTML = '';
    libro.forEach(function (libro) {
        const li = document.createElement('li');
        const estado = libro.disponible ? 'Disponible' : 'No disponible';
        li.textContent = `${estado} - ${libro.titulo} - ${libro.autor} - $${libro.precio}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarLibro(libro.isbn);
        });
        li.appendChild(botonEliminar);
        listado.appendChild(li);
    });
    const promedio = precioPromedio(libro);
    stats.textContent = `${libro.length} libros | Precio promedio: $${promedio.toFixed(2)}`;
}
function precioPromedio(libro) {
    if (libro.length == 0)
        return 0;
    const suma = libro.reduce(function (acumulador, libro) {
        return acumulador + libro.precio;
    }, 0);
    return suma / libro.length;
}
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(function (libro) {
        return libro.isbn !== isbn;
    });
    renderizar(catalogo);
}
function validarFormulario() {
    const inputTitulo = document.querySelector('#inputTitulo');
    const inputAutor = document.querySelector('#inputAutor');
    const inputPrecio = document.querySelector('#inputPrecio');
    const inputGenero = document.querySelector('#inputGenero');
    const inputDisponible = document.querySelector('#inputDisponible');
    const errorForm = document.querySelector('#errorForm');
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const preciostr = inputPrecio.value;
    if (titulo === '') {
        errorForm.textContent = 'El titulo es obligatorio';
        return null;
    }
    if (autor === '') {
        errorForm.textContent = 'El autor es obligatorio';
        return null;
    }
    if (preciostr === '') {
        errorForm.textContent = 'El precio es obligatorio';
        return null;
    }
    const precio = parseFloat(preciostr);
    if (precio <= 0) {
        errorForm.textContent = 'El precio debe ser mayor a 0';
        return null;
    }
    errorForm.textContent = '';
    const isbnGenerado = 'AUTO-' + Date.now();
    const disponible = inputDisponible.checked;
    const genero = inputGenero.value.trim();
    const nuevoLibro = {
        isbn: isbnGenerado,
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        ...(genero !== '' && { genero: genero })
    };
    return nuevoLibro;
}
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
const botonAgregar = document.querySelector('#botonAgregar');
const botonFiltrar = document.querySelector('#filtrar');
const botonMostrarDisponibles = document.querySelector('#mostrarDisponibles');
const botonMostrarTodos = document.querySelector('#mostrarTodos');
const inputFiltroAutor = document.querySelector('#filtroAutor');
botonAgregar.addEventListener('click', function () {
    const libroNuevo = validarFormulario();
    if (libroNuevo === null)
        return;
    agregarLibro(libroNuevo);
    document.querySelector('#inputTitulo').value = '';
    document.querySelector('#inputAutor').value = '';
    document.querySelector('#inputPrecio').value = '';
    document.querySelector('#inputGenero').value = '';
    document.querySelector('#inputDisponible').checked = false;
});
botonFiltrar.addEventListener('click', function () {
    renderizar(buscarPorAutor(inputFiltroAutor.value));
});
botonMostrarDisponibles.addEventListener('click', function () {
    renderizar(librosDisponibles());
});
botonMostrarTodos.addEventListener('click', function () {
    renderizar(catalogo);
});
renderizar(catalogo);
