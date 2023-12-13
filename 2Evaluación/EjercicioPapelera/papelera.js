//FUNCION QUE VACIA LA PAPELERA Y QUITA LA IMAGEN

/*function vaciarPapelera() {
    document.getElementById("papelera").style.backgroundImage = "url('PapeleraVacia.png')"
    alert("Se ha vaciado la papelera");
}*/

//EJEMPLO CON DOCUMENT.QUERYSELECTOR

let contextmenu = document.querySelector('.bin .trash .lid');
function vaciarPapelera() {
    document.getElementById("mensaje").innerHTML = "Papelera vaciada"
    document.querySelector(".trash").style.backgroundImage = 'url("https://cdn.icon-icons.com/icons2/81/PNG/256/recycle_bin_empty_15553.png")'
}

document.oncontextmenu = ()=>{
    return false;
  }