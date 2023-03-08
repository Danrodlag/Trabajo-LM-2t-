function iniciar() {
    const contenedor = document.getElementById("datos");
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        if (clave.startsWith("datos-")) { // Buscar entradas con prefijo "datos-"
            const datosJSON = localStorage.getItem(clave);
            const datos = JSON.parse(datosJSON);
            const elementoExistente = contenedor.querySelector(`div[data-identificador="${clave}"]`);
            if (elementoExistente) { // Si ya existe, actualizar sus datos
                for (let propiedad in datos) {
                    elementoExistente.querySelector(`p[data-propiedad="${propiedad}"]`).innerHTML = `${propiedad}: ${datos[propiedad]}`;
                }
            } else { // Si no existe, crear uno nuevo
                const nuevoElemento = document.createElement("div");
                nuevoElemento.setAttribute("data-identificador", clave);
                for (let propiedad in datos) {
                    const elemento = document.createElement("p");
                    elemento.setAttribute("data-propiedad", propiedad);
                    elemento.innerHTML = `${propiedad}: ${datos[propiedad]}`;
                    nuevoElemento.appendChild(elemento);
                }
                contenedor.appendChild(nuevoElemento);
            }
        }
    }
}
function limpiarLocalStorage() {
    localStorage.clear();
    const contenedor = document.getElementById("datos");
    contenedor.innerHTML = "";
}





