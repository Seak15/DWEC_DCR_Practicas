function crearTablero(filas, columnas) {
    let tablero = document.getElementById('tablero');
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let casilla = document.createElement("div");
            casilla.className = 'casilla';
            casilla.textContent = 'X'; // Aquí deberías establecer la lógica del juego
            tablero.appendChild(casilla);
        }
    }
}

crearTablero(10, 10); // Cambia las dimensiones según tu preferencia

