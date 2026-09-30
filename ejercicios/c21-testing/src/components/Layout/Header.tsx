import { useEffect } from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario, logout, tieneRol } = useAuth();

    useEffect(() => {
    const titulos: Record<string, string> = {
        '/': 'Inicio | Librería',
        '/catalogo': 'Catálogo | Librería',
        '/libros/nuevo': 'Nuevo libro | Librería',
        '/login': 'Iniciar sesión | Librería',
        '/sin-permiso': 'Acceso denegado | Librería',
    };
    document.title = titulos[location.pathname]
        ?? (location.pathname.startsWith('/libros/') ? 'Detalle del libro | Librería' : 'Librería');
    }, [location.pathname]);

    const manejarSesion = () => {
        if (usuario) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
    <Navbar bg="dark" variant="dark" expand="lg" className="site-header">
        <Container>
        <Navbar.Brand as={Link} to="/" className="site-brand">
            <span aria-hidden="true">📖</span> Librería
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="site-navigation" />
        <Navbar.Collapse id="site-navigation">
        <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>}
            {usuario && <Navbar.Text className="me-3">Hola, {usuario.nombre}</Navbar.Text>}
            <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                {usuario ? 'Salir' : 'Ingresar'}
            </Button>
        </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Header;