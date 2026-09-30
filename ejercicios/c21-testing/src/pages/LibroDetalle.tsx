import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import LibroPortada from '../components/LibroPortada';
import type { Libro } from '../types/libro';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();
    const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

    if (loading) {
    return (
        <Container className="my-5 text-center">
        <Spinner animation="border" role="status" aria-label="Cargando libro" />
        </Container>
    );
    }

    if (error || !libro) {
    return (
        <Container className="my-5">
        <h2>Libro no encontrado</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Link to="/catalogo" className="btn btn-dark mt-3">Volver al catálogo</Link>
        </Container>
    );
    }

    return (
    <Container className="my-5">
        <Row>
        <Col md={4}>
            <LibroPortada
                titulo={libro.titulo}
                autor={libro.autor.nombre}
                imagen={libro.imagen}
                className="img-fluid rounded w-100"
                style={{
                    aspectRatio: '2 / 3',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa',
                }}
            />
        </Col>
        <Col md={8}>
            <h2>{libro.titulo}</h2>
            <p className="text-muted fs-5">{libro.autor.nombre}</p>
            <p><strong>Precio:</strong> ${libro.precio.toLocaleString('es-AR')}</p>
            <p><strong>Disponible:</strong> {libro.disponible ? 'Sí' : 'No'}</p>
            <Link to="/catalogo" className="btn btn-dark mt-3">Volver al catálogo</Link>
        </Col>
        </Row>
    </Container>
    );
}

export default LibroDetalle;