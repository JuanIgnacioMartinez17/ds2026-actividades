const botonAgregar = document.querySelector('#botonAgregar');
const inputProducto = document.querySelector('#inputProducto');
const listaProducto = document.querySelector('#listaProductos');
const contador = document.querySelector('#contador');
const error = document.querySelector('#error');

let cantidadProductos = 0;

botonAgregar.addEventListener('click', function() {
    const nombreProducto = inputProducto.value;

    if (!nombreProducto) {
        error.textContent = 'Error: el nombre del producto no puede estar vacio';
        return;
    }

    error.textContent = '';
    
    const li = document.createElement('li');
    li.textContent = nombreProducto;
    
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', function() {
        li.remove();
        cantidadProductos -= 1;
        ActualizarContador();
    })

    li.appendChild(botonEliminar);
    listaProducto.appendChild(li);

    cantidadProductos += 1;
    ActualizarContador();

    inputProducto.value = '';
});

function ActualizarContador() {
    contador.textContent = `${cantidadProductos} productos en la lista `;
}

