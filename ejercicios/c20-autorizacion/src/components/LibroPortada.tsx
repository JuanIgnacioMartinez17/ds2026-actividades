import { useState, type CSSProperties } from 'react';

interface LibroPortadaProps {
    titulo: string;
    autor: string;
    imagen: string;
    className?: string;
    style?: CSSProperties;
}

function LibroPortada({ titulo, autor, imagen, className = '', style }: LibroPortadaProps) {
    const [imagenError, setImagenError] = useState(false);

    if (imagenError || !imagen) {
        return (
            <div
                className={`bg-dark text-white d-flex flex-column justify-content-center align-items-center text-center p-4 ${className}`}
                role="img"
                aria-label={`Portada de ${titulo}, por ${autor}`}
                style={{ minHeight: '200px', ...style }}
            >
                <span className="text-warning small mb-2">LIBRERÍA</span>
                <span className="fw-semibold">{titulo}</span>
            </div>
        );
    }

    return (
        <img
            src={imagen}
            alt={`Portada de ${titulo}`}
            className={className}
            style={style}
            loading="lazy"
            decoding="async"
            onError={() => setImagenError(true)}
        />
    );
}

export default LibroPortada;