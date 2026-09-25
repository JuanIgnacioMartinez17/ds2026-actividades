import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SinPermiso() {
    return (
        <Alert variant="warning">
            <Alert.Heading>Sin permiso</Alert.Heading>
            <p>Tu cuenta no tiene permiso para acceder a esta página.</p>
            <Link to="/catalogo">Volver al catálogo</Link>
        </Alert>
    );
}

export default SinPermiso;