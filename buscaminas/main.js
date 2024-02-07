// VARIABLES GLOBALES
let filas = 13;
let cols = 13;
let lado = 35; // Lado de cada casilla
let celdasBomba = []; // Almacena las celdas con bombas
let celdasBandera = [];
contBombas = 0;

// Llama a la función para iniciar el juego cuando la página se carga completamente.
document.addEventListener("DOMContentLoaded", () => {
    contador = document.getElementById("contador-bombas"); // Inicializa el contador dentro de la función
    cont = parseInt(contador.textContent)
    generarJuego();
});

function generarJuego() {
    primeraCeldaPulsada = null;
    document.getElementById("facil").addEventListener("click", modoFacil);
    document.getElementById("medio").addEventListener("click", modoMedio);
    document.getElementById("dificil").addEventListener("click", modoDificil);
    ponerBombas();
    generarTablero();
}

//DIFICULTADES DEL JUEGO
function modoFacil (){
    bombas = 5;
    filas = 9;
    cols = 9;
    cont = bombas;
    contador.innerHTML = cont;
    generarJuego();
}

function modoMedio(){
    bombas = 10;
    filas = 10;
    cols = 10;
    cont = bombas
    contador.innerHTML = cont;
    generarJuego();
}

function modoDificil(){
    bombas = 20;
    filas = 11;
    cols = 11;
    cont = bombas;
    contador.innerHTML = cont;
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
    // Generar el resto de las bombas
    while (cont < bombas) {
        f = Math.floor(Math.random() * filas);
        c = Math.floor(Math.random() * cols);
        id = `celda-${c}-${f}`;

        // Verificar que la celda no haya sido seleccionada como bomba antes
        if (!celdasBomba.includes(id)) {
            celdasBomba.push(id);
            cont++;
        }
    }
}


function clickIzquierdo(idCelda) {
    let id = idCelda;
    let celda = document.getElementById(id);
    
    // Verificar si es la primera celda pulsada
    if (primeraCeldaPulsada === null) {
        // Si es la primera celda, asegurarse de que no sea una bomba
        while (celdasBomba.includes(id)) {
            // Si la primera celda es una bomba, generar un nuevo id y obtener la celda correspondiente
            id = generarNuevoId();
            celda = document.getElementById(id);
        }
        // Actualizar la variable global para almacenar la primera celda pulsada
        primeraCeldaPulsada = id;
    }

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
        // Agregamos la clase para que se produzca el temblor
        document.getElementById("tablero").classList.add("shake");
        
            setTimeout(function () {
                // Damos la opción de jugar de nuevo o de salir de la partida
                Swal.fire({
                    icon: 'error',
                    title: '¡Perdiste!',
                    text: 'Inténtalo de nuevo.',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'fondo-alerta' // Agrega una clase personalizada al popup
                    }
                }).then((result) => {
                    // Si el usuario hace clic en el botón "OK", refrescar la página
                    if (result.isConfirmed) {
                        location.reload();
                    }
                }); 
            }, 500); // Tiempo de espera antes de mostrar la alerta
        
    } else {
        //Abre el area, recibiendo como parametro la fila y la columna
        abrirArea(parseInt(id.split('-')[1]), parseInt(id.split('-')[2]));
    }

    // Marcar la celda como pulsada y quitar el evento de clic derecho
    celda.classList.add("pulsada");
    celda.removeEventListener("contextmenu", function (event) {
        clickDerecho(event.target.id);
    });

    ganarJuego();
}

// Función para generar un nuevo id aleatorio para la primera celda que no sea una bomba
function generarNuevoId() {
    let f = Math.floor(Math.random() * filas);
    let c = Math.floor(Math.random() * cols);
    return `celda-${c}-${f}`;
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
    const coordenadas = [{ c, f }];
    let banderaElement;

    while (coordenadas.length > 0) {
        const { c, f } = coordenadas.shift();
        const idCelda = `celda-${c}-${f}`;
        const celda = document.getElementById(idCelda);

        if (!celda || celda.classList.contains("pulsada")) {
            continue;
        }

        // Verificar si la celda tiene una bandera y eliminarla si es así
        banderaElement = celda.querySelector(".bandera-icon");
        if (banderaElement) {
            banderaElement.remove();
            cont++;
            contador.innerHTML = cont;
        }

        const numero = obtenerNumero(idCelda);

        if (numero === 0) {
            celda.classList.add("pulsada");
            celda.style.backgroundColor = "rgb(171, 170, 170)";

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const nuevaC = c + i;
                    const nuevaF = f + j;

                    if (nuevaC >= 0 && nuevaC < cols && nuevaF >= 0 && nuevaF < filas) {
                        coordenadas.push({ c: nuevaC, f: nuevaF });
                    }
                }
            }
        } else if (numero > 0) {
            celda.classList.add("pulsada");
            celda.style.backgroundColor = "rgb(171, 170, 170)";

            let numeroElement = document.createElement("i");
            numeroElement.textContent = numero;
            numeroElement.className = "number";
            numeroElement.style.fontWeight = "bold";
            numeroElement.style.fontSize = "23px";
            numeroElement.style.fontFamily = "Verdana";

            switch (numero) {
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

            celda.appendChild(numeroElement);
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

        // Eliminar el id de la celda del array de celdasBandera
        let index = celdasBandera.indexOf(id);
        if (index !== -1) {
            celdasBandera.splice(index, 1);
        }
        cont ++;
        contador.innerHTML = cont; //Modificando el contador
    } else {
        // Crear un elemento <img> para el icono de la bandera
        banderaElement = document.createElement("img");
        banderaElement.src = "images/bandera2.png"; // Ruta de la imagen de la bandera
        banderaElement.classList.add("bandera-icon"); // Agregar una clase para aplicar estilos desde CSS

        // Agregar la bandera a la celda
        celda.classList.add("bandera");
        celda.appendChild(banderaElement);

        // Agregar el id de la celda al array de celdasBandera
        celdasBandera.push(id);
        cont--;
        contador.innerHTML = cont; //Modificando el contador
    }

    // Evitar que aparezca el menú contextual del navegador
    event.preventDefault();
    // Detener la propagación 
    event.stopPropagation();

    ganarJuego();
}

// Agregar un manejador de eventos de clic derecho específico para el icono de la bandera
document.addEventListener("contextmenu", function (event) {
    if (event.target.classList.contains("bandera-icon")) {  
        event.preventDefault();
        clickDerecho(event.target.parentNode.id); //Tambien aplica a la imagen de la bandera
    }
});

/**
 * Esta Funcion comparará el array de bombas con el array de banderas, en el momento que coincidan se ganará 
 * la partida
 */
function ganarJuego(){
    celdasBomba.sort();
    celdasBandera.sort(); 

    // Convertir los arrays ordenados a strings y compararlos
    const bombasString = celdasBomba.toString();
    const banderasString = celdasBandera.toString();
    
    if (bombasString === banderasString){
        Swal.fire({
            icon: 'success',
            title: '¡Felicidades!',
            text: 'Has ganado la partida. ¡Excelente trabajo!',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'fondo-alerta' // Agrega una clase personalizada al popup
            }
        }).then((result) => {
            // Si el usuario hace clic en el botón "OK", refrescar la página
            if (result.isConfirmed) {
                location.reload();
            }
        }); ;
    }
}
