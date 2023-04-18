    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
        createTabindex();
        createNavigation();
    };

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();

    function createTabindex() {
        let tabIndex = document.querySelectorAll("a");
        tabIndex.forEach((element, index) => {
          element.setAttribute("tabindex", index + 1);
        });
      }

      function createNavigation() {
        let index = 1;
        const elements = document.querySelectorAll("[tabindex]"); 
        document.addEventListener("keydown", function(event) {
            if (event.key === "Tab") {
                console.log(index);
              event.preventDefault(); // prevent the default tab behavior
              document.activeElement.blur(); // remove focus from the current element
              // move focus to the next element with a tab index
              elements[index].focus();
              console.log(elements[index]);
              index = (index + 1) % elements.length;
            }
          });}