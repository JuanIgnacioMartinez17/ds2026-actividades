export type Rol = 'ADMIN' | 'CLIENTE';

export interface Usuario {
    id: number;
    email: string;
    nombre: string;
    rol: Rol;
}

export interface Sesion {
    token: string;
    usuario: Usuario;
}