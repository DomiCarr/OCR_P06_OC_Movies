// tiles.js
//
// --------------------------------------------------
// Generate tiles HTML for a given category and list of movies
//
// input: - categoryName: string (ex: "Mystery")
//        - movies: array [{id, title, image_url}]
// output: - DOM updated with tiles
//
// --------------------------------------------------
function generateTiles(categoryName, movies) {
    // Find the bloc_film element for the given category
    const bloc = document.querySelector(`.bloc_film[data-category="${categoryName}"]`);
    if (!bloc) {
        console.warn("No bloc found for category:", categoryName);
        return;
    }

    // Update the title of the existing bloc
    const titleElem = bloc.querySelector(".bf_titre");

    // Get container for tiles
    const tuilesContainer = bloc.querySelector(".tuiles");
    if (!tuilesContainer) {
        console.warn("No tuiles container in bloc:", categoryName);
        return;
    }

    tuilesContainer.innerHTML = "";

    // Assign tuile classes for responsiveness
    const tuileClasses = ["tuile_1", "tuile_1", "tuile_2", "tuile_2", "tuile_3", "tuile_3"];

    movies.forEach((movie, index) => {
        const tuileClass = tuileClasses[index % tuileClasses.length];

        tuilesContainer.insertAdjacentHTML("beforeend", `
            <div class="${tuileClass}">
                <div class="tuile_pic">
                    <img src="${movie.image_url}" alt="${movie.title}" onerror="this.style.display='none';">
                </div>
                <div class="tuile_bloctexte">
                    <div class="tuile_bloctexte_texte">${movie.title}</div>
                    <button class="tuile_bloctexte_button" data-id="${movie.id}">
                        Détails
                    </button>
                </div>
            </div>
        `);
    });
}


// --------------------------------------------------
// Generate the "Best movie" section (single film)
//
// input: - movie: object {id, title, image_url, description}
// output: - DOM updated with the best movie info
//
// --------------------------------------------------
function generateBestMovie(movie) {
    const bloc = document.querySelector(".bloc_film[data-category='best']");
    if (!bloc) {
        console.warn("No bloc found for best movie");
        return;
    }

    const vignette = bloc.querySelector(".bf_vignette");
    vignette.innerHTML = `
        <div class="bf_vignette_pic">
            <img src="${movie.image_url}" alt="${movie.title}" onerror="this.style.display='none';">
        </div>
        <div class="bf_vignette_desc">
            <div class="bf_vignette_desc_titre">${movie.title}</div>
            <div class="bf_vignette_desc_texte">${movie.description || ''}</div>
            <button id="btnDetails" class="bf_vignette_desc_bouton" data-id="${movie.id}">
                Détails
            </button>
        </div>
    `;
}

