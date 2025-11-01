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
function generateTiles(categoryName, movies, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error("Container not found:", containerSelector);
        return;
    }

    // Create the bloc_film wrapper
    const blocFilm = document.createElement("div");
    blocFilm.className = "bloc_film";

    // Category title
    const bfTitre = document.createElement("div");
    bfTitre.className = "bf_titre";
    bfTitre.textContent = categoryName;
    blocFilm.appendChild(bfTitre);

    // Mosaic container
    const bfMosaik = document.createElement("div");
    bfMosaik.className = "bf_mosaik";

    const tuilesDiv = document.createElement("div");
    tuilesDiv.className = "tuiles";

    // Generate each tile
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];

        // Assign tuile class based on index to match existing CSS (tuile_1, tuile_2, tuile_3)
        const tuileClass = "tuile_" + ((i % 3) + 1);

        const tuileDiv = document.createElement("div");
        tuileDiv.className = tuileClass;

        // Image container
        const picDiv = document.createElement("div");
        picDiv.className = "tuile_pic";
        const img = document.createElement("img");
        img.src = movie.image_url;
        img.alt = movie.title;
        picDiv.appendChild(img);

        // Text + button container
        const textDiv = document.createElement("div");
        textDiv.className = "tuile_bloctexte";

        const titleDiv = document.createElement("div");
        titleDiv.className = "tuile_bloctexte_texte";
        titleDiv.textContent = movie.title;

        const button = document.createElement("button");
        button.className = "tuile_bloctexte_button";
        button.textContent = "Détails";
        button.addEventListener("click", () => {
            console.log("Clicked movie id:", movie.id);
            // Ici tu pourras appeler la modale ou autre
        });

        textDiv.appendChild(titleDiv);
        textDiv.appendChild(button);

        // Assemble tile
        tuileDiv.appendChild(picDiv);
        tuileDiv.appendChild(textDiv);

        // Add to tuiles container
        tuilesDiv.appendChild(tuileDiv);
    }

    bfMosaik.appendChild(tuilesDiv);

    // Voir plus button
    const voirPlusBtn = document.createElement("button");
    voirPlusBtn.className = "bf_voir_plus_bouton";
    voirPlusBtn.textContent = "Voir plus";
    bfMosaik.appendChild(voirPlusBtn);

    // Append mosaic to blocFilm
    blocFilm.appendChild(bfMosaik);

    // Inject into page
    container.appendChild(blocFilm);
}
