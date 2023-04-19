    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
        createTabindex();
        createNavigationIndex();
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

      function createNavigationIndex() {
        let index = 1;
        const elements = document.querySelectorAll("[tabindex]"); 
        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowLeft") {
              event.preventDefault(); // prevent the default tab behavior
              document.activeElement.blur(); // remove focus from the current element
              // move focus to the next element with a tab index
              elements[index].focus();
              index = (index + elements.length - 1) % elements.length;
            }
            else if (event.key === "ArrowRight") {
              event.preventDefault(); // prevent the default tab behavior
              document.activeElement.blur(); // remove focus from the current element
              // move focus to the next element with a tab index
              elements[index].focus();
              index = (index + 1) % elements.length; // increment index and wrap around if necessary
            }
          });}
