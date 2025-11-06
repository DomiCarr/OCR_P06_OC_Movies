// rest_api.js
//
// Exchange with API_REST functions
//
// ==================================================

// --------------------------------------------------
// Extract genres from API page
//
// input: - data : JSON object from API response
// output: - list of genres [{id, name}] extracted from page
//
// --------------------------------------------------
//
function extractGenresFromPage(data) {
    const list = data.results;
    const genres = [];

    for (let i = 0; i < list.length; i++) {
        genres.push({
            id: list[i].id,
            name: list[i].name
        });
    }
    return genres;
}

// --------------------------------------------------
// Fetch all genres from API
//
// input: - uses global genresUrl
// output: - Promise resolving to array of all genres [{id, name}]
//
// --------------------------------------------------
//
async function getAllGenres() {
    // Initialize an empty array to store all genres from all pages
    let allGenres = [];

    // Start fetching from the first page
    let page = 1;

    // Flag to control the loop: true if there is a next page
    let hasNext = true;

    // Loop until there are no more genre pages
    while (hasNext) {
        try {
            // For the current genre page:
            // Send an HTTP GET request to REST_API and wait for the response
            // `fetch()` returns a Promise for the response
            // `await` pauses execution until the Promise resolves, giving the Response object
            const response = await fetch(`${genresUrl}?page=${page}`);

            // Throw an error to be caught by the catch block
            // if the HTTP response status is not OK
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            // Parse the HTTP response as JSON:
            // `await` ensures the code waits until the JSON is fully read and converted
            // into a JavaScript object before assigning it to `data`
            const data = await response.json();

            // Extract genres from the current page
            const genres = extractGenresFromPage(data);

            // Append the current page's genres to the full list
            allGenres = allGenres.concat(genres);

            // Check if there is another page of results in the API
            // data.next is a field in the JSON returned by the API for this page
            // It contains the URL of the next page, or null if there are no more pages
            // We set hasNext to true/false accordingly to control the loop
            hasNext = data.next !== null;

            // Move to the next page number
            page++;
        } catch (error) {
            // Log any fetch or parsing errors and stop the loop
            console.error("Error fetching page", page, error);
            hasNext = false;
        }
    }

    // Log all collected genres for debugging
    console.log(allGenres);

    // Return the full array of genres
    return allGenres;
}

// --------------------------------------------------
// Fetch the best movie (highest IMDB score) from all genres
//
// input:  - none
// output: - movie object {id, title, image_url, description, directors, actors, writers, genres, ...}
//
// --------------------------------------------------

async function getBestMovie() {
    try {
        // Step 1: fetch first page of all movies sorted by IMDB score descending
        const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page=1`);
        if (!response.ok) throw new Error("HTTP error fetching top movies: " + response.status);
        const data = await response.json();
        if (!data.results || data.results.length === 0) return null;

        // Take the first movie (highest score)
        const topMovie = data.results[0];

        // Step 2: fetch full details for this movie by its id
        const detailResponse = await fetch(`${titlesUrl}${topMovie.id}`);
        if (!detailResponse.ok) throw new Error("HTTP error fetching movie details: " + detailResponse.status);
        const movieDetails = await detailResponse.json();

        return movieDetails;

    } catch (error) {
        console.error("Error fetching best movie:", error);
        return null;
    }
}



// --------------------------------------------------
// Extract first 6 best movies for a given genre, sorted by IMDB score descending
// If genre === All the the best movies all genres are extracted
//
// input: - genre : string
// output: - movies: array of up to 6 movies [{id, title, image_url}]
//
// --------------------------------------------------
async function extractBestMoviesByGenre(genre) {
    const movies = [];
    let page = 1;

    console.log("Fetching top movies for genre:", genre);

    while (movies.length < 6) {
        let url;
        // Build the url depending if there is a specific genre or all genre
        if (genre === "all") {
            url = `${titlesUrl}?sort_by=-imdb_score&page=${page}`;
        } else {
            url = `${titlesUrl}?genre=${encodeURIComponent(genre)}&sort_by=-imdb_score&page=${page}`;
        }


        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            console.log("Movies returned this page:", data.results.length);

            for (let movie of data.results) {
                if (movies.length >= 6) break;
                movies.push({
                    id: movie.id,
                    title: movie.title,
                    image_url: movie.image_url,
                });
            }

            if (data.results.length === 0) break;
            page++;
        } catch (error) {
            console.error("Error fetching movies for genre", genre, error);
            break;
        }
    }

    console.log("Top movies array ready:", movies);
    return movies;
}


// --------------------------------------------------
// Fetch detailed information for a single movie by its ID
//
// input: - movieId : string or number
// output: - Promise resolving to a movie object
//          {id, title, description, image_url, directors, actors, ...}
//
// --------------------------------------------------
async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${titlesUrl}${movieId}`);
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const data = await response.json();

        // Normalize data for UI consumption
        const movie = {
            id: data.id,
            title: data.title,
            description: data.description,
            image_url: data.image_url,
            directors: data.directors || [],
            actors: data.actors || [],
            genres: data.genres || [],
            year: data.year,
            imdb_score: data.imdb_score,
            country: data.country,
            language: data.lang,
            rating: data.rating,
            company: data.company
        };

        return movie;

    } catch (error) {
        console.error("Error fetching movie details for ID", movieId, error);
        return null;
    }
}
