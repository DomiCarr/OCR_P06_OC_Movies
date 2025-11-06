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
function Toggle_modale() {
    const mod = document.querySelector("#modale");
    // if modale hiden : generate modal

    if (mod.classList.contains("hidden_modaleÒ")) {
        generateModal(movieId)
    }

    mod.classList.toggle("hidden_modale");

}

// --------------------------------------------------
// Generate movie modal
//
// input: - movie id
// output: - DOM updated with movie modal
//
// --------------------------------------------------
//

function generateModal(movieId) {
    console.log("generate modal movie Id:", movieId)
}