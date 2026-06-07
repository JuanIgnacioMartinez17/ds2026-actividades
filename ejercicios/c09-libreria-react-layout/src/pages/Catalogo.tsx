import { Container, Row, Col } from 'react-bootstrap';
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

function Catalogo() {
    return (
    <Container className="my-5">
        <h2 className="mb-4">Catálogo completo</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
        {libros.map((libro) => (
            <Col key={libro.id}>
            <LibroCard {...libro} />
            </Col>
        ))}
        </Row>
    </Container>
    );
}

export default Catalogo;
