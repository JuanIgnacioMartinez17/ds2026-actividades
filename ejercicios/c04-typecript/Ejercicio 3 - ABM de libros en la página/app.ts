interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
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

function renderizar(libro: Libro[]): void {
    const listado = document.querySelector('#listado') as HTMLElement;
    const stats = document.querySelector('#stats') as HTMLElement;

    listado.innerHTML = '';

    libro.forEach(function(libro: Libro) {
        const li = document.createElement('li');
        const estado: string = libro.disponible ? 'Disponible' : 'No disponible';

        li.textContent = `${estado} - ${libro.titulo} - ${libro.autor} - $${libro.precio}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';

        botonEliminar.addEventListener('click', () => {
            eliminarLibro(libro.isbn);
        });

        li.appendChild(botonEliminar);
        listado.appendChild(li);
    });
    const promedio: number = precioPromedio(libro);
    stats.textContent = `${libro.length} libros | Precio promedio: $${promedio.toFixed(2)}`;
}

function precioPromedio(libro: Libro[]): number {
    if (libro.length == 0) return 0;
    const suma: number = libro.reduce(function(acumulador: number, libro: Libro) {
        return acumulador + libro.precio;
    }, 0);
    return suma / libro.length;
}

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(function(libro: Libro) {
        return libro.isbn !== isbn;
    });
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const inputTitulo = document.querySelector('#inputTitulo') as HTMLInputElement;
    const inputAutor = document.querySelector('#inputAutor') as HTMLInputElement;
    const inputPrecio = document.querySelector('#inputPrecio') as HTMLInputElement;
    const inputGenero = document.querySelector('#inputGenero') as HTMLInputElement;
    const inputDisponible = document.querySelector('#inputDisponible') as HTMLInputElement;
    const errorForm = document.querySelector('#errorForm') as HTMLElement;

    const titulo: string = inputTitulo.value.trim();
    const autor: string = inputAutor.value.trim();
    const preciostr: string = inputPrecio.value;

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

    const precio: number = parseFloat(preciostr);
    if (precio <= 0) {
        errorForm.textContent = 'El precio debe ser mayor a 0';
        return null;
    }

    errorForm.textContent = '';

    const isbnGenerado: string = 'AUTO-' + Date.now();
    const disponible: boolean = inputDisponible.checked;

    const genero: string = inputGenero.value.trim();

    const nuevoLibro: Libro = {
        isbn: isbnGenerado,
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        ...(genero !== '' && {genero: genero})
    };
    return nuevoLibro;
}

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(function(libro: Libro) {
        return libro.autor.toLowerCase().includes(autor.toLowerCase());
    });
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(function(libro: Libro) {
        return libro.disponible === true;
    });
}

const botonAgregar            = document.querySelector('#botonAgregar')          as HTMLElement;
const botonFiltrar            = document.querySelector('#filtrar')              as HTMLElement;
const botonMostrarDisponibles = document.querySelector('#mostrarDisponibles')   as HTMLElement;
const botonMostrarTodos       = document.querySelector('#mostrarTodos')         as HTMLElement;
const inputFiltroAutor      = document.querySelector('#filtroAutor')          as HTMLInputElement;

botonAgregar.addEventListener('click', function() {
    const libroNuevo: Libro | null = validarFormulario();
    
    if (libroNuevo === null) return;

    agregarLibro(libroNuevo);

    (document.querySelector('#inputTitulo')    as HTMLInputElement).value = '';
    (document.querySelector('#inputAutor')     as HTMLInputElement).value = '';
    (document.querySelector('#inputPrecio')    as HTMLInputElement).value = '';
    (document.querySelector('#inputGenero')    as HTMLInputElement).value = '';
    (document.querySelector('#inputDisponible') as HTMLInputElement).checked = false;
});

botonFiltrar.addEventListener('click', function() {
    renderizar(buscarPorAutor(inputFiltroAutor.value));
});

botonMostrarDisponibles.addEventListener('click', function() {
    renderizar(librosDisponibles());
})

botonMostrarTodos.addEventListener('click', function() {
    renderizar(catalogo);
})

renderizar(catalogo)
