function cargarNoticia() {
    const datos = JSON.parse(localStorage.getItem('newsItems'));
    const titulo = datos[4].titulo;
    const autor = datos[4].autor;
    const categoria = datos[4].cat;
    const fecha = datos[4].date;
    const descripcion = datos[4].des;
    const contenido = datos[4].conten;

    let noticiaHTML;
    noticiaHTML = `
    <h1>${titulo}</h1>
    <p><strong>Autor:</strong> ${autor}</p>
    <p><strong>Categoría:</strong> ${categoria}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Descripción:</strong> ${descripcion}</p>
    <p><strong>Contenido:</strong> ${contenido}</p>
  `;

    document.getElementById('noticia').innerHTML = noticiaHTML; // Mostrar los datos en el elemento HTML
}

