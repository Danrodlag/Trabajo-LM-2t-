function iniciar() {
// Obtener el array de objetos newsItems del localStorage
    const newsItems = JSON.parse(localStorage.getItem('newsItems'));

// Si el localStorage está vacío o no hay noticias, mostrar un mensaje
    if (!newsItems || newsItems.length === 0) {
        const newsTitles = document.getElementById('newsTitles');
        newsTitles.innerHTML = '<p>No hay noticias.</p>';
    } else {
        const newsTitles = document.getElementById('newsTitles');
        let it = 5;
        // Recorrer el array de noticias y agregar cada título al DOM
        newsItems.forEach(function(newsItem) {
            const p = document.createElement('p');
            const title = newsItem.titulo;
            const a = document.createElement('a');
            a.textContent = title;
            a.href = `noticia${it}.html`;
            p.appendChild(a);
            newsTitles.appendChild(p);
            it -=1;
        });
    }

}
function generarRSS() {
    let rss = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    rss += '<rss version="2.0">\n';
    rss += '<channel>\n';
    rss += '<title>Noticias</title>\n';
    rss += '<link>http://ejemplo.com</link>\n';
    rss += '<description>Noticias de ejemplo</description>\n';
    rss += '<language>es-es</language>\n';

    const newsItems = JSON.parse(localStorage.getItem('newsItems'));
    if (!newsItems || newsItems.length === 0) {

    } else {
        newsItems.slice(0, 5).forEach(function (newsItem) {
            const titulo = newsItem.titulo;
            const autor = newsItem.autor || '';
            const categoria = newsItem.cat || '';
            const pubDate = newsItem.date || '';
            const descripcion = newsItem.des || '';

            rss += '<item>\n';
            rss += `<title>${titulo}</title>\n`;
            rss += `<author>${autor}</author>\n`;
            rss += `<category>${categoria}</category>\n`;
            rss += `<pubDate>${pubDate}</pubDate>\n`;
            rss += `<description>${descripcion}</description>\n`;
            rss += '</item>\n';
        });

        rss += '</channel>\n';
        rss += '</rss>';

        const blob = new Blob([rss], { type: 'application/rss+xml' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = 'noticias.xml';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);

    }

}
