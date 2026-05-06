const OPEN_LIBRARY_API = "https://openlibrary.org/search.json";
const COVER_BASE_URL = "https://covers.openlibrary.org/b/olid/";

async function buscarLibros(query) {
const url = `${OPEN_LIBRARY_API}?q=${encodeURIComponent(query)}&limit=12&fields=title,author_name,cover_edition_key,first_publish_year`;

const response = await fetch(url);

if (!response.ok) {
    throw new Error(`Error de red: ${response.status}`);
}

const data = await response.json();

return data.docs.map(libro => ({
    titulo: libro.title || "Sin título",
    autores: libro.author_name ? libro.author_name.join(", ") : "Autor desconocido",
    anio: libro.first_publish_year || "—",
    coverKey: libro.cover_edition_key || null,
}));
}

function crearCardHTML(libro) {
const imagenHTML = libro.coverKey
    ? `<img src="${COVER_BASE_URL}${libro.coverKey}-M.jpg"
            class="card-img-top"
            alt="Portada de ${libro.titulo}"
            style="height:200px; object-fit:cover;">`
    : `<div class="bg-secondary text-white d-flex align-items-center justify-content-center"
            style="height:200px; font-size:3rem;">📚</div>`;

return `
    <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="card h-100">
        ${imagenHTML}
        <div class="card-body d-flex flex-column">
        <h6 class="card-title">${libro.titulo}</h6>
        <p class="card-text text-muted small">${libro.autores}</p>
        <p class="card-text text-muted small">${libro.anio}</p>
        <a href="libro.html" class="btn btn-outline-dark btn-sm mt-auto">Ver más</a>
        </div>
    </div>
    </div>
`;
}

document.addEventListener("DOMContentLoaded", () => {
const formulario = document.getElementById("form-busqueda");

if (!formulario) return;

const inputBusqueda = document.getElementById("input-busqueda");
const resultados = document.getElementById("resultados");
const spinner = document.getElementById("spinner");
const contador = document.getElementById("contador-resultados");

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const query = inputBusqueda.value.trim();
    if (!query) return;

    spinner.style.display = "block";
    resultados.innerHTML = "";
    contador.textContent = "";

    try {
    const libros = await buscarLibros(query);

    spinner.style.display = "none";

    if (libros.length === 0) {
        resultados.innerHTML = `
        <div class="col-12 text-center py-5">
            <p class="text-muted">No encontramos resultados para "<strong>${query}</strong>"</p>
        </div>`;
        return;
    }

    contador.textContent = `${libros.length} resultados para "${query}"`;

    resultados.innerHTML = libros.map(crearCardHTML).join("");

    } catch (error) {
    spinner.style.display = "none";
    resultados.innerHTML = `
        <div class="col-12">
        <div class="alert alert-danger">❌ Error: ${error.message}</div>
        </div>`;
    }
});
});