import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { LibroCardProps } from '../types/libro';

function Catalogo() {
    const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros.json');

    if (loading) {
    return (
        <Container className="my-5 text-center">
        <Spinner animation="border" />
        </Container>
    );
    }

    if (error) {
    return (
        <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        </Container>
    );
    }

    return (
    <Container className="my-5">
        <h2 className="mb-4">Catálogo completo</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
        {(libros ?? []).map((libro) => (
            <Col key={libro.id}>
            <LibroCard {...libro} />
            </Col>
        ))}
        </Row>
    </Container>
    );
}

export default Catalogo;