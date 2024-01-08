function reemplazarParrafo() {
  // 1.- Obtener una referencia al div contenedor
  		var miDiv = document.getElementById('miDiv');

  // 2.- Crear un nuevo párrafo
  		var nuevoParrafo = document.createElement('p');
  		nuevoParrafo.textContent = 'Este es el párrafo nuevo';

  // 3.- Obtener una referencia al párrafo inicial
  	var parrafoInicial = document.getElementById('parrafoInicial');

  // 4.- Reemplazar el párrafo antiguo con el nuevo párrafo
  	miDiv.replaceChild(nuevoParrafo, parrafoInicial);
}
