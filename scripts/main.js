// main.js
//

// --------------------------------------------------
// Initialize application
//
// input: - none (uses global config & API)
// output: - generate page and event listeners
//
// --------------------------------------------------
//
async function buildPageContent() {
    const mystery = await extractMoviesByGenre("Mystery");
    generateTiles("Mystery", mystery, "#mainContent");

    const comedy = await extractMoviesByGenre("Comedy");
    generateTiles("Comedy", comedy, "#mainContent");
}

async function initApp() {
    try {
        const genres = await getAllGenres();
        generateMenu(genres);
        listenEvents(genres);

        // ===== TEST TEMPORAIRE =====
        const testGenre = "Mystery";
        const movies = await extractMoviesByGenre(testGenre);
        console.log("Test extractMoviesByGenre result:", movies);
        // ===========================


    } catch (error) {
        console.error("Initialization error:", error);
    }
}

initApp();
