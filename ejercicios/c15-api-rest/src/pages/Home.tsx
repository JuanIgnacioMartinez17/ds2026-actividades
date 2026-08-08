import { Container, Row, Col, Button } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

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
