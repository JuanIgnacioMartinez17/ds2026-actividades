const botonGenerar = document.querySelector('#botonGenerar') as HTMLElement;
const inputAños = document.querySelector('#inputAños') as HTMLInputElement;
const resultado = document.querySelector('#resultado') as HTMLElement;
const error = document.querySelector('#error') as HTMLElement;

botonGenerar.addEventListener('click', function(){
    const años: number = parseInt(inputAños.value);

    if (!inputAños.value || años < 1) {
        error.textContent = 'Error: ingrese un numero mayor a 0';
        resultado.textContent = '';
        return;
    }
    error.textContent = '';

    let arbol: string = '';
    for (let i = 1; i <= años; i++){
        arbol += GenerarAsteriscos(i) + '\n';
    }
    
    resultado.textContent = arbol;
});

function GenerarAsteriscos(n: number): string {
    let arbol: string = '';
    for (let i: number = 0; i < n; i++) {
        arbol += '*';
    }
    return arbol;
}