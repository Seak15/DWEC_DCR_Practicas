// VARIABLES GLOBALES
let filas = 10;
let cols = 10;
let lado = 20; // Lado de cada casilla

function generarJuego() {
    generarTablero();
}

function generarTablero() {
    let tabla = "";
    for (let i = 0; i < filas; i++) {
        tabla += "<tr>";
        for (let j = 0; j < cols; j++) {
            tabla += `<td id="celda-${i}-${j}" style="width: ${lado}px; height: ${lado}px;"></td>`;
        }
        tabla += "</tr>";
    }
    let tableroCompleto = document.getElementById("tablero");
    tableroCompleto.innerHTML = tabla;
}

// Llama a la función para iniciar el juego cuando la página se carga completamente.
generarJuego();

