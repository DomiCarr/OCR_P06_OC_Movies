// main.js
//
async function initApp() {
    try {
        const genres = await getAllGenres();
        generateMenu(genres);
        listenEvents(); // manageMenu sera appelé depuis ici
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

initApp();