const cuentaCarritoElement = document.getElementById("cuenta-carrito");


function agregarAlCarrito(producto) {

  let memoria = JSON.parse(localStorage.getItem("zapatillas")) || [];
  let cantidadProductoFinal;

  if (!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("zapatillas", JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {

    const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
    const nuevaMemoria = memoria;

    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {

      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("zapatillas", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}


function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("zapatillas")) || [];
  const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("zapatillas", JSON.stringify(memoria));

}


function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}


function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("zapatillas")) || [];
  if (memoria && memoria.length > 0) {
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}


function reiniciarCarrito() {
  localStorage.removeItem("zapatillas");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();