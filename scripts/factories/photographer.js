function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;

//génération des éléments du DOM
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "portrait du ou de la photograhe");


//création du lien vers les pages perso des photographes
        const photographerId = id; // stockage de la data id dans une constante
        const url = new URL('photographer.html', window.location.href); // création de l'objet URL
        url.searchParams.set('id', photographerId); // assignation de la valeur id
        console.log(url.href); // sortie: .../photographer.html?id=id

//creation du link <a> contenant le lien vers les pages photographers
        const link = document.createElement( 'a' );
        link.setAttribute("class", "lien");
        link.setAttribute("aria-label", `lien vers la page perso de ${name}`);
        link.setAttribute("href", url.href);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const locationElement = document.createElement ('p');
        locationElement.classList.add("location");
        locationElement.innerText = `${city}, ${country}`;

        const taglineElement = document.createElement ('p');
        taglineElement.classList.add("line");
        taglineElement.innerText = `${tagline}`;

        const priceElement = document.createElement ('p');
        priceElement.classList.add("price");
        priceElement.innerText = `${price}€‎/jours`;

//rattachement des éléments du DOM
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(locationElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}