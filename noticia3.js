function cargarNoticia() {
    const datos = JSON.parse(localStorage.getItem('newsItems'));
    const titulo = datos[2].titulo;
    const autor = datos[2].autor;
    const categoria = datos[2].cat;
    const fecha = datos[2].date;
    const descripcion = datos[2].des;
    const contenido = datos[2].conten;

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

