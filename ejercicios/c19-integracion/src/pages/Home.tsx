import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function Home() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

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

        {loading && (
            <div className="text-center">
            <Spinner animation="border" />
            </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
            <Row xs={1} sm={2} md={3} className="g-4">
            {(libros ?? []).slice(0, 3).map((libro) => (
                <Col key={libro.id}>
                <LibroCard {...libro} />
                </Col>
            ))}
            </Row>
        )}
        </Container>
    </>
    );
}

export default Home;