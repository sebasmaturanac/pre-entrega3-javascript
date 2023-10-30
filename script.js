// Obtén referencias a los elementos HTML que vamos a utilizar
const searchInput = document.getElementById('searchInput');
const titleElement = document.getElementById('title');
const yearElement = document.getElementById('year');
const plotElement = document.getElementById('plot');

// Agrega un evento de escucha para la tecla "Enter" en el campo de búsqueda
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value;
    if (searchQuery) {
      // Llama a la función para buscar información de la película, la busqueda tiene que ser en ingles, por ejemplo Lion King para el Rey León 
      searchMovie(searchQuery);
      searchInput.value = '';
    }
  }
});

// Función para buscar información de la película
function searchMovie(searchQuery) {
  const apiKey = '1983df27'; //API KEY de OMDb 
  // Construye la URL de la API con la clave de API y la consulta de búsqueda
  const apiUrl = `https://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`;

  // Solicitud a la API de OMDB
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        // Si la solicitud no es exitosa, muestra un error
        throw new Error('No se pudo obtener información de la película.');
      }
      // Convierte la respuesta a formato JSON
      return response.json();
    })
    .then((data) => {
      // Actualiza elementos HTML con los datos de la película
      titleElement.textContent = `Título: ${data.Title}`;
      yearElement.textContent = `Año: ${data.Year}`;
      plotElement.textContent = `Trama: ${data.Plot}`;
      
      // Almacenar los resultados en localStorage
      localStorage.setItem('movieData', JSON.stringify(data));
    })
    .catch((error) => {
      // Si ocurre un error, muestra una alerta
      showAlert(error.message);
      console.error(error);
    });
}

// Función para mostrar una alerta personalizada (puedes reemplazarla con una biblioteca de alertas personalizadas)
function showAlert(message) {
  alert(message); // Utilizamos una alerta predeterminada para simplificar.
}