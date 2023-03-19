//Mettre le code JavaScript lié à la page photographer.html

//Je n'arrive pas à la récupérer dans la factory
async function getPhotographers() {
    let response = await fetch('../../data/photographers.json');
    return JSON.parse(await response.text());
  }


async function filterPhotographers(data) {
    const { photographers } = await getPhotographers();
    const filteredPhotographers = photographers.filter(function(photographer) {
        return photographer.id.toString() === data;
        });
    return (filteredPhotographers[0]);
}

async function filterMedia(data) {
    const { media } = await getPhotographers();
    const filteredMedia = media.filter(function(item) {
        return item.photographerId.toString() === data;
    });
    return (filteredMedia);
}

function createContainer () {
    const container = document.createElement('div');
    container.classList.add('conteneur');
    return container;
}

function createName (data) {
    const nom = document.createElement('p');
    nom.classList.add("nom");
    nom.textContent = `${data}`;
    return nom;
}

function createLocation(city, country) {
    const locationElement = document.createElement ('p');
    locationElement.classList.add("location");
    locationElement.innerText = `${city}, ${country}`;
    return locationElement;
}

function createTagline (tagline) {
    const taglineElement = document.createElement ('p');
    taglineElement.classList.add("line");
    taglineElement.innerText = `${tagline}`;
    return taglineElement;
}

function createPhoto (portrait) {
    const img = document.createElement( 'img' );
    img.setAttribute("src", `assets/photographers/${portrait}`);
    img.setAttribute("alt", "portrait du ou de la photograhe");
    return img;
}

function createMenu() {
    const conteneurMenu = document.createElement("div");
    conteneurMenu.classList.add("conteneurMenu");

    const conteneurButtonsAndArrow = document.createElement("div");
    conteneurButtonsAndArrow.classList.add("conteneurButtonAndArrow");

    const conteneurButton1AndArrow = document.createElement("div");
    conteneurButton1AndArrow.classList.add("conteneurButton1AndArrow");

    const dropdownArrow = document.createElement("div");
    dropdownArrow.classList.add("arrow");
    dropdownArrow.innerHTML = `<i class="fa-solid fa-angle-up arrow"></i>`;

    const buttonText = document.createElement("p");
    buttonText.classList.add("buttonText");
    buttonText.innerHTML = "Trier par";

    const conteneurButton = document.createElement("div");
    conteneurButton.classList.add("conteneurButton");

    const buttonPopularite = document.createElement("button");
    buttonPopularite.classList.add("buttonPopularite", "buttonMenu");
    buttonPopularite.innerHTML = "Popularité"

    const dateSlider = document.createElement("div");
    dateSlider.classList.add("dateSlider");
    const buttonDate = document.createElement("button");
    buttonDate.classList.add("buttonDate", "buttonMenu", "slider");
    buttonDate.innerHTML = "Date";

    const titreSlider = document.createElement("div");
    titreSlider.classList.add("titreSlider");
    const buttonTitre = document.createElement("button");
    buttonTitre.classList.add("buttonTitre", "buttonMenu", "slider");
    buttonTitre.innerHTML = "Titre";

    const main = document.getElementById("main");
    conteneurMenu.appendChild(buttonText);
    conteneurMenu.appendChild(conteneurButtonsAndArrow);
    conteneurButtonsAndArrow.appendChild(conteneurButton);
    conteneurButtonsAndArrow.appendChild(dropdownArrow);
    conteneurButton.appendChild(buttonPopularite);

    dateSlider.appendChild(buttonDate);
    titreSlider.appendChild(buttonTitre);
    conteneurButton.appendChild(dateSlider);
    conteneurButton.appendChild(titreSlider);

    return conteneurMenu;
}



function displayPhotographer (data) {
    //récupérer les data
    const { name, portrait, city, country, tagline, price, id } = data;
    
    //générer les éléments
    const container = createContainer();
    const nom = createName(name);
    const lieux = createLocation(city, country);
    const taglineElement = createTagline(tagline);
    const imgArtist = createPhoto(portrait);

    //générer le menu de tri
    const menuTri = createMenu();

    //append les éléments
    document.querySelector('.photograph-header').appendChild(container);
    container.appendChild(lieux);
    container.appendChild(nom);
    container.appendChild(taglineElement);
    document.querySelector('.photograph-header').appendChild(imgArtist);
    main.appendChild(menuTri);
}

//filtrer les noms
function filterName (name) {
    const filterBySpace = name.split(" ")[0];
    const filterHyphen = filterBySpace.replace("-", " ");
    return filterHyphen;
}

//récupérer les photos
async function displayMedia(data, photograher) {
    const main = document.getElementById("main");
    //boucler sur chaque objet media
    const grid = document.createElement("div");
    grid.classList.add("photoGrid");
    main.appendChild(grid);
    data.forEach((item) => {
        const { title, image, likes, date, price } = item;
        const { name } = photograher;
        const filteredName = filterName(name);
        const mediaBox = document.createElement("div");
        mediaBox.classList.add("mediaBox");
        const media = document.createElement("img");
        media.classList.add("media");
        media.src = `../Sample Photos/${filteredName}/${image}`;

        const titreEtLike = document.createElement("div");
        titreEtLike.classList.add("titreEtLikes");
        const titrePhoto = document.createElement("p");
        titrePhoto.innerText = `${title}`;
        const likesCounter = document.createElement("div");
        likesCounter.classList.add("likesCounter");
        const numberOfLikes = document.createElement("p");
        numberOfLikes.innerText = `${likes}`;
        const heartIcon = document.createElement("div");
        heartIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;

        //append
        main.appendChild(grid);
        grid.appendChild(mediaBox);
        mediaBox.appendChild(media);
        mediaBox.appendChild(titreEtLike);
        titreEtLike.appendChild(titrePhoto);
        titreEtLike.appendChild(likesCounter);
        likesCounter.appendChild(numberOfLikes);
        likesCounter.appendChild(heartIcon);
    });
}

async function init() {
    const url = new URL(window.location.href);
    let photographerId = url.searchParams.get("id");
    let selectedPhotographer = await filterPhotographers(photographerId);
    let selectedMedia = await filterMedia(photographerId);
    displayPhotographer(selectedPhotographer);
    displayMedia(selectedMedia, selectedPhotographer);
};

await init();


        //fonctions pour le menu
//ouverture du menu (refactoriser!)
const dropdownArrow = document.querySelector(".arrow");
dropdownArrow.addEventListener("click", function(){
    dropdownArrow.classList.add("arrowDown");
    const menu = document.querySelector(".conteneurButtonAndArrow");
    menu.style.height = "115px";
    const buttonDate = document.querySelector(".buttonDate");
    const buttonTitre = document.querySelector(".buttonTitre");
    buttonDate.style.display = "block";
    buttonTitre.style.display = "block";
});

//fermeture du menu
window.onclick = function(event) {
    if (!event.target.matches(".arrow")
        && !event.target.matches(".buttonMenu")
    ) {
      let dropdowns = document.getElementsByClassName("arrow");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("arrowDown")) {
          openDropdown.classList.remove("arrowDown");
        }
        const sliders = document.querySelectorAll(".slider");
        sliders.forEach(slider => {
            if (slider.classList.contains("slider")) {
                slider.style.display = "none";
            }  
        });
      }
      const menu = document.querySelector(".conteneurButtonAndArrow");
      menu.style.height = "35px";

    }
  }


