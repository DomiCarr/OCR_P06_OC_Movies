//events.js
//
// Manage event listeners for user interactions: button clicks, menu hovers, etc.

// --------------------------------------------------
// Initialize event listeners for UI interactions
//
// input: - genres: list of genres from API_REST
// output: - DOM updated with click/hover handlers
//
// --------------------------------------------------
//
function listenEvents(genres) {
    // movie detail button
    const btnDetails = document.querySelector("#btnDetails");
    btnDetails.addEventListener("click", () => Toggle_modale());

    // close modal button
    const btnCloseModal = document.querySelector("#btnCloseModal");
    btnCloseModal.addEventListener("click", () => Toggle_modale());

    // close modal icon
    const iconCloseModal = document.querySelector("#iconCloseModal");
    iconCloseModal.addEventListener("click", () => Toggle_modale());

    // "voir plus" buttons
    // Select all "Voir plus" buttons and iterate over them
    document.querySelectorAll(".bf_voir_plus_bouton").forEach((btn) => {

        // Add a click event listener to toggle the display of extra tiles
        btn.addEventListener("click", () => {

            // Find the parent container (.bf_mosaik) that holds the tiles
            const bloc = btn.closest(".bf_mosaik");

            // Toggle a class to show or hide all tiles in the container
            bloc.classList.toggle("show_all_tiles");

            // If the container has the class "show_all_tiles", set button text to "Voir moins"
            // Otherwise, set it to "Voir plus"
            if (bloc.classList.contains("show_all_tiles")) {
                btn.textContent = "Voir moins";
            } else {
                btn.textContent = "Voir plus";
            }
        });
    });

    // ----- Dynamic movie detail buttons (inside generated tiles) -----
    // Use event delegation to handle dynamically created tiles
    document.addEventListener("click", (event) => {
        const btn = event.target.closest(".tuile_bloctexte_button");
        if (!btn) return;
        const movieId = btn.dataset.id;
        if (movieId) Toggle_modale(movieId);
    });

    // Initialize and manage the genre menu behavior (hover, click, display)
    manageMenu(genres);
}
