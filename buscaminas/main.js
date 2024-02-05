// VARIABLES GLOBALES
let filas = 13;
let cols = 13;
let lado = 22; // Lado de cada casilla
let bombas = 10;
let celdasBomba = []; // Almacena las celdas con bombas

function generarJuego() {
    document.getElementById("facil").addEventListener("click", modoFacil);
    document.getElementById("medio").addEventListener("click", modoMedio);
    document.getElementById("dificil").addEventListener("click", modoDificil);
    ponerBombas();
    generarTablero();
}

//DIFICULTADES DEL JUEGO
function modoFacil (){
    bombas = 5;
    filas = 13;
    cols = 13;
    generarJuego();
}

function modoMedio(){
    bombas = 10;
    filas = 14;
    cols = 14;
    generarJuego();
}

function modoDificil(){
    bombas = 25;
    filas = 16;
    cols = 16;
    generarJuego();
}

//GENERAR EL TABLERO
function generarTablero() {
    let tableroHTML = document.getElementById("tablero");
    // Limpiar el contenido existente antes de generar el nuevo tablero
    tableroHTML.innerHTML = "";

    for (let f = 0; f < filas; f++) {
        let fila = document.createElement("tr");
        for (let c = 0; c < cols; c++) {
            let celda = document.createElement("td");
            celda.className = "celda";
            celda.id = `celda-${c}-${f}`;
            celda.style.width = `${lado}px`;
            celda.style.height = `${lado}px`;

            // Añadir evento de click izquierdo a cada celda
            celda.addEventListener("click", function (event) {
                clickIzquierdo(event.target.id);
            });

            celda.addEventListener("contextmenu", function (event) {
                clickDerecho(event.target.id);
            });

            fila.appendChild(celda);
        }
        tableroHTML.appendChild(fila);
    }
}

function ponerBombas() {
    celdasBomba = [];
    let cont = 0;
    while (cont < bombas) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * cols);
        let id = `celda-${c}-${f}`; // Identificador Celda

        if (!celdasBomba.includes(id)) {
            celdasBomba.push(id);
            cont++;
        }
    }
}

function clickIzquierdo(idCelda) {
    let id = idCelda;
    let celda = document.getElementById(id);

    // Verificar si la celda ya ha sido pulsada o marcada con bandera
    if (celda.classList.contains("pulsada") || celda.classList.contains("bandera")) {
        return; // Salir de la función si la celda ya ha sido pulsada o marcada con bandera
    }

    celda.style.backgroundColor = "rgb(171, 170, 170)";
    
    // Verificar si la celda actual está en la lista de celdas con bombas
    if (celdasBomba.includes(id)) {
        // Si hay bomba, mostrar mensaje o realizar acción correspondiente
        celda.style.backgroundColor = "rgb(225, 111, 111)";
        celda.innerHTML = "<img class='bombas' src='images/bomba.png' alt='bomba'>";
        setTimeout(function () {
            // Damos la opción de jugar de nuevo o de salir de la partida
            confirm("BOMBA! HAS PERDIDO\nQuieres jugar de nuevo?") ? generarJuego() :
                document.getElementById("tablero").innerHTML = "GRACIAS POR JUGAR";
        }, 200);
    } else {
        abrirArea(parseInt(id.split('-')[1]), parseInt(id.split('-')[2]));
    }

    // Marcar la celda como pulsada y quitar el evento de clic derecho
    celda.classList.add("pulsada");
    celda.removeEventListener("contextmenu", function (event) {
        clickDerecho(event.target.id);
    });
}

function obtenerNumero(idCelda) {
    // Obtener las coordenadas de la celda a partir de su ID
    const coordenadas = idCelda.split('-');
    const c = parseInt(coordenadas[1]);
    const f = parseInt(coordenadas[2]);

    // Verificar si la celda actual tiene una bomba
    if (celdasBomba.includes(idCelda)) {
        // Si hay bomba, retornamos -1 para indicar que la celda contiene una bomba
        return -1;
    }

    let numeroBombas = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {//Comprobando los alrededores
            const nuevaFila = f + i;
            const nuevaColumna = c + j;

            // Verificar si la nueva posición está dentro de los límites del tablero
            if (nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < cols) {
                // Construir el ID de la celda vecina
                const idVecina = `celda-${nuevaColumna}-${nuevaFila}`;

                // Incrementar el contador si hay una bomba en la celda vecina
                if (celdasBomba.includes(idVecina)) {
                    numeroBombas++;
                }
            }
        }
    }

    // Retornar el número de bombas en la celda
    return numeroBombas;
}

function abrirArea(c, f) {
    // Se crea un array con las coordenadas de la celda
    const coordenadas = [{ c, f }];

    while (coordenadas.length > 0) { // Se ejecuta mientras que el array no esté vacío
        const { c, f } = coordenadas.shift(); // Se toma el primer objeto
        const idCelda = `celda-${c}-${f}`;
        const celda = document.getElementById(idCelda); // Id de la celda actual

        if (!celda || celda.classList.contains("pulsada")) { // Se verifica si la celda no existe o ya ha sido pulsada
            continue;
        }

        const numero = obtenerNumero(idCelda); // Se obtiene el numero de las bombas cercanas

        if (numero === 0) { //Solo entra si no hay bombas cerca
            // Aquí es donde abrimos las celdas cercanas cambiando el fondo de color y considerándolas pulsadas
            celda.classList.add("pulsada"); // Añadimos las celdas desbloqueadas a la lista de las celdas pulsadas
            celda.style.backgroundColor = "rgb(171, 170, 170)";

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const nuevaC = c + i;
                    const nuevaF = f + j;

                    if (nuevaC >= 0 && nuevaC < cols && nuevaF >= 0 && nuevaF < filas) {
                        coordenadas.push({ c: nuevaC, f: nuevaF }); //Se añade la siguiente celda
                    }
                }
            }
        } else if (numero > 0) { //Entra aquí cuando aparece una bomba cerca
            // Aquí se tratan las celdas con bombas cerca, dando color a sus números y poniendo el número correcto
            celda.classList.add("pulsada");
            celda.style.backgroundColor = "rgb(171, 170, 170)";

            let numeroElement = document.createElement("i");
            numeroElement.textContent = numero;
            numeroElement.className = "number";
            numeroElement.style.fontWeight = "bold";
            numeroElement.style.fontFamily = "Verdana";

            switch (numero) { // Colores de las celdas con bombas cerca
                case 1:
                    numeroElement.style.color = "blue";
                    break;
                case 2:
                    numeroElement.style.color = "green";
                    break;
                case 3:
                    numeroElement.style.color = "red";
                    break;
                default:
                    numeroElement.style.color = "orange";
                    break;
            }

            celda.appendChild(numeroElement); // Se añade el número a la celda correspondiente
        }
    }
}

function clickDerecho(idCelda) {
    let id = idCelda;
    let celda = document.getElementById(id);

    // Verificar si la celda ya ha sido pulsada
    if (celda.classList.contains("pulsada")) {
        return; // Salir de la función si la celda ya ha sido pulsada
    }

    // Buscar el elemento <img> de la bandera en la celda
    let banderaElement = celda.querySelector(".bandera-icon");

    // Si ya existe el elemento <img>, eliminar la bandera
    if (banderaElement) {
        celda.classList.remove("bandera");
        celda.removeChild(banderaElement);
    } else {
        // Crear un elemento <img> para el icono de la bandera
        banderaElement = document.createElement("img");
        banderaElement.src = "images/bandera2.png"; // Ruta de la imagen de la bandera
        banderaElement.classList.add("bandera-icon"); // Agregar una clase para aplicar estilos desde CSS

        // Agregar la clase "bandera" a la celda
        celda.classList.add("bandera");

        // Añadir el elemento <img> a la celda
        celda.appendChild(banderaElement);
    }

    // Evitar que aparezca el menú contextual del navegador
    event.preventDefault();
    
    // Detener la propagación del evento para evitar que llegue al manejador de clic derecho de la celda
    event.stopPropagation();
}

// Agregar un manejador de eventos de clic derecho específico para el icono de la bandera
document.addEventListener("contextmenu", function (event) {
    if (event.target.classList.contains("bandera-icon")) {
        // Evitar que aparezca el menú contextual del navegador cuando se hace clic derecho en el icono de la bandera
        event.preventDefault();
    }
});




// Llama a la función para iniciar el juego cuando la página se carga completamente.
document.addEventListener("DOMContentLoaded", generarJuego);
