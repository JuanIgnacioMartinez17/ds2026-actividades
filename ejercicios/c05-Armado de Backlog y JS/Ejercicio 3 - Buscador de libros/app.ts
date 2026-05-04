interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const input = document.getElementById('inputBusqueda') as HTMLInputElement;
const btn = document.getElementById('btnBuscar') as HTMLButtonElement;
const contenedor = document.getElementById('resultados') as HTMLDivElement;
const msgError = document.getElementById('msgError') as HTMLParagraphElement;

btn.addEventListener('click', async () => {
    const query = input.value.trim();

    if (!query) {
        msgError.innerText = "Por favor, ingresa un término de búsqueda.";
        msgError.style.display = "block";
        return;
    }

    msgError.style.display = "none";
    contenedor.innerHTML = "Buscando...";

    try {
        const resp = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await resp.json();
        const libros: LibroOL[] = data.docs.slice(0, 10); 

        contenedor.innerHTML = ""; 

        libros.forEach(libro => {
            const card = document.createElement('div');
            card.className = 'card';

            const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
            const anio = libro.first_publish_year || "N/A";

            card.innerHTML = `
                <h3>${libro.title}</h3>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Año:</strong> ${anio}</p>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        contenedor.innerHTML = "Error al conectar con la API.";
    }
});