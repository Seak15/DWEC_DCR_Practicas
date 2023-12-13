// VARIABLES GLOBALES
let filas = 12;
let cols = 12;
let lado = 25; // Lado de cada casilla

function generarJuego() {
    generarTablero();
}

function generarTablero() {
    let tabla = "";
    for (let f = 0; f < filas; f++) {
        tabla += `<tr>`;
        for (let c = 0; c < cols; c++) {
            tabla += `<td class="celda" id="celda-${c}-${f}" style="width:${lado}px; height:${lado}px"></td>`;
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
