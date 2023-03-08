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

const generarRSS = () => {
    let rss = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    rss += '<rss version="2.0">\n';
    rss += '<channel>\n';
    rss += '<title>Noticias</title>\n';
    rss += '<author>Autor</author>\n';
    rss += '<category>Categoria</category>\n';
    rss += '<date>Fecha</date>\n';
    rss += '<description>Noticias de ejemplo</description>\n';


    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        if (clave.startsWith("datos-")) {

            const datosJSON = localStorage.getItem(clave);
            const datos = JSON.parse(datosJSON);
            const titulo = datos.Titulo;
            const url = datos.URL; // reemplaza 'URL' con el nombre de la clave donde guardas la URL de la noticia

            rss += '<item>\n';
            rss += `<title>${titulo}</title>\n`;
            rss += `<link>${url}</link>\n`;
            rss += `<author>${datos.Autor}</author>\n`;
            rss += `<category>${datos.Categoría}</category>\n`;
            rss += `<date>${datos.Fecha}</date>\n`;
            rss += `<description>${datos.Descripción}</description>\n`;

            rss += '</item>\n';
        }
    }

    rss += '</channel>\n';
    rss += '</rss>';

    const blob = new Blob([rss], {type: 'application/rss+xml'});
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'noticias.xml';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
};

const botonRSS = document.createElement('button');
botonRSS.textContent = 'Generar RSS';
botonRSS.addEventListener('click', generarRSS);
document.body.appendChild(botonRSS);


