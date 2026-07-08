import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroCardProps } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

interface Props {
    onAgregar: (libro: LibroCardProps) => void;
}

function LibroNuevo({ onAgregar }: Props) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
    titulo: '',
    autor: '',
    anio: '',
    genero: '',
    sinopsis: '',
    });

    const [errores, setErrores] = useState<Record<string, string>>({});

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
        const nuevosErrores: Record<string, string> = {};
        for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
        }
        setErrores(nuevosErrores);
        return;
    }

    setErrores({});

    onAgregar({
        id: Date.now(),
        imagen: IMG_PLACEHOLDER,
        ...resultado.data,
    });

    navigate('/catalogo');
    };

    return (
    <Container className="my-5" style={{ maxWidth: 480 }}>
        <h2 className="mb-4">Nuevo libro</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            isInvalid={!!errores.titulo}
            />
            <Form.Control.Feedback type="invalid">
            {errores.titulo}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
            name="autor"
            value={form.autor}
            onChange={handleChange}
            isInvalid={!!errores.autor}
            />
            <Form.Control.Feedback type="invalid">
            {errores.autor}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Año</Form.Label>
            <Form.Control
            type="number"
            name="anio"
            value={form.anio}
            onChange={handleChange}
            isInvalid={!!errores.anio}
            />
            <Form.Control.Feedback type="invalid">
            {errores.anio}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Control
            name="genero"
            value={form.genero}
            onChange={handleChange}
            isInvalid={!!errores.genero}
            />
            <Form.Control.Feedback type="invalid">
            {errores.genero}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Sinopsis</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            name="sinopsis"
            value={form.sinopsis}
            onChange={handleChange}
            isInvalid={!!errores.sinopsis}
            />
            <Form.Control.Feedback type="invalid">
            {errores.sinopsis}
            </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Agregar libro</Button>
        </Form>
    </Container>
    );
}

export default LibroNuevo;