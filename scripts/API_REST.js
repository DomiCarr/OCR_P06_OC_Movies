// API_REST.js
//


// URL of the REST API
const baseUrl = "http://localhost:8000/api/v1/genres/";

// Extract genres from one page of API results
function extractGenresFromPage(data) {
    // data.results contains the list of genres
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

// Fetch all pages of genres
async function getAllGenres() {
    let allGenres = [];
    let page = 1;
    let hasNext = true;

    while (hasNext) {
        try {
            const response = await fetch(`${baseUrl}?page=${page}`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            // Extract genres from this page
            const genres = extractGenresFromPage(data);
            allGenres = allGenres.concat(genres);

            // Check if there is a next page
            hasNext = data.next !== null;
            page++;
        } catch (error) {
            console.error("Error fetching page", page, error);
            hasNext = false; // stop loop on error
        }
    }

    console.log(allGenres);
    return allGenres;
}




