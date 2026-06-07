import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function LibroDetalle() {
    const { id } = useParams<{ id: string }>();

    return (
    <Container className="my-5">
        <h2>Detalle del libro #{id}</h2>
        <p>Acá iría la información completa del libro con id {id}.</p>
    </Container>
    );
}

export default LibroDetalle;
