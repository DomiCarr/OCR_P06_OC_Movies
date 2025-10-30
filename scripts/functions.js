// functions.js
//

function Toggle_modale() {
    const mod = document.querySelector("#modale")
    mod.classList.toggle("hidden_modale")
}

// Générer le menu
function generateMenu(categories) {
    const ul = document.getElementById("categories");

    // On vide d'abord la liste
    ul.innerHTML = "";

    // On construit le code HTML du menu
    let lis = "";
    for (let i = 0; i < categories.length; i++) {
        lis += `<li>${categories[i]}</li>`;
    }

    // On ajoute dans le DOM
    ul.innerHTML = lis;
}

// replace the fist category
function updateSelectedCategory(clickedItem, firstItem) {
    firstItem.textContent = clickedItem.textContent;
}

// Hover du menu
function manageMenu() {
    const menu = document.querySelector(".bf_menu");
    const menuItems = document.querySelectorAll(".bf_menu li");
    const firstItem = menuItems[0];

    // 🔸 Ouvre/ferme le menu au clic sur la première ligne
    firstItem.addEventListener("click", () => {
        menuDisplay();
    });

    // 🔸 Clic sur une ligne de menu
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (item !== firstItem) {
                updateSelectedCategory(item, firstItem);
                menuDisplay(false); // referme le menu
            }
        });
    });
}

// Affiche ou masque les lignes du menu
function menuDisplay(forceState) {
    const menuItems = document.querySelectorAll(".bf_menu li");

    // Show or hide the menu
    let show;

    if (forceState !== undefined) {
        show = forceState;
    } else {
        if (menuItems[1].style.display === "none") {
            show = true;
        } else {
            show = false;
        }
    }

    for (let i = 1; i < menuItems.length; i++) {
        if (show) {
            menuItems[i].style.display = "block";
        } else {
            menuItems[i].style.display = "none";
        }
    }
}


// Listen the events
function listenEvents() {

    // Open Modal button
    const btnDetails = document.querySelector("#btnDetails")
    btnDetails.addEventListener("click", () => {
        Toggle_modale()
    })

    // Button close Modal
    const btnCloseModal = document.querySelector("#btnCloseModal")
    btnCloseModal.addEventListener("click", () => {
        Toggle_modale()
    })

    // Icon close Modal
    const iconCloseModal = document.querySelector("#iconCloseModal")
    iconCloseModal.addEventListener("click", () => {
        console.log("Click détecté !");
        Toggle_modale()
    })

    // Button voir plus
    document.querySelectorAll(".bf_voir_plus_bouton").forEach((btn) => {
        btn.addEventListener("click", () => {
            const bloc = btn.closest(".bf_mosaik");
            bloc.classList.toggle("show_all_tiles");

            // Change le texte du bouton selon l’état
            if (bloc.classList.contains("show_all_tiles")) {
                btn.textContent = "Voir moins";
            } else {
                btn.textContent = "Voir plus";
            }
        });
    });

    // Menu management
    manageMenu();
}