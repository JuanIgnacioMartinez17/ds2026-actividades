import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion';
import type { Rol, Sesion, Usuario } from '../types/sesion';

interface Credenciales {
    email: string;
    password: string;
}

export interface AuthContextType {
    usuario: Usuario | null;
    cargando: boolean;
    estaAutenticado: boolean;
    tieneRol: (rol: Rol) => boolean;
    login: (credenciales: Credenciales) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(obtenerToken() !== null);

    const logout = useCallback(() => {
        borrarToken();
        setUsuario(null);
    }, []);

    useEffect(() => {
        window.addEventListener('sesion-expirada', logout);
        return () => window.removeEventListener('sesion-expirada', logout);
    }, [logout]);

    useEffect(() => {
        if (!obtenerToken()) return;

        apiFetch<Usuario>('/auth/yo')
            .then(setUsuario)
            .catch(() => {
                borrarToken();
                setUsuario(null);
            })
            .finally(() => setCargando(false));
    }, []);

    const login = async (credenciales: Credenciales) => {
        const sesion = await apiFetch<Sesion>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credenciales),
        });
        guardarToken(sesion.token);
        setUsuario(sesion.usuario);
    };

    const tieneRol = (rol: Rol) => usuario?.rol === rol;

    return (
        <AuthContext.Provider
            value={{
                usuario,
                cargando,
                estaAutenticado: usuario !== null,
                tieneRol,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return context;
}