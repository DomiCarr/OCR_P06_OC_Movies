// menu.js
//
// Handle the genre menu and its interactive behavior
//
// ==================================================

// Genres menu is open or closed
let menuOuvert = false;

// --------------------------------------------------
// Generate genres menu
//
// input: - genres : list of genres from the API_REST
// output: - DOM updated by the function
//
// --------------------------------------------------
//
function generateMenu(genres) {
    // if no selected genre assign the first genre
    if (!selectedGenre && genres.length > 0) {
        selectedGenre = genres[0].name;
    }

    const ul = document.getElementById("genres");
    ul.innerHTML = "";

    for (let i = 0; i < genres.length; i++) {
        const li = document.createElement("li");
        li.textContent = genres[i].name;

        // cursor changes as a hand on hover to visually indicate the item is clickable
        li.style.cursor = "pointer";

        // Attach click for every li:
        // Click always selects the genre and closes the menu
        li.addEventListener("click", () => {
            updateSelectedGenre(li);
            menuOuvert = false;
            menuDisplay(false, genres);
        });

        // hide all except first
        if (i !== 0) li.style.display = "none";

        ul.appendChild(li);
    }
}

// --------------------------------------------------
// Update selected genre
//
// input: - clickedItem : <li> DOM element clicked by user
// output: - DOM first item updated
//         - selectedGenre global variable updated
//
// --------------------------------------------------
//
function updateSelectedGenre(clickedItem) {
    // Get the <ul> that contains the genre menu
    const ul = document.getElementById("genres");

    // Select the first <li> item (main displayed genre)
    const firstItem = ul.querySelector("li");

    // Update the visible genre name to the clicked one
    firstItem.textContent = clickedItem.textContent;

    // Store the selected genre globally
    selectedGenre = clickedItem.textContent;
}

// --------------------------------------------------
// Display or hide genre menu
//
// input: - show : boolean, true = show menu, false = hide
//        - genres : list of genres from the API_REST
// output: - DOM updated: menu items shown/hidden, emoji set
//
// --------------------------------------------------
//
function menuDisplay(show, genres) {
    // Get all genre items from the menu
    const menuItems = document.querySelectorAll("#genres li");
    if (menuItems.length <= 1) return;

    // Loop through items (skip first) and show/hide them
    for (let i = 1; i < menuItems.length; i++) {
        menuItems[i].style.display = show ? "block" : "none";

        // Remove checkmark emoji from the previously selected genre
        menuItems[i].textContent = menuItems[i].textContent.replace(" ✅", "");

        // Add checkmark emoji for the currently selected genre
        if (show && menuItems[i].textContent === selectedGenre) {
            menuItems[i].textContent = selectedGenre + " ✅";
        }
    }

    // Update first item text based on menu state
    const firstItem = menuItems[0];
    if (show) {
        // Show the first genre name when menu opens
        firstItem.textContent = genres[0].name;

        // Add emoji if it's the selected one
        if (selectedGenre === genres[0].name) {
            firstItem.textContent = selectedGenre + " ✅";
        }
    } else {
        // Hide menu and show only the selected genre
        firstItem.textContent = selectedGenre;
    }
}

// --------------------------------------------------
// Manage hover behavior on genre menu
//
// input: - genres : list of genres from the API_REST
// output: - event listeners attached
//         - DOM updated on hover enter/leave
//
// --------------------------------------------------
//
function manageMenu(genres) {
    // Select the genre menu container element
    const menu = document.querySelector(".bf_menu");
    if (!menu) return;

    // Show full menu when hovering
    menu.addEventListener("mouseenter", () => {
        menuOuvert = true;
        const ul = document.getElementById("genres");
        const firstItem = ul.querySelector("li");

        // Replace the top menu item text (selected genre) with first genre name (default genre list)
        firstItem.textContent = genres[0].name;
        menuDisplay(true, genres);
    });

    // Hide menu when mouse leaves the area and display the current selected genre
    menu.addEventListener("mouseleave", () => {
        menuOuvert = false;
        const ul = document.getElementById("genres");
        const firstItem = ul.querySelector("li");

        // Restore the selected genre textin the top menu item
        firstItem.textContent = selectedGenre;
        menuDisplay(false, genres);

        // rebuild the movies mosaik with the new genre
        // ----- Others Mosaik -----
        rebuildOthers(selectedGenre);
    });
}
