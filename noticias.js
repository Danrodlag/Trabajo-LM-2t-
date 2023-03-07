function iniciar(){
    const datos = JSON.parse(localStorage.getItem("datos"));
    const contenedor = document.getElementById("datos");

    for (let propiedad in datos) {
        const elemento = document.createElement("p");
        elemento.innerHTML = `${propiedad}: ${datos[propiedad]}`;
        contenedor.appendChild(elemento);
    }
}