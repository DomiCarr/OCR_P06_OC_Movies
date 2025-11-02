// main.js
//
// --------------------------------------------------
// Initialize application
//
// input: - none (uses global config & API)
// output: - generate page content and event listeners
//
// --------------------------------------------------
async function buildPageContent(genres) {

    try {
        // ----- Best movie (single top IMDB) -----
        const bestMovie = await getBestMovie();
        generateBestMovie(bestMovie);

        // ----- Top rated (all genres) -----
        const topRatedMovies = await extractBestMoviesByGenre("all");
        generateTiles("top_rated", topRatedMovies);

        // ----- Mystery Mosaik -----
        const moviesMystery = await extractBestMoviesByGenre("Mystery");
        generateTiles("category1", moviesMystery);

        // ----- Comedy Mosaik -----
        const moviesComedy = await extractBestMoviesByGenre("Comedy");
        generateTiles("category2", moviesComedy);

        // ----- Others Mosaik -----
        const moviesOthers = await extractBestMoviesByGenre(genres[0].name);
        generateTiles("others", moviesOthers);

    } catch (error) {
        console.error("Error building page content:", error);
    }
}


async function initApp() {
    try {
        // Fetch genres from API and generate menu
        const genres = await getAllGenres();
        generateMenu(genres);

        // Build all page content dynamically
        await buildPageContent(genres);

        // Initialize event listeners after tiles are generated
        listenEvents(genres);

    } catch (error) {
        console.error("Initialization error:", error);
    }
}

initApp();
