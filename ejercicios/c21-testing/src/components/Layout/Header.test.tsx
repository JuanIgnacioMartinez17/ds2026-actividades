import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import type { AuthContextType } from '../../context/AuthContext';
import type { Usuario } from '../../types/sesion';

function renderHeader(usuario: Usuario | null) {
    const auth: AuthContextType = {
        usuario,
        cargando: false,
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
        login: vi.fn().mockResolvedValue(undefined),
        logout: vi.fn(),
    };

    return render(
        <MemoryRouter>
            <AuthContext.Provider value={auth}>
                <Header />
            </AuthContext.Provider>
        </MemoryRouter>,
    );
}

describe('Header según el rol', () => {
    it('sin sesión muestra Ingresar y oculta Nuevo libro', () => {
        renderHeader(null);

        expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
    });

    it('CLIENTE ve su saludo y no ve el enlace Nuevo libro', () => {
        renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });

        expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
    });

    it('ADMIN ve el enlace Nuevo libro', () => {
        renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });

        expect(screen.getByRole('link', { name: 'Nuevo libro' })).toBeInTheDocument();
    });
});