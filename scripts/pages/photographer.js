//Mettre le code JavaScript lié à la page photographer.html

async function filterPhotographers(photographerId) {
    const { photographers } = await getPhotographers();
    const filteredPhotographers = photographers.find(function(photographer) {
        return photographer.id.toString() === photographerId;
        });
    return (filteredPhotographers);
}

async function filterMedia(photographerId) {
    const { media } = await getPhotographers();
    const filteredMedia = media.filter(function(item) {
        return item.photographerId.toString() === photographerId;
    });
    return (filteredMedia);
}

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

function displayPhotographer (photographers) {
    //récupérer les data
    const { name, portrait, city, country, tagline, price, id } = photographers;
    
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

//récupérer les media
async function displayMedia(selectedMedia, photograher) {
    const main = document.getElementById("main");
    //boucler sur chaque objet media
    grid.classList.add("photoGrid");
    main.appendChild(grid);
    selectedMedia.forEach((item) => {
        const { id, title, image, video, likes } = item;
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

        //création du compteur de like
        const likesCounter = document.createElement("div");
        likesCounter.classList.add("likesCounter");
        const numberOfLikesText = document.createElement("p");
        let numberOfLikes = likes;
        let liked = false;
        numberOfLikesText.innerText = numberOfLikes;

        const heartIcon = document.createElement("button");
        heartIcon.classList.add("heartIcon");
        heartIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        createLikeCounter(likes);

                //je ne vois pas comment mettre cette fonction
        function createLikeCounter(numberOfLikes) {
            heartIcon.addEventListener('click', () => {
                const totalLikeText = document.querySelector("p.likesNumber");
                let totalLikes = parseInt(totalLikeText.innerText);
                console.log(totalLikes);
                if (!liked) {
                    numberOfLikes++;
                    totalLikes++;
                    totalLikeText.innerText = totalLikes;
                    liked = true;
                } else {
                    numberOfLikes--;
                    liked = false;
                    totalLikes--;
                    totalLikeText.innerText = totalLikes;
                }
                numberOfLikesText.innerText = numberOfLikes;
              });
              return numberOfLikes;
        }

        //append
        main.appendChild(grid);
        grid.appendChild(mediaBox);
        mediaBox.appendChild(titreEtLike);
        titreEtLike.appendChild(titrePhoto);
        titreEtLike.appendChild(likesCounter);
        likesCounter.appendChild(numberOfLikesText);
        likesCounter.appendChild(heartIcon);
    });
}

function displayDailyFee(price) {
    const dailyFee = document.createElement("p");
    dailyFee.innerText = price + "€ / jour";
    return dailyFee;
}

function DisplayNumberOfTotalLikes() {
    let totalLikes = 0;
    const likesCounterParagraphs = document.querySelectorAll('div.likesCounter p');
    likesCounterParagraphs.forEach((paragraph) => {
    const likes = parseInt(paragraph.innerText);
    totalLikes += likes;
    });
    return totalLikes;
}


//création de la bottomBox
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
    let NumberOfTotalLikes = DisplayNumberOfTotalLikes();
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
//ouverture du menu
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

//trier par popularité/titre/date

const sortMedia = (selectedMedia, sortCallback, selector) => {
        let sortedMedia = selectedMedia.sort(sortCallback);
        document.querySelector(".photoGrid").innerHTML = "";
        displayMedia(sortedMedia, selectedPhotographer);
    };

//trier par likes
document.querySelector(".buttonPopularite").addEventListener("click", function(){
    return sortMedia(selectedMedia, (l1, l2) => (l1.likes < l2.likes), ".buttonPopularite");
});


//trier par titre
document.querySelector(".buttonTitre").addEventListener("click", function(){
    return sortMedia(selectedMedia, (l1, l2) => (l1.title > l2.title), ".buttonTitre")
});

//trier par date
document.querySelector(".buttonDate").addEventListener("click", function(){
    return sortMedia(selectedMedia, (l1, l2) => (l1.date < l2.date), ".buttonDate")
    });