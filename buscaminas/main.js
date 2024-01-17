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

    // Verificar si la celda ya ha sido pulsada
    if (celda.classList.contains("pulsada")) {
        return; // Salir de la función si la celda ya ha sido pulsada
    }

    celda.style.backgroundColor = "rgb(171, 170, 170)";
    // Verificar si la celda actual está en la lista de celdas con bombas
    if (celdasBomba.includes(id)) {
        // Si hay bomba, mostrar mensaje o realizar acción correspondiente
        celda.style.backgroundColor = "rgb(225, 111, 111)";
        celda.innerHTML = "<img class='bombas' src='images/bomba.png' alt='bomba'>";
        alert("BOMBA!! Juego terminado.");
        //generarJuego();
    } else {
        let numero = document.createElement("i")
        numero.textContent = obtenerNumero(idCelda)
        numero.class = "number";
        numero.style.fontWeight = "bold";
        numero.style.fontFamily = "Verdana";

        //Dando colores a cada numero
        switch (obtenerNumero(idCelda)){
            case 0:
                numero.style.color = black;
                break;
            case 1:
                numero.style.color = "blue";
                break;
            case 2:
                numero.style.color = "green";
                break;
            case 3:
                numero.style.color = "red";
                break;
            default:
                numero.style.color = "orange";
                break;
        }

        celda.appendChild(numero);
    }

    // Marcar la celda como pulsada y quitar el evento de clic
    celda.classList.add("pulsada");
    celda.removeEventListener("click", function(event) {
        clickIzquierdo(event.target.id);
    });
}

function obtenerNumero(idCelda) {
    // Obtener las coordenadas de la celda a partir de su ID
    const coordenadas = idCelda.split('-');
    const c = parseInt(coordenadas[1]);
    const f = parseInt(coordenadas[2]);

    // Verificar si la celda actual tiene una bomba
    if (celdasBomba.includes(idCelda)) {
        // Si hay bomba, retornar -1 para indicar que la celda contiene una bomba
        return -1;
    }

    let numeroBombas = 0;

    // Verificar las celdas vecinas para contar el número de bombas
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
function abrirTablero() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < cols; c++) {
            let id = `celda-${c}-${f}`;
            clickIzquierdo(id);
        }
    }
}

// Llama a la función para iniciar el juego cuando la página se carga completamente.
document.addEventListener("DOMContentLoaded",generarJuego);
