import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();
    const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

    if (loading) {
    return (
        <Container className="my-5 text-center">
        <Spinner animation="border" />
        </Container>
    );
    }

    if (error || !libro) {
    return (
        <Container className="my-5">
        <h2>Libro no encontrado</h2>
        {error && <Alert variant="danger">{error}</Alert>}
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
            <p className="text-muted fs-5">{libro.autor.nombre}</p>
            <p><strong>Precio:</strong> ${libro.precio}</p>
            <p><strong>Disponible:</strong> {libro.disponible ? 'Sí' : 'No'}</p>
            <Link to="/catalogo">
            <Button variant="dark" className="mt-3">Volver al catálogo</Button>
            </Link>
        </Col>
        </Row>
    </Container>
    );
}

export default LibroDetalle;