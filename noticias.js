

function iniciar() {

    const contenedor = document.getElementById("datos");
    let datosLocal = localStorage.getItem("datos");

    if (datosLocal !== "null") {

        datosLocal = datosLocal.split(";");

        datosLocal.forEach(function (awa) {

            let json = JSON.parse(awa);

            let html = '<section>'  +`<h1>${json.Titulo}</h1>`+`<h2>${json.Autor}</h2>` + `<h3>${json.Categoría}</h3>` +`<h3>${json.Fecha}</h3>` +`<h4>${json.Descripción}</h4>` +`<h5>${json.Contenido}</h5>` + '</section>';



            document.getElementById("datos").innerHTML = html

        })

    }
}

    function limpiarHTML() {
        localStorage.setItem("datos", null)

    }
function generarRSS() {
    let rss = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    rss += '<rss version="2.0">\n';
    rss += '<channel>\n';
    rss += '<title>Noticias</title>\n';
    rss += '<description>Noticias de ejemplo</description>\n';
    rss += '<link>http://ejemplo.com/noticias</link>\n';

    const datos = JSON.parse(localStorage.getItem("datos")) || [];

    datos.forEach(function (json) {
        rss += '<item>\n';
        rss += `<title>${json.Titulo}</title>\n`;
        rss += `<link>${window.location.href}</link>\n`;
        rss += `<author>${json.Autor}</author>\n`;
        rss += `<category>${json.Categoría}</category>\n`;
        rss += `<pubDate>${json.Fecha}</pubDate>\n`;
        rss += `<description>${json.Descripción}</description>\n`;
        rss += '</item>\n';
    });

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
}



    function guardar() {

        if (localStorage.getItem("datos") === "null") {

            localStorage.setItem("datos", JSON.stringify(Object.fromEntries(new FormData(document.getElementById("miForm")))))

        } else {

            localStorage.setItem("datos", JSON.stringify(Object.fromEntries(new FormData(document.getElementById("miForm")))) + ";" + localStorage.getItem("datos"))

        }


    }
