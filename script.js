document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'a58829bee1dfcfbcb3d0a27d11ebd44e';
    let currentPage = 1;

    const fetchMovies = (page) => {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error fetching data:', error));
    };

    const displayMovies = (movies) => {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('col-md-4', 'col-lg-3', 'mb-4');

            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

            movieElement.innerHTML = `
                <div class="card">
                    <img src="${posterPath}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.vote_average}</p>
                        <p class="card-text">Release Date: ${movie.release_date}</p>
                    </div>
                </div>
            `;

            movieContainer.appendChild(movieElement);
        });
    };

    document.getElementById('nextButton').addEventListener('click', () => {
        currentPage++;
        fetchMovies(currentPage);
        document.getElementById('prevButton').disabled = currentPage === 1;
    });

    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage);
            document.getElementById('prevButton').disabled = currentPage === 1;
        }
    });

    // Light/Dark Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // Initial Fetch
    fetchMovies(currentPage);
});
