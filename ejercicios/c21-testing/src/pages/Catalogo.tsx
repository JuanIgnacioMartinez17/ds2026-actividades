import { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function normalizarTexto(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

function Catalogo() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
    const [busqueda, setBusqueda] = useState('');
    const termino = normalizarTexto(busqueda.trim());
    const librosFiltrados = (libros ?? []).filter((libro) =>
        normalizarTexto(`${libro.titulo} ${libro.autor.nombre}`).includes(termino)
    );

    if (loading) {
    return (
        <Container className="my-5 text-center">
        <Spinner animation="border" role="status" aria-label="Cargando catálogo" />
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
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
            <h1 className="h2 mb-1">Catálogo</h1>
            <p className="text-muted mb-0" aria-live="polite">
            {librosFiltrados.length} de {(libros ?? []).length} {(libros ?? []).length === 1 ? 'libro' : 'libros'}
            </p>
        </div>
        <Form role="search" className="w-100" style={{ maxWidth: '24rem' }}>
            <Form.Label htmlFor="buscar-libro" className="visually-hidden">
            Buscar por título o autor
            </Form.Label>
            <Form.Control
            id="buscar-libro"
            type="search"
            placeholder="Buscar por título o autor"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            />
        </Form>
        </div>
        {librosFiltrados.length > 0 ? (
        <Row xs={1} sm={2} md={3} className="g-4">
        {librosFiltrados.map((libro) => (
            <Col key={libro.id}>
            <LibroCard {...libro} />
            </Col>
        ))}
        </Row>
        ) : (
        <div className="py-5 text-center" role="status">
            <h2 className="h5">
            {(libros ?? []).length === 0 ? 'Todavía no hay libros publicados' : 'No encontramos coincidencias'}
            </h2>
            <p className="text-muted mb-0">
            {(libros ?? []).length === 0
                ? 'Cuando se agreguen libros, aparecerán en este catálogo.'
                : 'Probá con otro título o nombre de autor.'}
            </p>
        </div>
        )}
    </Container>
    );
}

export default Catalogo;