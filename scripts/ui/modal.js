// modal.js
//
// Manage Modal Display
//
// ==================================================

// --------------------------------------------------
// Toggle modal display
//
// input: - none
// output: - DOM updated, modal shown or hidden
//
// --------------------------------------------------
//
async function Toggle_modale(movieId) {
    const mod = document.querySelector("#modale");

    // if modale hiden : generate modal
    console.log("mod classlist avant:", mod.classList)
    if (mod.classList.contains("hidden_modale")) {
        console.log("mod classlist dans if:", mod.classList)
        console.log("APPEL generate modal movie Id:", movieId)
        await generateModal(movieId)
    }

    // Toggle modal
    mod.classList.toggle("hidden_modale");
    console.log("mod classlist apres:", mod.classList)
}

// --------------------------------------------------
// Generate movie modal
//
// input: - movie id
// output: - DOM updated with movie modal
//
// --------------------------------------------------
//

async function generateModal(movieId) {
    console.log("generate modal movie Id:", movieId)
    const modal = await getMovieDetails(movieId);
    console.log("REST API modal:", modal)

    const modalContainer = document.querySelector("#modale .content")
    modalContainer.innerHTML = `
            <div class="top">
                <div class="top_text">
                    <div class="top_info">
                        <div class="top_info_tit">
                            ${modal.title}
                        </div>
                        <div class="top_info_text">
                            <p>${modal.year} - ${modal.genres}</p>
                            <p>PG-13 - ${modal.duration} minutes (${modal.title} / ${modal.title})</p>
                            <p>IMDB score: ${modal.imdb_score}/10</p>
                            <p>Recettes au box-office: $${modal.worldwide_gross_income / 1000000}</p>
                        </div>
                    </div>
                    <div class="top_real">
                        <div class="top_real_tit">
                            Réalisé par:
                        </div>
                        <div class="top_real_text">
                            ${modal.directors}
                        </div>
                    </div>
                </div>
                <div class="modal_desktop_pic">
                    <img src="${modal.image_url}">
                </div>
                <button id="iconCloseModal" class="icon_close_modal">X</button>
                </div>
                <div class="desc_text">
                    ${modal.description}
                </div>
                <div class="modal_tab_mob_pic">
                    <img src="${modal.image_url}">
                </div>
                <div class="desc_avec">
                    <div class="desc_avec_tit">Avec:</div>
                    <div class="desc_avec_text">
                    ${modal.actors}
                    </div>
            </div>

            <button id="btnCloseModal" class="btn_close_modal">
                Fermer
            </button>
            </div>
    `;

    const btnCloseModal = modalContainer.querySelector("#btnCloseModal");
    btnCloseModal.addEventListener("click", () => Toggle_modale());

    const iconCloseModal = modalContainer.querySelector("#iconCloseModal");
    iconCloseModal.addEventListener("click", () => Toggle_modale());
}