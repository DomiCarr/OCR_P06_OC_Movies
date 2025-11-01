// menu.js
//
// Functions to handle the genre menu and its interactive behavior
//

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
    const ul = document.getElementById("genres");
    const firstItem = ul.querySelector("li");
    firstItem.textContent = clickedItem.textContent;
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
    const menuItems = document.querySelectorAll("#genres li");
    if (menuItems.length <= 1) return;

    for (let i = 1; i < menuItems.length; i++) {
        menuItems[i].style.display = show ? "block" : "none";
        menuItems[i].textContent = menuItems[i].textContent.replace(" ✅", "");
        if (show && menuItems[i].textContent === selectedGenre) {
            menuItems[i].textContent = selectedGenre + " ✅";
        }
    }

    const firstItem = menuItems[0];
    if (show) {
        firstItem.textContent = genres[0].name;
        if (selectedGenre === genres[0].name) {
            firstItem.textContent = selectedGenre + " ✅";
        }
    } else {
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
    const menu = document.querySelector(".bf_menu");
    if (!menu) return;

    menu.addEventListener("mouseenter", () => {
        menuOuvert = true;
        const ul = document.getElementById("genres");
        const firstItem = ul.querySelector("li");
        firstItem.textContent = genres[0].name;
        menuDisplay(true, genres);
    });

    menu.addEventListener("mouseleave", () => {
        menuOuvert = false;
        const ul = document.getElementById("genres");
        const firstItem = ul.querySelector("li");
        firstItem.textContent = selectedGenre;
        menuDisplay(false, genres);
    });
}
