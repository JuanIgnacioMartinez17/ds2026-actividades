import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { libros } from '../data/libros';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();
    const libro = libros.find((l) => l.id === Number(id));

    if (!libro) {
    return (
        <Container className="my-5">
        <h2>Libro no encontrado</h2>
        <Link to="/catalogo">
            <Button variant="dark" className="mt-3">Volver al catálogo</Button>
        </Link>
        </Container>
    );
    }

    return (
    <Container className="my-5">
        <Row>
        <Col md={4}>
            <img
            src={libro.imagen}
            alt={libro.titulo}
            className="img-fluid rounded"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Sin+imagen';
            }}
            />
        </Col>
        <Col md={8}>
            <h2>{libro.titulo}</h2>
            <p className="text-muted fs-5">{libro.autor}</p>
            <p><Badge bg="secondary">{libro.genero}</Badge></p>
            <p><strong>Año:</strong> {libro.anio}</p>
            <p><strong>Sinopsis:</strong> {libro.sinopsis}</p>
            <Link to="/catalogo">
            <Button variant="dark" className="mt-3">Volver al catálogo</Button>
            </Link>
        </Col>
        </Row>
    </Container>
    );
}

export default LibroDetalle;

