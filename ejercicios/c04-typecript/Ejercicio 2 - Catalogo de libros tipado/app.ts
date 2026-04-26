interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
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

function buscarPorAutor(autor: string): Libro [] {
    return catalogo.filter(function(libro: Libro) {
        return libro.autor.toLowerCase().includes(autor.toLowerCase());
    });
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(function(libro: Libro) {
        return libro.disponible === true;
    })
}

function precioPromedio(libro: Libro[]): number {
    if(libro.length === 0) return 0;

    const suma: number = libro.reduce(function(acumulador: number, libro: Libro) {
        return acumulador + libro.precio;
    }, 0);

    return suma / libro.length;
}

function renderizar(libro: Libro[]): void {
    const listado = document.querySelector('#listado') as HTMLElement;
    const stats = document.querySelector('#stats') as HTMLElement;

    listado.innerHTML = '';
    
    libro.forEach(function(libro: Libro) {
        const li = document.createElement('li');
        const estado: string = libro.disponible ? 'Disponible' : 'No disponible';
        li.textContent = `${libro.titulo} - ${libro.autor} - ${libro.precio} - ${estado}`;
        listado.appendChild(li);
    });

    const promedio: number = precioPromedio(libro);
    stats.textContent = `Mostrando ${libro.length} libros | Precio promedio: $${promedio.toFixed(2)}`;
}

const botonFiltrar = document.querySelector('#filtrar') as HTMLElement;
const botonMostrarDisponibles = document.querySelector('#mostrarDisponibles') as HTMLElement;
const botonMostrarTodos = document.querySelector('#mostrarTodos') as HTMLElement;
const filtrarAutor = document.querySelector('#filtroAutor') as HTMLInputElement;

botonFiltrar.addEventListener('click', function() {
    const buscarAutor: string = filtrarAutor.value;
    renderizar(buscarPorAutor(buscarAutor));
});

botonMostrarDisponibles.addEventListener('click', function() {
    renderizar(librosDisponibles());
});

botonMostrarTodos.addEventListener('click', function() {
    renderizar(catalogo);
});

renderizar(catalogo);