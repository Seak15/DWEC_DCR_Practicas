window.onload = inicio;

function inicio() { //EVENTOS
    document.getElementById("nombre").addEventListener("input", validarNombre)//NOMBRE
    document.getElementById("nif").addEventListener("input", validarNif)//NIF
    document.getElementById("fecha").addEventListener("input", validarFecha)//FECHA
    document.getElementById("msg").addEventListener("input", validarMsg)//MENSAJE
    document.getElementById("curso").addEventListener("input", validarCurso)//CURSO
    document.getElementById("color").addEventListener("input", validarColor)//COLOR
    document.getElementById("enviar").addEventListener("submit", validar);//TODOS
    document.getElementById("enlace").addEventListener("click", clickEnlace)//ENLACE
}

function validar(e) { //Valida el formulario comprobando que todos los campos sean correctos
    e.preventDefault();
    let mensaje = document.getElementById("completo");

    if (!validarNif() || !validarNombre() || !validarColor() || !validarMsg() || !validarDias || !validarFecha()) {
        mensaje.style.color = "red";
        mensaje.innerHTML = "FORMULARIO ERRONEO";
    } else {
        if (confirm("¿Desea enviar el formulario?")) {
            mensaje.style.color = "green";
            mensaje.innerHTML = "FORMULARIO ENVIADO";
        }
    }
}

function validarNombre() { //Validando el nombre
    let nombre = document.getElementById("nombre")
    let mensajeError = document.getElementById("errorNombre")
    if (!nombre.checkValidity()) {
        mensajeError.innerHTML = "Nombre no válido" //Muestra mensaje en tiempo real si está mal el nombre
        return false;
    }
    else {
        mensajeError.innerHTML = "<img src= 'images/check.png'>"
        return true;
    }
}

function validarNif() { //Validar el DNI
    let dni = document.getElementById("nif").value;
    let mensajeError = document.getElementById("errorNif");

    let numero = dni.substr(0, dni.length - 1);
    let letraUsuario = dni.substr(dni.length - 1, 1).toUpperCase();
    let letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let letraCorrecta = letrasValidas.charAt(numero % 23);

    if (letraUsuario !== letraCorrecta) {
        mensajeError.innerHTML = "NIF incorrecto";//Muestra mensaje en tiempo real si está mal el NIF
        return false;
    } else {
        mensajeError.innerHTML = "<img src= 'images/check.png'>";
        return true;
    }
}

function validarFecha() {
    let fecha = document.getElementById("fecha");
    let msgError = document.getElementById("errorFecha")

    if (!fecha.checkValidity()) {
        msgError.style.color = "red";
        msgError.innerHTML = "Fecha incorrecta"
        return false;
    }
    else {
        msgError.innerHTML = "<img src= 'images/check.png'>"
        return true;
    }
}

function validarMsg() { //Comprobar mensaje y poner contador
    let msg = document.getElementById("msg");
    let cont = document.getElementById("contador");

    if (!msg.checkValidity()) {//Muestra mensaje en tiempo real si está mal el texto
        cont.style.color = "red"
        cont.innerHTML = "Fuera de rango";
        return false;
    } else {
        cont.style.color = "green";
        cont.innerHTML = "Letras disponibles: " + (500 - msg.value.length); //Contador de letras
        return true;
    }
}

function validarCurso() {
    let curso = document.getElementById("curso");

    if (curso.value === "Añadir curso") {
        let cursoNuevo = prompt("Añada un curso en formato yy/yy");
        let patron = /^\d{1,2}\/\d{1,2}$/;

        if (patron.test(cursoNuevo)) {
            let datos = cursoNuevo.split("/");
            let primerAño = parseInt(datos[0]);
            let segundoAño = parseInt(datos[1]);

            if (segundoAño === primerAño + 1) {
                // Crear el nuevo option
                let nuevoOption = document.createElement("option");
                nuevoOption.text = cursoNuevo;
                nuevoOption.value = cursoNuevo;

                // Encontrar el índice donde insertar el nuevo option de manera ordenada
                let opciones = curso.getElementsByTagName("option");
                let indice = 0;
                while (indice < opciones.length && cursoNuevo > opciones[indice].text) {
                    indice++;
                }

                // Insertar el nuevo option en el índice correcto
                curso.insertBefore(nuevoOption, opciones[indice]);

                // Seleccionar el nuevo option
                nuevoOption.selected = true;

                alert("Dato agregado correctamente");
            } else {
                alert("Formato incorrecto, las fechas deben ser consecutivas");
            }
        } else {
            alert("Formato incorrecto, introduzca de nuevo la fecha");
        }
    }
}



function validarColor() { //Comprobar que al menos haya un color seleccionado
    let color = document.getElementById("color")
    let mensajeError = document.getElementById("errorColor");
    if (!color.checkValidity()) {
        mensajeError.innerHTML = "Seleccione al menos un color"
        return false
    }
    else {
        mensajeError = "<img src= 'images/check.png'>";
        return true;
    }
}

function clickEnlace() {
    window.location.href = "https://www.google.com"; //Redirige a google.com
}

function validarDias() { //Comprobar que al menos haya un día seleccionado
    let lunes = document.getElementById("lunes")
    let martes = document.getElementById("martes")
    let miercoles = document.getElementById("miercoles")
    let jueves = document.getElementById("jueves")
    let viernes = document.getElementById("viernes")

    let mensaje = document.getElementById("errorDias")

    //Comprobamos que al menos uno esté seleccionado
    if (!lunes.checked && !martes.checked && !miercoles.checked && !jueves.checked && !viernes.checked) {
        mensaje.innerHTML = "Seleccione al menos un dia";
        return false;
    }
    else {
        mensaje.innerHTML = "<img src= 'images/check.png'>";
        return true;
    }
}
