const numeros = [5, 12, 3, 48, 7, 23, 1, 36]

let total = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const num of numeros) {
    total += num;

    if (num > mayor) {
        mayor = num;
    }

    if (num < menor) {
        menor = num;
    }
}

const promedio = total / numeros.length;

console.log(`Suma total: ${total}`);
console.log(`Promedio: ${promedio}`);
console.log(`Numero mayor: ${mayor}`);
console.log(`Numero menor: ${menor}`);

function GenerarAsteriscos(n) {
    let resultado = '';

    for (let i = 0; i < n; i++) {
        resultado += '*';
    }
    return resultado;
}

console.log(GenerarAsteriscos(3));
console.log(GenerarAsteriscos(6));
console.log(GenerarAsteriscos(10));