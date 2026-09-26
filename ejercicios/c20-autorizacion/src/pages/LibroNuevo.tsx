import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import type { Autor, Libro } from '../types/libro';

function LibroNuevo() {
    const navigate = useNavigate();
    const { data: autores, loading: cargandoAutores } = useFetch<Autor[]>('/autores');

    const [form, setForm] = useState({
    titulo: '',
    autorId: '',
    precio: '',
    imagen: '',
    disponible: true,
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorApi, setErrorApi] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);

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
    setEnviando(true);

    try {
        await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
        });
        navigate('/catalogo');
    } catch (e) {
        setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
        setEnviando(false);
    }
    };

    return (
    <Container className="my-5 auth-page" style={{ maxWidth: 480 }}>
        <h2 className="mb-4">Nuevo libro</h2>

        {errorApi && <Alert variant="danger">{errorApi}</Alert>}

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
            <Form.Select
            name="autorId"
            value={form.autorId}
            onChange={handleChange}
            isInvalid={!!errores.autorId}
            disabled={cargandoAutores}
            >
            <option value="">Seleccioná un autor</option>
            {(autores ?? []).map((autor) => (
                <option key={autor.id} value={autor.id}>{autor.nombre}</option>
            ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
            {errores.autorId}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            isInvalid={!!errores.precio}
            />
            <Form.Control.Feedback type="invalid">
            {errores.precio}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
            type="url"
            name="imagen"
            placeholder="https://..."
            value={form.imagen}
            onChange={handleChange}
            isInvalid={!!errores.imagen}
            />
            <Form.Control.Feedback type="invalid">
            {errores.imagen}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Check
            type="checkbox"
            label="Disponible"
            name="disponible"
            checked={form.disponible}
            onChange={handleChange}
            />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={enviando || cargandoAutores}>
            {enviando ? 'Guardando...' : 'Agregar libro'}
        </Button>
        </Form>
    </Container>
    );
}

export default LibroNuevo;