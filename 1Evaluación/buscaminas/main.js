// VARIABLES GLOBALES
let filas = 12;
let cols = 12;
let lado = 25; // Lado de cada casilla
let bombas = 25;

// Almacena las celdas con bombas
let celdasBomba = [];

function generarJuego() {
    // Generar el tablero y las bombas al inicio del juego
    generarTablero();
    ponerBombas();
}

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
            celda.addEventListener("click", function(event) {
                clickIzquierdo(event.target.id);
            });

            fila.appendChild(celda);
        }
        tableroHTML.appendChild(fila);
    }
}

function ponerBombas() {
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

    celda.style.backgroundColor = "rgb(171, 170, 170)";
    // Verificar si la celda actual está en la lista de celdas con bombas
    if (celdasBomba.includes(id)) {
        // Si hay bomba, mostrar mensaje o realizar acción correspondiente
        celda.style.backgroundColor = "red";
        celda.innerHTML = "<img class='bombas' src='images/bomba.png' alt='bomba'>";
        alert("BOMBA!! Juego terminado.");
    } else {
        //función para obtener el número
    }
}

function obtenerNumero(celda) {
    // Obtener numero segun bombas cercanas
}

// Llama a la función para iniciar el juego cuando la página se carga completamente.
document.addEventListener("DOMContentLoaded",generarJuego);
