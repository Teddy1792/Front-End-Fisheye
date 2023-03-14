//Mettre le code JavaScript lié à la page photographer.html
async function filterPhotographers(data) {
    const response = await fetch('../../data/photographers.json');
    const parsedData = await response.json();
    const photographers = parsedData.photographers;
    const filteredPhotographers = photographers.filter(function(photographer) {
        return photographer.id.toString() === data;
        });
    return (filteredPhotographers[0]);
}

function displayPhotographer (data) {

    //générer la box
    const container = document.createElement('div');
    container.classList.add("conteneur");
    document.querySelector('.photograph-header').appendChild(container);


    //display le nom
    const { name, portrait, city, country, tagline, price, id } = data;
    const nom = document.createElement('p');
    nom.classList.add("nom");
    nom.textContent = `${name}`;
    container.appendChild(nom);

    //display le lieu
    const locationElement = document.createElement ('p');
    locationElement.classList.add("location");
    locationElement.innerText = `${city}, ${country}`;
    container.appendChild(locationElement);

    //display la tagline
    const taglineElement = document.createElement ('p');
    taglineElement.classList.add("line");
    taglineElement.innerText = `${tagline}`;
    container.appendChild(taglineElement);

    //display photo
    const img = document.createElement( 'img' );
    img.setAttribute("src", `assets/photographers/${portrait}`);
    img.setAttribute("alt", "portrait du ou de la photograhe");
    document.querySelector('.photograph-header').appendChild(img);

    //display menu de tri
    const main = document.getElementById("main");

    const conteneurTri = document.createElement("div");
    conteneurTri.classList.add("conteneurTri");

    const buttonText = document.createElement("p");
    buttonText.classList.add("buttonText");
    buttonText.innerHTML = "Trier par";

    const buttonLabel = document.createElement("label");
    buttonLabel.classList.add("label");
    buttonLabel.innerHTML = "Popularité";

    const triButton = document.createElement("button");
    triButton.setAttribute("multiple", "");
    triButton.setAttribute("role", "listbox");
    triButton.classList.add("dropdownButton");
    

    const popularite = document.createElement("option");
    popularite.innerHTML = "Popularité";
    const Date = document.createElement("option");
    Date.innerHTML = "Date";
    const Titre = document.createElement("option");
    Titre.innerHTML = "Titre";


    main.appendChild(conteneurTri);
    conteneurTri.appendChild(buttonText);
    conteneurTri.appendChild(buttonLabel);
    conteneurTri.appendChild(triButton);
    triButton.appendChild(popularite);
    triButton.appendChild(Date);
    triButton.appendChild(Titre);
    buttonLabel.appendChild(triButton);
}

async function init() {
    const url = new URL(window.location.href);
    let photographerId = url.searchParams.get("id");
    let selectedPhotographer = await filterPhotographers(photographerId);
    displayPhotographer(selectedPhotographer);
};

init();