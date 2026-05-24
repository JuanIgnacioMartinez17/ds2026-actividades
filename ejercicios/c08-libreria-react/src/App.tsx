import { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';

type LibroCardProps = {
  titulo: string;
  autor: string;
  imagen: string;
};

type FooterProps = {
  nombre: string;
  anio: number;
};

function NavbarPrincipal() {
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

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imagen} alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{titulo}</Card.Title>
        <Card.Text className="text-muted small">{autor}</Card.Text>
        <div className="mt-auto d-flex justify-content-between">
          <Button variant="outline-dark" size="sm">Ver más</Button>
          <Button variant="outline-danger" size="sm" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function Footer({ nombre, anio }: FooterProps) {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© {anio} {nombre}. Todos los derechos reservados.</p>
    </footer>
  );
}

const libros: LibroCardProps[] = [
  { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', imagen: 'https://covers.openlibrary.org/b/isbn/9780307947352-M.jpg' },
  { titulo: 'El nombre del viento',  autor: 'Patrick Rothfuss',        imagen: 'https://covers.openlibrary.org/b/isbn/9788408117117-M.jpg' },
  { titulo: 'El guardián en el centeno', autor: 'J.D. Salinger',       imagen: 'https://covers.openlibrary.org/b/isbn/9780316769174-M.jpg' },
  { titulo: '1984',                  autor: 'George Orwell',           imagen: 'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg' },
  { titulo: 'El principito',         autor: 'Antoine de Saint-Exupéry',imagen: 'https://covers.openlibrary.org/b/isbn/9780156013987-M.jpg' },
  { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes',  imagen: 'https://covers.openlibrary.org/b/isbn/9788420412146-M.jpg' },
];

function App() {
  return (
    <>
      <NavbarPrincipal />

      <section className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">📚 Bienvenido a la Librería</h1>
          <p className="lead mt-3">Descubrí miles de títulos de todos los géneros.</p>
          <Button variant="warning" size="lg" className="mt-3">Ver catálogo</Button>
        </Container>
      </section>

      <Container className="my-5">
        <h2 className="mb-4">Destacados de la semana</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
          {libros.map((libro, i) => (
            <Col key={i}>
              <LibroCard titulo={libro.titulo} autor={libro.autor} imagen={libro.imagen} />
            </Col>
          ))}
        </Row>
      </Container>

      <Footer nombre="Librería" anio={2026} />
    </>
  );
}

export default App;