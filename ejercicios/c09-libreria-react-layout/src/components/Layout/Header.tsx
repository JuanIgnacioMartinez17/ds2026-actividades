import { Container, Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="#">📖 Librería</Navbar.Brand>
        <Nav className="ms-auto">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">Catálogo</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    );
}

export default Header;