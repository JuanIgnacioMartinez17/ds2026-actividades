import { useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    useEffect(() => {
    const titulos: Record<string, string> = {
        '/': 'Inicio | Librería',
        '/catalogo': 'Catálogo | Librería',
        '/libros/nuevo': 'Nuevo libro | Librería',
    };
    document.title = titulos[location.pathname] ?? 'Librería';
    }, [location.pathname]);

    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand as={Link} to="/">📖 Librería</Navbar.Brand>
        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    );
}

export default Header;