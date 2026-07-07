import { Container, Row, Col } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

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

