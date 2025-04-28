// Cambia esta URL a la del backend desplegado en Render
const API_URL = "https://pg-restapi-movie.onrender.com/api/movies";

// Función para obtener películas
async function getMovies() {
  const response = await fetch(API_URL);
  const movies = await response.json();
  const list = document.getElementById("movieList");
  list.innerHTML = "";
  movies.forEach(movie => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="movie-info">
        <strong>${movie.title}</strong> - Dirigida por ${movie.director} - Año ${movie.year} <br> 
        <em>${movie.synopsis}</em>
      </div>
      <button onclick="deleteMovie(${movie.id})">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

// Función para crear película
async function createMovie() {
  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;
  const year = parseInt(document.getElementById("year").value);
  const synopsis = document.getElementById("synopsis").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, director, year, synopsis })
  });

  if (response.ok) {
    alert("Película creada exitosamente!");
    getMovies();
  } else {
    alert("Error creando película.");
  }
}

// Función para eliminar película
async function deleteMovie(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Película eliminada exitosamente!");
    getMovies(); // Recarga la lista
  } else {
    alert("Error eliminando película.");
  }
}
