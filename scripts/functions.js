// functions.js
//

function Toggle_modale() {
    let mod = document.querySelector("#modale")
    mod.classList.toggle("hidden_modale")
}


function listenEvents() {

    // Open Modal button
    let btnDetails = document.querySelector("#btnDetails")
    btnDetails.addEventListener("click", () => {
        Toggle_modale()
    })

    // Button close Modal
    let btnCloseModal = document.querySelector("#btnCloseModal")
    btnCloseModal.addEventListener("click", () => {
        Toggle_modale()
    })

    // Icon close Modal
    let iconCloseModal = document.querySelector("#iconCloseModal")
    iconCloseModal.addEventListener("click", () => {
        console.log("Click détecté !");
        Toggle_modale()
    })


}