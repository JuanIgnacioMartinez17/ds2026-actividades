import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/libro';
import LibroPortada from './LibroPortada';

function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
    const [likes, setLikes] = useState<number>(0);

    return (
    <Card className="h-100">
        <LibroPortada
            titulo={titulo}
            autor={autor.nombre}
            imagen={imagen}
            className="w-100"
            style={{
                aspectRatio: '2 / 3',
                objectFit: 'contain',
                backgroundColor: '#f8f9fa',
                display: 'block',
            }}
        />
        <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fs-6">{titulo}</Card.Title>
        <Card.Text className="text-muted small">{autor.nombre}</Card.Text>
        <Card.Text className="fw-bold fs-5 mb-4">${precio.toLocaleString('es-AR')}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
            <Link className="btn btn-dark btn-sm" to={`/libros/${id}`}>
                Ver más
            </Link>
            <Button
                variant="outline-danger"
                size="sm"
                aria-label={`Marcar como favorito a ${titulo}`}
                aria-pressed={likes > 0}
                onClick={() => setLikes(likes + 1)}
            >
            <span aria-hidden="true">♡</span> {likes}
            </Button>
        </div>
        </Card.Body>
    </Card>
    );
}

export default LibroCard;