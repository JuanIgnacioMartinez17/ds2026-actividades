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
    };
    document.title = titulos[location.pathname] ?? 'Librería';
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
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand as={Link} to="/">📖 Librería</Navbar.Brand>
        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>}
            {usuario && <Navbar.Text className="me-3">Hola, {usuario.nombre}</Navbar.Text>}
            <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                {usuario ? 'Salir' : 'Ingresar'}
            </Button>
        </Nav>
        </Container>
    </Navbar>
    );
}

export default Header;