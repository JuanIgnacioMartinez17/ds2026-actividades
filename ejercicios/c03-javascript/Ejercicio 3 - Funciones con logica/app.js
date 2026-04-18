function CalcularPrecioFinal(monto, medioPago) {
    if (monto < 200) {
        return monto;
    }
    else if (monto <= 400) {
        if (medioPago === 'E') {
            return monto * 0.70;
        }
        else if (medioPago === 'D') {
            return monto * 0.80;
        }
        else {
            return monto * 0.90;
        }
    } else {
        return monto * 0.60;
    }
}

const r1 = CalcularPrecioFinal(100, 'E');
console.log(`Monto: $100 | Medio de pago: Efectivo | Precio final: $${r1}`);

const r2 = CalcularPrecioFinal(300, 'E');
console.log(`Monto: $300 | Medio de pago: Efectivo | Precio final: $${r2}`);

const r3 = CalcularPrecioFinal(300, 'D');
console.log(`Monto: $300 | Medio de pago: Debito | Precio final: $${r3}`);

const r4 = CalcularPrecioFinal(300, 'C');
console.log(`Monto: $300 | Medio de pago: Credito | Precio final: $${r4}`);

const r5 = CalcularPrecioFinal(500, 'D');
console.log(`Monto: $500 | Medio de pago: Debito | Precio final: $${r5}`);
