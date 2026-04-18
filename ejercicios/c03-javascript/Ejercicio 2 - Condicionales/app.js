function ClasificarNota(nota)
{
    if (nota < 4) {
        return 'Desaprobado';
    }
    else if (nota <= 7) {
        return 'Aprobado';
    }
    else {
        return 'Promocionado';
    }
}

function DiaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return 'Lunes';
            break;
        case 2:
            return 'Martes';
            break;
        case 3:
            return 'Miercoles';
            break;
        case 4:
            return 'Jueves';
            break;
        case 5:
            return 'Viernes';
            break;
        case 6:
            return 'Sabado';
            break;
        case 7:
            return 'Domingo';
            break;
        default:
            return 'Dia invalido';
            break;
    }
}

console.log(ClasificarNota(2));
console.log(ClasificarNota(5));
console.log(ClasificarNota(9));

console.log(DiaDeLaSemana(1));
console.log(DiaDeLaSemana(3));
console.log(DiaDeLaSemana(6));
console.log(DiaDeLaSemana(9));

