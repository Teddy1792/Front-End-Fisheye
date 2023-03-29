const url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");

async function filterPhotographers(photographerId) {
    const { photographers } = await getPhotographers();
    const filteredPhotographers = photographers.find(function(photographer) {
        return photographer.id.toString() === photographerId;
        });
    return (filteredPhotographers);
}

function greyOut () {
    const grayOut = document.createElement("div");
    grayOut.setAttribute("id", "over");
    const body = document.querySelector("body");
    body.appendChild(grayOut);
}

function fillInModal () {
    const { name } = filterPhotographers(photographerId);
    const nom = document.createElement("h2");
    nom.innerText = `${name}`
}


function displayModal() {
    greyOut();
    fillInModal();
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
