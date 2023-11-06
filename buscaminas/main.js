// VARIABLES GLOBALES
let filas = 10;
let cols = 10;
let lado = 25; // Lado de cada casilla

function generarJuego() {
    generarTablero();
}

function generarTablero() {
    let tabla = "";
    for (let f = 0; f < filas; f++) {
        tabla += `<tr>`;
        for (let c = 0; c < cols; c++) {
            tabla += `<td id="celda-${c}-${f}" style="width:${lado}px; height:${lado}px">${f}/${c}</td>`;
        }
        tabla += "</tr>";
    }
    let tableroHTML = document.getElementById("tablero");
    tableroHTML.innerHTML = tabla;
}

// Llama a la función para iniciar el juego cuando la página se carga completamente.
document.addEventListener("DOMContentLoaded", function() {
    generarJuego();
});
