function iniciar() {
    const contenedor = document.getElementById("datos");
    const claves = Object.keys(localStorage).filter((clave) => clave.startsWith("datos-"));
    const ultimasClaves = claves.slice(-5); // Obtener las últimas 5 claves
    for (const clave of ultimasClaves) {
        const datosJSON = localStorage.getItem(clave);
        const datos = JSON.parse(datosJSON);
        const elementoExistente = contenedor.querySelector(`div[data-identificador="${clave}"]`);
        if (elementoExistente) { // Si ya existe, actualizar sus datos
            for (let propiedad in datos) {
                if (propiedad === "Titulo") {
                    elementoExistente.querySelector(`a[data-propiedad="${propiedad}"]`).innerHTML = datos[propiedad];
                    elementoExistente.querySelector(`a[data-propiedad="${propiedad}"]`).href = `noticia.html?id=${clave}`; // Establecer el enlace a la noticia
                }
            }
        } else { // Si no existe, crear uno nuevo
            const nuevoElemento = document.createElement("div");
            nuevoElemento.setAttribute("data-identificador", clave);
            for (let propiedad in datos) {
                if (propiedad === "Titulo") {
                    const elemento = document.createElement("a"); // Agregar una etiqueta de enlace alrededor del título
                    elemento.setAttribute("data-propiedad", propiedad);
                    elemento.innerHTML = datos[propiedad];
                    elemento.href = `noticia.html?id=${clave}`; // Establecer el enlace a la noticia
                    nuevoElemento.appendChild(elemento);
                }
            }
            contenedor.appendChild(nuevoElemento);
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


    for (let i = 0; i < 5; i++) {
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

  