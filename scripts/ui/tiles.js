// --------------------------------------------------
// Generate tiles HTML for a given category and list of movies
//
// input: - categoryName: string (ex: "Mystery")
//        - movies: array [{id, title, image_url}]
//        - containerSelector: string CSS selector of the container where to inject tiles
// output: - DOM updated with tiles
//
// --------------------------------------------------
//

function generateTiles(genreName, movies, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error("Container not found:", containerSelector);
        return;
    }

    // build HTML string
    let html = `
    <div class="bloc_film">
        <div class="bf_titre">${genreName}</div>
        <div class="bf_mosaik">
            <div class="tuiles">
    `;

    // assign tuile classes for responsiveness
    const tuileClasses = ["tuile_1", "tuile_1", "tuile_2",
        "tuile_2", "tuile_3", "tuile_3"];

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const tuileClass = tuileClasses[i % tuileClasses.length];

        html += `
            <div class="${tuileClass}">
                <div class="tuile_pic">
                    <img src="${movie.image_url}" alt="${movie.title}">
                </div>
                <div class="tuile_bloctexte">
                    <div class="tuile_bloctexte_texte">${movie.title}</div>
                    <button class="tuile_bloctexte_button"
                            data-id="${movie.id}">
                        Détails
                    </button>
                </div>
            </div>`;
    }

    html += `
            </div>
            <button class="bf_voir_plus_bouton">Voir plus</button>
        </div>
    </div>`;

    // inject block in DOM
    container.insertAdjacentHTML("beforeend", html);
}
