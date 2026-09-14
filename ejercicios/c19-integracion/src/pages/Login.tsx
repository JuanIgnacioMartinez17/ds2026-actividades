import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { loginSchema } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import type { Sesion } from '../types/sesion';

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorApi, setErrorApi] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorApi(null);

        const resultado = loginSchema.safeParse(form);

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
            const sesion = await apiFetch<Sesion>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(resultado.data),
            });
            guardarToken(sesion.token);
            navigate('/catalogo');
        } catch (e) {
            setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: 400 }}>
            <h2 className="mb-4">Iniciar sesión</h2>

            {errorApi && <Alert variant="danger">{errorApi}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        isInvalid={!!errores.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" disabled={enviando}>
                    {enviando ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </Form>
        </Container>
    );
}

export default Login;