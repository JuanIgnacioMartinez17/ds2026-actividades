import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    const token = obtenerToken();
    const res = await fetch(`${BASE}${ruta}`, {
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...opciones.headers,
        },
    });

    const cuerpo = await res.json().catch(() => null); // el 404 de ruta viene en HTML
    if (res.status === 401 && token) {
        window.dispatchEvent(new Event('sesion-expirada'));
    }
    if (!res.ok) throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
    if (cuerpo === null) throw new ApiError(res.status, "La API respondió con contenido inválido");
    return cuerpo as T;
}