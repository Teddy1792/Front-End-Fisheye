//génération d'éléments

//sous fonction de displayPhotographer()
function createContainer () {
    const container = document.createElement('div');
    container.classList.add('conteneur');
    return container;
}

function createName (name) {
    const nom = document.createElement('p');
    nom.classList.add("nom");
    nom.textContent = `${name}`;
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