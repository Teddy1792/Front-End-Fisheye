//constant à utiliser
const grid = document.createElement("div");
const url = new URL(window.location.href);
let photographerId = url.searchParams.get("id"); //rédcupération de l'ID du ou de la photographe pour loader correctement la page
let selectedPhotographer = await filterPhotographers(photographerId);
let selectedMedia = await filterMedia(photographerId);
let currentIndex = 0;

//navigation clavier
let creationTabIndex = 1;
let tabIndex = document.querySelectorAll("a");

//creation des tabindex pour les menus (cf displayMedia pour le reste)
function createTabindexPhotographers () {
  document.querySelector("a").setAttribute("tabindex", creationTabIndex);
  creationTabIndex += 1;
  document.querySelector(".contact_button").setAttribute("tabindex", creationTabIndex);
  creationTabIndex += 1;
  document.querySelector(".buttonPopularite").setAttribute("tabindex", creationTabIndex);
  creationTabIndex += 1;
  document.querySelector(".buttonTitre").setAttribute("tabindex", creationTabIndex);
  creationTabIndex += 1;
  document.querySelector(".buttonDate").setAttribute("tabindex", creationTabIndex);
  creationTabIndex += 1;
}

function updateTabindex (currentTabIndex) {
  document.querySelectorAll(".mediaclick, .heartIcon").forEach(element => {
    element.setAttribute("tabindex", currentTabIndex);
    currentTabIndex +=1;
  });
}

function createNavigationArrow() {
  let index = 1;
  const elements = document.querySelectorAll("[tabindex]"); 
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault(); // prevent the default tab behavior
      document.activeElement.blur(); // remove focus from the current element
      index = (index + elements.length - 1) % elements.length; // decrement index and wrap around if necessary
      // move focus to the next element with a tab index
      elements[index].focus();
    }
    else if (event.key === "ArrowRight") {
      event.preventDefault(); // prevent the default tab behavior
      document.activeElement.blur(); // remove focus from the current element
      // move focus to the next element with a tab index
      index = (index + 1) % elements.length; // increment index and wrap around if necessary
      elements[index].focus();
    }
  });
}

function createNavigation() {
    //navigation au clavier sur la page
    const modal = document.getElementById("contact_modal");
    if (!modal.hasAttribute("style")) {
      createNavigationArrow();
    }

  //ouvrir le menu par focus
  const menuKey = document.querySelector(".conteneurButtonsAndArrow");
  menuKey.addEventListener("focusin", () => {
    const dropdownArrow = document.querySelector(".arrow");
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
    dropdownArrow.setAttribute('aria-expanded', 'true');

    //fermer le menu par focus
    menuKey.addEventListener("blur", () => {
      const sliders = document.querySelectorAll(".slider");
      const titreSlider = document.querySelector(".titreSlider");
      const dateSlider = document.querySelector(".dateSlider");
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
      dropdownArrow.setAttribute('aria-expanded', 'false');
    });
});
}



//creation de la fermeture de la modale
function createClosingModal () {
  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") { //esc key
        event.preventDefault();
        closeModal();
    }
  });
}

//récupération des médias correspondant du ou de la photographe
async function filterMedia(photographerId) {
    const { media } = await getPhotographers();
    const filteredMedia = media.filter(function(item) {
        return item.photographerId.toString() === photographerId;
    });
    return (filteredMedia);
}

//création du menu de tri
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

//création de la box de présentation du ou de la photographe
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

//création de la lightbox de défilement
function createLightbox(selectedMedia, item, filteredName) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
  
    const whiteOut = document.createElement("div");
    whiteOut.classList.add("whiteOut");

    const mediaBox = document.createElement("div");
    mediaBox.classList.add("mediaLightBox");

    //création de l'obet image
    const img = document.createElement("img");
    img.classList.add("imgLightbox");
    img.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].image}`;
    mediaBox.appendChild(img);

    //création de l'objet vidéo
    const video = document.createElement("video");
    video.classList.add("videoLightbox");
    video.setAttribute("controls", "");
    video.src = `../Sample Photos/${filteredName}/${selectedMedia[currentIndex].video}`;
    video.type = "video/mp4";
    mediaBox.appendChild(video);
  
    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("imgTitle");
    mediaTitle.innerText = selectedMedia[currentIndex].title;

    //création des boutons de navigation
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

    //ajout de la navigation au clavier
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
        } else if (event.code === "Escape") { //esc key
            event.preventDefault();
            closeLightbox();
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

//gestion de la navigation en fonction du fait que l'objet est une photo ou une vidéo
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

//gestion de l'ouverture de la lightbox en fonction du fait que l'objet est une photo ou une vidéo
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

//fermeture de la lightbox
function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
    const whiteOut = document.querySelector(".whiteOut");
    whiteOut.style.display = "none";
}

//récupération des media et création de la grid principale
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
        mediaClick.classList.add("mediaclick");
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
              // Ajout manuel de la validation des likes
              document.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                  const focusedElement = document.activeElement;
                  if (focusedElement.tagName === "DIV") {
                  focusedElement.click();
                }
                }
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
}


//fonction principale d'initialisation de la page
async function init() {
    displayPhotographer(selectedPhotographer);
    createTabindexPhotographers();
    displayMedia(selectedMedia, selectedPhotographer);
    displayPrice(selectedPhotographer, selectedMedia);
    setAdditionalAriaLabels();
    createClosingModal();
    updateTabindex(7);
    createNavigation();
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
        updateTabindex(7);
    };

//trier par likes
document.querySelector(".buttonPopularite").addEventListener("click", function () {
    return sortMedia(
      selectedMedia,
      (l1, l2) => l2.likes - l1.likes,
      ".buttonPopularite"
    );
  });

//trier par titre
document.querySelector(".buttonTitre").addEventListener("click", function () {
  return sortMedia(
    selectedMedia,
    (l1, l2) => (l1.title > l2.title ? 1 : -1),
    ".buttonTitre"
  );
});

//trier par date
document.querySelector(".buttonDate").addEventListener("click", function () {
  return sortMedia(
    selectedMedia,
    (l1, l2) => (l1.date < l2.date ? -1 : 1),
    ".buttonDate"
  );
});