interface Usuario {
    id: number;
    name: string;
    email: string;
}

const listaUI = document.getElementById('lista-usuarios') as HTMLUListElement;
const cargandoUI = document.getElementById('cargando') as HTMLParagraphElement;
const errorUI = document.getElementById('error') as HTMLParagraphElement;

async function renderUsuarios() {
    try {
        cargandoUI.style.display = 'block';
        errorUI.style.display = 'none';

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error();

        const usuarios: Usuario[] = await response.json();

        usuarios.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
            listaUI.appendChild(li);
        });

    } catch (error) {
        errorUI.style.display = 'block'; 
    } finally {
        cargandoUI.style.display = 'none'; 
    }
}

renderUsuarios();