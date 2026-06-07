import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand as={Link} to="/">📖 Librería</Navbar.Brand>
        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    );
}

export default Header;
