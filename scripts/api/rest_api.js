// rest_api.js
//
// Exchange with API_REST functions
//

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
// Extract first 6 movies for a given genre, fetching next pages if needed
//
// input: - genre : string
// output: - movies: array of up to 6 movies [{id, title, image_url}]
//
// --------------------------------------------------
//
async function extractMoviesByGenre(genre) {
    const movies = [];
    let page = 1;

    console.log("Fetching movies for genre:", genre);

    while (movies.length < 6) {
        const response = await fetch(
            `${titlesUrl}?genre=${encodeURIComponent(genre)}&page=${page}`
        );

        console.log("HTTP response status:", response.status);
        const data = await response.json();
        console.log("Movies returned this page:", data.results.length);

        for (let i = 0; i < data.results.length && movies.length < 6; i++) {
            const movie = data.results[i];
            movies.push({
                id: movie.id,
                title: movie.title,
                image_url: movie.image_url
            });
            console.log("Processed movie:", movie.title);
        }

        if (data.results.length === 0) break;
        page++;
    }

    console.log("Movies array ready:", movies);
    return movies;
}
