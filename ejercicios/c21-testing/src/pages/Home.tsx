import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function Home() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

    return (
    <>
        <section className="home-hero bg-dark text-white py-5">
        <Container>
            <p className="eyebrow mb-3">LECTURAS PARA CADA MOMENTO</p>
            <h1 className="display-4 fw-bold">Tu próxima historia empieza acá.</h1>
            <p className="lead mt-3">Explorá el catálogo y encontrá tu próxima lectura.</p>
            <Link className="btn btn-warning btn-lg mt-3" to="/catalogo">Ver catálogo</Link>
        </Container>
        </section>

        <Container className="my-5">
        <h2 className="mb-4 text-dark">Libros del catálogo</h2>

        {loading && (
            <div className="text-center py-5" role="status">
            <Spinner animation="border" aria-hidden="true" />
            <span className="visually-hidden">Cargando libros...</span>
            </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
            (libros ?? []).length === 0 ? (
            <Alert variant="light" className="text-center">
                Todavía no hay libros cargados.
            </Alert>
            ) : (
            <Row xs={1} sm={2} md={3} className="g-4">
            {(libros ?? []).slice(0, 3).map((libro) => (
                <Col key={libro.id}>
                <LibroCard {...libro} />
                </Col>
            ))}
            </Row>
                )
        )}
        </Container>
    </>
    );
}

export default Home;