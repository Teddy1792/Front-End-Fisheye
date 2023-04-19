const url = new URL(window.location.href);
let photographerId = url.searchParams.get("id");
const modal = document.getElementById("contact_modal");

function displayModal() {
    GenerateInModal();
    greyOut();
    sendResult();
    modal.style.display = "block";
    setTimeout(() => {
        let input = document.querySelectorAll("input");
        let button = modal.querySelector(".contact_button");
        input = Array.from(input); // convert the NodeList to an array
        input.push(button);
        let tabindexModal = 0;
        input.forEach(element => {
            element.setAttribute("tabindex", tabindexModal);
            tabindexModal += 1;
        });
        document.querySelector("input").focus();
    }, 100);
    //navigation spéciale
    let indexModal = 0;
    if (modal) { // check if modal exists
      modal.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          let elements = modal.querySelectorAll("[tabindex]");
          elements[indexModal].blur();
          indexModal = indexModal > 0 ? indexModal - 1 : elements.length - 1;
          elements[indexModal].focus();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          let elements = modal.querySelectorAll("[tabindex]");
          elements[indexModal].blur();
          indexModal = indexModal < elements.length - 1 ? indexModal + 1 : 0;
          elements[indexModal].focus();
        }
      });
    }
}


function closeModal() {
    const modal = document.getElementById("contact_modal");
    const grayOut = document.getElementById("over");
    grayOut.style.display = "none";
    modal.style.display = "none";
}

function greyOut () {
    if(document.getElementById("over") === null){
        const grayOut = document.createElement("div");
        grayOut.setAttribute("id", "over");
        grayOut.style.display = "block";
        const body = document.querySelector("body");
        body.appendChild(grayOut);
    }
    else {
        const grayOut = document.getElementById("over");
        grayOut.style.display = "block";
    }
}

async function GenerateInModal () {
    if(document.querySelector("h2").innerHTML === "Contactez-moi") {
        //générer la forme
        const { name } = await filterPhotographers(photographerId);
        const Titre = document.querySelector("h2");
        Titre.classList.add("name");
        Titre.innerHTML += "<br />";
        Titre.innerHTML +=`${name}`;

        const nameBox = document.createElement("div");
        const lastNameLabel = document.createElement("label");
        lastNameLabel.innerText = "Nom";
        const LastNameInput = document.createElement("input");

        nameBox.appendChild(lastNameLabel);
        nameBox.appendChild(LastNameInput);

        const emailBox = document.createElement("div");
        const emailLabel = document.createElement("label");
        emailLabel.innerText = "Email";
        const emailInput = document.createElement("input");

        emailBox.appendChild(emailLabel);
        emailBox.appendChild(emailInput);

        const messageBox = document.createElement("div");
        const messageLabel = document.createElement("label");
        messageLabel.innerText = "Votre message";
        const messageInput = document.createElement("input");

        messageBox.appendChild(messageLabel);
        messageBox.appendChild(messageInput);

        const form = document.querySelector("form");
        form.appendChild(nameBox);
        form.appendChild(emailBox);
        form.appendChild(messageBox);
    }
}

function sendResult() {
    const buttons = document.querySelectorAll('.contact_button');
    const buttonEnvoi = buttons[1];
    buttonEnvoi.addEventListener("click", function(event) {
        event.preventDefault();
        const inputResults = document.querySelectorAll("input");
        if(
            inputResults[0].value.length >= 2 
            && inputResults[1].value.length >= 2 
            && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(inputResults[2].value)
            && inputResults[3].value.length >= 2 
        ) {
            inputResults.forEach(element => console.log(element.value));
        }
        }
    )
}