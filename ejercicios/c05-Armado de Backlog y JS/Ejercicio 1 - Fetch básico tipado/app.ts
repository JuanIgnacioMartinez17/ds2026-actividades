interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }

        // Tipamos la respuesta como Usuario[] [cite: 3]
        const usuarios: Usuario[] = await response.json();
        return usuarios;
    } catch (error) {
        console.error("Hubo un error:", error);
        throw error;
    }
}

obtenerUsuarios().then(usuarios => {
    usuarios.forEach(user => {
        console.log(`Nombre: ${user.name} | Email: ${user.email}`);
    });
}).catch(err => console.error("Error en la llamada:", err));