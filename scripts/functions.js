// functions.js
//
// Global variable to store the currently selected genre
let selectedGenre = "";

/* ===========================================================
   Toggle modal display (open/close)
   =========================================================== */
function Toggle_modale() {
    const mod = document.querySelector("#modale");
    mod.classList.toggle("hidden_modale");
}

/* ===========================================================
   Generate the genre menu and attach click events
   =========================================================== */
function generateMenu(genres) {
    const ul = document.getElementById("genres");

    // First, clear any existing list items
    ul.innerHTML = "";

    // Build the menu items dynamically
    for (let i = 0; i < genres.length; i++) {
        const li = document.createElement("li");
        li.textContent = genres[i].name;

        // Apply a highlight if this genre is currently selected
        if (genres[i].name === selectedGenre) {
            li.classList.add("selected_genre");
        }

        // Add a click event to update the selected genre
        li.addEventListener("click", () => {
            if (i !== 0) { // skip the first item logic
                updateSelectedGenre(li);
                menuDisplay(false); // close the menu after click
            }
        });

        // Add the new item to the menu
        ul.appendChild(li);
    }
}

/* ===========================================================
   Replace the first genre with the clicked one
   =========================================================== */
function updateSelectedGenre(clickedItem) {
    const ul = document.getElementById("genres");
    const firstItem = ul.querySelector("li");

    // Update the first item with the clicked text
    firstItem.textContent = clickedItem.textContent;

    // Store the selected genre globally
    selectedGenre = clickedItem.textContent;

    // Update the visual highlight
    const allItems = ul.querySelectorAll("li");
    allItems.forEach(li => li.classList.remove("selected_genre"));
    firstItem.classList.add("selected_genre");
}

/* ===========================================================
   Show or hide the menu items
   =========================================================== */
function menuDisplay(forceState) {
    const menuItems = document.querySelectorAll("#genres li");

    // Determine if we should show or hide
    let show;
    if (forceState !== undefined) {
        show = forceState;
    } else {
        show = menuItems[1].style.display === "none";
    }

    // Show or hide all items except the first
    for (let i = 1; i < menuItems.length; i++) {
        menuItems[i].style.display = show ? "block" : "none";
    }
}

/* ===========================================================
   Manage the menu behavior on hover
   =========================================================== */
function manageMenu(genres) {
    const menu = document.querySelector(".bf_menu");

    // When the mouse enters, regenerate the menu
    menu.addEventListener("mouseenter", () => {
        generateMenu(genres);  // Build the list dynamically
        menuDisplay(false);    // Keep it closed by default
    });
}

/* ===========================================================
   Global event listeners for UI elements
   =========================================================== */
function listenEvents() {
    // Open modal button
    const btnDetails = document.querySelector("#btnDetails");
    btnDetails.addEventListener("click", () => {
        Toggle_modale();
    });

    // Button close modal
    const btnCloseModal = document.querySelector("#btnCloseModal");
    btnCloseModal.addEventListener("click", () => {
        Toggle_modale();
    });

    // Icon close modal
    const iconCloseModal = document.querySelector("#iconCloseModal");
    iconCloseModal.addEventListener("click", () => {
        console.log("Click detected!");
        Toggle_modale();
    });

    // “See more” button
    document.querySelectorAll(".bf_voir_plus_bouton").forEach((btn) => {
        btn.addEventListener("click", () => {
            const bloc = btn.closest(".bf_mosaik");
            bloc.classList.toggle("show_all_tiles");

            // Change the button text according to the state
            if (bloc.classList.contains("show_all_tiles")) {
                btn.textContent = "Voir moins";
            } else {
                btn.textContent = "Voir plus";
            }
        });
    });

}
