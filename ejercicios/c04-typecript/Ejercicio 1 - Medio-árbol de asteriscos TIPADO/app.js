"use strict";
const botonGenerar = document.querySelector('#botonGenerar');
const inputAños = document.querySelector('#inputAños');
const resultado = document.querySelector('#resultado');
const error = document.querySelector('#error');
botonGenerar.addEventListener('click', function () {
    const años = parseInt(inputAños.value);
    if (!inputAños.value || años < 1) {
        error.textContent = 'Error: ingrese un numero mayor a 0';
        resultado.textContent = '';
        return;
    }
    error.textContent = '';
    let arbol = '';
    for (let i = 1; i <= años; i++) {
        arbol += GenerarAsteriscos(i) + '\n';
    }
    resultado.textContent = arbol;
});
function GenerarAsteriscos(n) {
    let arbol = '';
    for (let i = 0; i < n; i++) {
        arbol += '*';
    }
    return arbol;
}
