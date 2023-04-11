//constant à utiliser
const grid = document.createElement("div");
const url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");
let selectedPhotographer = await filterPhotographers(photographerId);
let selectedMedia = await filterMedia(photographerId);
let currentIndex = 0;

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
 
//test

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
    buttonPopularite.setAttribute('aria-label', 'Trier par popularité');
    buttonPopularite.innerHTML = "Popularité"

    const dateSlider = document.createElement("div");
    dateSlider.classList.add("dateSlider");
    const buttonDate = document.createElement("button");
    buttonDate.setAttribute('aria-label', 'Trier par date');
    buttonDate.classList.add("buttonDate", "buttonMenu", "slider");
    buttonDate.innerHTML = "Date";

    const titreSlider = document.createElement("div");
    titreSlider.classList.add("titreSlider");
    const buttonTitre = document.createElement("button");
    buttonTitre.setAttribute('aria-label', 'Trier par titre');
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

function createLightbox(selectedMedia, item, filteredName) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
  
    const whiteOut = document.createElement("div");
    whiteOut.classList.add("whiteOut");

    const mediaBox = document.createElement("div");
    mediaBox.classList.add("mediaLightBox");

    //création image
    const img = document.createElement("img");
    img.classList.add("imgLightbox");
    img.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].image}`;
    mediaBox.appendChild(img);

    //création vidéo
    const video = document.createElement("video");
    video.classList.add("videoLightbox");
    video.setAttribute("controls", "");
    video.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].video}`;
    video.type = "video/mp4";
    mediaBox.appendChild(video);
  
    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("imgTitle");
    mediaTitle.innerText = selectedMedia[currentIndex].title;

    const leftButton = document.createElement("button");
    leftButton.innerHTML = `<i class="fa-sharp fa-solid fa-angle-left"></i>`;
    leftButton.classList.add("leftButton", "lightboxButton");
    leftButton.addEventListener("click", function () {
        currentIndex =
          currentIndex === 0 ? selectedMedia.length - 1 : currentIndex - 1;
          updateMedia(selectedMedia, filteredName);
          mediaTitle.innerText = selectedMedia[currentIndex].title;
      });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`;
    closeButton.classList.add("closeButton", "lightboxButton");
    closeButton.addEventListener("click", function () {
      closeLightbox();
    });

    const rightButton = document.createElement("button");
    rightButton.innerHTML = `<i class="fa-sharp fa-solid fa-angle-right"></i>`;
    rightButton.classList.add("rightButton", "lightboxButton");
    rightButton.addEventListener("click", function () {
        currentIndex =
          currentIndex === selectedMedia.length - 1 ? 0 : currentIndex + 1;
        updateMedia(selectedMedia, filteredName);
        mediaTitle.innerText = selectedMedia[currentIndex].title;
      });


    document.addEventListener("keydown", function (event) {
        if (event.code === "ArrowLeft") { // Left arrow key
            currentIndex =
            currentIndex === 0 ? selectedMedia.length - 1 : currentIndex - 1;
            updateMedia(selectedMedia, filteredName);
            mediaTitle.innerText = selectedMedia[currentIndex].title;
        } else if (event.code === "ArrowRight") { // Right arrow key
            currentIndex =
            currentIndex === selectedMedia.length - 1 ? 0 : currentIndex + 1;
          updateMedia(selectedMedia, filteredName);
          mediaTitle.innerText = selectedMedia[currentIndex].title;
        }
      });

    document.querySelector("main").appendChild(whiteOut);
    document.querySelector("main").appendChild(lightbox);
    lightbox.appendChild(mediaBox);
    mediaBox.appendChild(mediaTitle);
    lightbox.appendChild(leftButton);
    lightbox.appendChild(closeButton);
    lightbox.appendChild(rightButton);
  }

function updateMedia(selectedMedia, filteredName) {
    const video = document.querySelector(".videoLightbox");
    const img = document.querySelector(".imgLightbox");
    if (selectedMedia[currentIndex].hasOwnProperty("image")) {
        document.querySelector(".imgLightbox").src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].image}`;
        document.querySelector(".imgLightbox").style.display = "block";
        document.querySelector(".videoLightbox").style.display = "none";
    } else {
        document.querySelector(".imgLightbox").style.display = "none";
        document.querySelector(".videoLightbox").style.display = "block";
        document.querySelector(".videoLightbox").src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].video}`;
    }
  }


function openLightbox(selectedMedia, item, filteredName) {
    const img = document.querySelector(".imgLightbox");
    const video = document.querySelector(".videoLightbox");
    if(selectedMedia[currentIndex].hasOwnProperty("image")) {
        img.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].image}`;
        const imgTitle = document.querySelector(".imgTitle");
        imgTitle.innerText = selectedMedia[currentIndex].title;
        img.style.display = "block";
        video.style.display = "none";
    }
    else{
        video.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].video}`;
        const imgTitle = document.querySelector(".imgTitle");
        imgTitle.innerText = selectedMedia[currentIndex].title;
        video.style.display = "block";
        img.style.display = "none";
    }
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "flex";
    const whiteOut = document.querySelector(".whiteOut");
    whiteOut.style.display = "flex";
}


function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
    const whiteOut = document.querySelector(".whiteOut");
    whiteOut.style.display = "none";
}

//récupérer les media
async function displayMedia(selectedMedia, photograher) {
    const main = document.getElementById("main");

    //boucler sur chaque objet media
    const grid = document.createElement("div");
    grid.classList.add("photoGrid");
    main.appendChild(grid);
    selectedMedia.forEach((item) => {

        const { id, title, image, video, likes } = item;
        const { name } = photograher;
        const filteredName = filterName(name);


        const mediaBox = document.createElement("div");
        mediaBox.classList.add("mediaBox");
        const mediaClick = document.createElement("div");
        mediaBox.appendChild(mediaClick);
        mediaClick.addEventListener("click", function(){
        currentIndex = selectedMedia.indexOf(item);
                if(document.querySelector(".lightbox") === null){
                    createLightbox(selectedMedia, item, filteredName);
                    openLightbox(selectedMedia, item, filteredName);
                }
                else{
                    openLightbox(selectedMedia, item, filteredName);
                }
        });

        const titreEtLike = document.createElement("div");
        titreEtLike.classList.add("titreEtLikes");
        const titrePhoto = document.createElement("p");
        titrePhoto.setAttribute("id", `${title}`);
        titrePhoto.innerText = `${title}`;

        //gérer les images et les vidéos
        //photo
        if(item.hasOwnProperty("image")) {
            const mediaImage = document.createElement("img");
            mediaClick.appendChild(mediaImage);
            mediaImage.src = `../Sample Photos/${filteredName}/${image}`;
            mediaImage.classList.add("media");
            mediaImage.setAttribute("alt", `${title}`);
        }
        //video
        else{
            const mediaVideo = document.createElement("video");
            mediaClick.appendChild(mediaVideo);
            mediaVideo.src = `../Sample Photos/${filteredName}/${video}`;
            mediaVideo.classList.add("media", "mediaVideo");
            mediaVideo.setAttribute("alt", `${title}`);
        }



        //création du compteur de like
        const likesCounter = document.createElement("div");
        likesCounter.classList.add("likesCounter");
        const numberOfLikesText = document.createElement("p");
        let numberOfLikes = likes;
        let liked = false;
        numberOfLikesText.innerText = numberOfLikes;

        const heartIcon = document.createElement("button");
        heartIcon.classList.add("heartIcon");
        heartIcon.setAttribute("aria-label", "ajouter un like à ce media");
        heartIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        createLikeCounter(likes);

        function createLikeCounter(numberOfLikes) {
            heartIcon.addEventListener('click', () => {
                const totalLikeText = document.querySelector("p.likesNumber");
                let totalLikes = parseInt(totalLikeText.innerText);
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

function setAdditionalAriaLabels() {
    const constactButton = document.querySelector(".contact_button");
    constactButton.setAttribute("aria-label", "ouvrir le formulaire de contact");
    const logo = document.querySelector(".logo");
    logo.setAttribute("aria-label", "lien vers la page d'accueil");
    logo.setAttribute("alt", "logo du site FishEye");
}

async function init() {
    displayPhotographer(selectedPhotographer);
    displayMedia(selectedMedia, selectedPhotographer);
    displayPrice(selectedPhotographer, selectedMedia);
    setAdditionalAriaLabels();
};

await init();


        //fonctions pour le menu
//ouverture du menu
const dropdownArrow = document.querySelector(".arrow");
dropdownArrow.setAttribute('aria-expanded', 'false');
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

    //add aria attributes
    dropdownArrow.setAttribute('aria-expanded', 'true');
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
      //update aria attributes to indicate collapse
      dropdownArrow.setAttribute('aria-expanded', 'false');
    }
  }

//trier par popularité/titre/date
const sortMedia = (selectedMedia, sortCallback) => {
        let sortedMedia = selectedMedia.sort(sortCallback);
        const grid = document.querySelector(".photoGrid");
        document.querySelector("main").removeChild(grid);
        displayMedia(sortedMedia, selectedPhotographer);
        const bottomBox = document.querySelector(".bottomBox");
        document.querySelector("main").removeChild(bottomBox);
        displayPrice(selectedPhotographer, selectedMedia);
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