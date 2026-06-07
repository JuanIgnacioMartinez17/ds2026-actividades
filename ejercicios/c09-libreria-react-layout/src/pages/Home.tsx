import { Container, Row, Col, Button } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/libro';

const libros: LibroCardProps[] = [
    { id: 1, titulo: 'Cien años de soledad',      autor: 'Gabriel García Márquez',  imagen: 'https://covers.openlibrary.org/b/isbn/9780307947352-M.jpg' },
    { id: 2, titulo: 'El nombre del viento',       autor: 'Patrick Rothfuss',         imagen: 'https://covers.openlibrary.org/b/isbn/9788408117117-M.jpg' },
    { id: 3, titulo: 'El guardián en el centeno',  autor: 'J.D. Salinger',            imagen: 'https://covers.openlibrary.org/b/isbn/9780316769174-M.jpg' },
    { id: 4, titulo: '1984',                       autor: 'George Orwell',            imagen: 'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg' },
    { id: 5, titulo: 'El principito',              autor: 'Antoine de Saint-Exupéry', imagen: 'https://covers.openlibrary.org/b/isbn/9780156013987-M.jpg' },
    { id: 6, titulo: 'Don Quijote de la Mancha',   autor: 'Miguel de Cervantes',      imagen: 'https://covers.openlibrary.org/b/isbn/9788420412146-M.jpg' },
];

function Home() {
    return (
    <>
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
            {libros.map((libro) => (
            <Col key={libro.id}>
                <LibroCard {...libro} />
            </Col>
            ))}
        </Row>
        </Container>
    </>
    );
}

export default Home;