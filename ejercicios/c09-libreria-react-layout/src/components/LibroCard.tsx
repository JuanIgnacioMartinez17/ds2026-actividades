import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { LibroCardProps } from '../types/libro';

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
    const [likes, setLikes] = useState<number>(0);

    return (
    <Card className="h-100">
        <Card.Img variant="top" src={imagen} alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{titulo}</Card.Title>
        <Card.Text className="text-muted small">{autor}</Card.Text>
        <div className="mt-auto d-flex justify-content-between">
            <Button variant="outline-dark" size="sm">Ver más</Button>
            <Button variant="outline-danger" size="sm" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes}
            </Button>
        </div>
        </Card.Body>
    </Card>
    );
}

export default LibroCard;