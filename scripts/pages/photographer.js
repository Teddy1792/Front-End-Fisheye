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

//(refactoriser!)
function createMenu() {
    const conteneurMenu = document.createElement("div");
    conteneurMenu.classList.add("conteneurMenu");

    const conteneurButtonsAndArrow = document.createElement("div");
    conteneurButtonsAndArrow.classList.add("conteneurButtonsAndArrow");

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

//formater les noms des photographes
function filterName (name) {
    const filterBySpace = name.split(" ")[0];
    const filterHyphen = filterBySpace.replace("-", " ");
    return filterHyphen;
}

//récupérer les media (refactoriser!)
async function displayMedia(data, photograher) {
    const main = document.getElementById("main");
    //boucler sur chaque objet media
    grid.classList.add("photoGrid");
    main.appendChild(grid);
    data.forEach((item) => {
        const { title, image, video, likes } = item;
        const { name } = photograher;
        const filteredName = filterName(name);
        const mediaBox = document.createElement("div");
        mediaBox.classList.add("mediaBox");


        const mediaImage = document.createElement("img");
        mediaImage.setAttribute("id", "media");
        mediaBox.appendChild(mediaImage);
        if(item.hasOwnProperty("image")) {
            mediaImage.src = `../Sample Photos/${filteredName}/${image}`;
            mediaImage.classList.add("media");
        }
        else{
            const mediaVideo = document.createElement("video");
            mediaVideo.setAttribute("id", "media");
            mediaImage.parentNode.replaceChild(mediaVideo, mediaImage)
            mediaVideo.src = `../Sample Photos/${filteredName}/${video}`;
            mediaVideo.classList.add("media");
        }

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
        mediaBox.appendChild(titreEtLike);
        titreEtLike.appendChild(titrePhoto);
        titreEtLike.appendChild(likesCounter);
        likesCounter.appendChild(numberOfLikes);
        likesCounter.appendChild(heartIcon);
    });
}

function displayDailyFee(data) {
    const dailyFee = document.createElement("p");
    dailyFee.innerText = data + "€ / jour";
    return dailyFee;
}

function DisplayNumberOfTotalLikes(data) {
    
    let totalLikes = 0;
    data.forEach((item) => {
        totalLikes += item.likes;
        return totalLikes;
    });
    return totalLikes;
}


function displayPrice(selectedPhotographer, selectedMedia) {
    //générer les éléments
    const { price } = selectedPhotographer;
    const { likes } = selectedMedia
    const bottomBox = document.createElement("div");
    bottomBox.classList.add("bottomBox");

    const likesBox = document.createElement("div");
    likesBox.classList.add("likesBox");

    const likesNumber = document.createElement("p");
    likesNumber.classList.add("likesNumber");
    
    const likesHeart = document.createElement("div");
    likesHeart.classList.add("likesHeart");
    likesHeart.innerHTML = '<i class="fa-solid fa-heart"></i>';

    const dailyFee = displayDailyFee(price);
    let NumberOfTotalLikes = DisplayNumberOfTotalLikes(selectedMedia);
    likesNumber.innerText = NumberOfTotalLikes;

    //append all
    main.appendChild(bottomBox);
    likesBox.appendChild(likesNumber);
    likesBox.appendChild(likesHeart);
    bottomBox.appendChild(likesBox);
    bottomBox.appendChild(dailyFee);
}

//constant à utiliser
const grid = document.createElement("div");
const url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");
let selectedPhotographer = await filterPhotographers(photographerId);
let selectedMedia = await filterMedia(photographerId);

async function init() {
    displayPhotographer(selectedPhotographer);
    displayMedia(selectedMedia, selectedPhotographer);
    displayPrice(selectedPhotographer, selectedMedia);
};

await init();


        //fonctions pour le menu
//ouverture du menu (refactoriser!)
const dropdownArrow = document.querySelector(".arrow");
dropdownArrow.addEventListener("click", function(){
    const titreSlider = document.querySelector(".titreSlider");
    const dateSlider = document.querySelector(".dateSlider");
    const slider = document.querySelector(".slider");
    dropdownArrow.classList.add("arrowDown");
    const menu = document.querySelector(".conteneurButtonsAndArrow");
    menu.style.height = "115px";
    const buttonDate = document.querySelector(".buttonDate");
    const buttonTitre = document.querySelector(".buttonTitre");
    buttonDate.style.display = "block";
    buttonTitre.style.display = "block";
    slider.style.display = "block";
    titreSlider.style.opacity = "1";
    dateSlider.style.opacity = "1";
});

//fermeture du menu
window.onclick = function(event) {
    const sliders = document.querySelectorAll(".slider");
    const titreSlider = document.querySelector(".titreSlider");
    const dateSlider = document.querySelector(".dateSlider");
    if (!event.target.matches(".arrow")
        && !event.target.matches(".buttonMenu")
    ) {
      let dropdowns = document.getElementsByClassName("arrow");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("arrowDown")) {
          openDropdown.classList.remove("arrowDown");
        }
        sliders.forEach(slider => {
            if (slider.classList.contains("slider")) {
                slider.style.display = "none";
            }  
        });
      }
      titreSlider.style.opacity = "0";
      dateSlider.style.opacity = "0";
      const menu = document.querySelector(".conteneurButtonsAndArrow");
      menu.style.height = "35px";
    }
  }

//trier par popularité
document.querySelector(".buttonPopularite").addEventListener("click", function(){
    let sortedMedia = selectedMedia.sort((l1, l2) => {
        return l1.likes < l2.likes;
    });
    document.querySelector(".photoGrid").innerHTML = "";
    displayMedia(sortedMedia, selectedPhotographer);
});

//trier par titre
document.querySelector(".buttonTitre").addEventListener("click", function(){
    let sortedMedia = selectedMedia.sort((l1, l2) => {
        return l1.title > l2.title;
    });
    document.querySelector(".photoGrid").innerHTML = "";
    displayMedia(sortedMedia, selectedPhotographer);
});

//trier par date
document.querySelector(".buttonDate").addEventListener("click", function(){
    let sortedMedia = selectedMedia.sort((l1, l2) => {
        return l1.date < l2.date;
    });
    document.querySelector(".photoGrid").innerHTML = "";

    displayMedia(sortedMedia, selectedPhotographer);
});