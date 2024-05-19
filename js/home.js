// Section 2

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

// Section 3

// Section : Avis

const commentsContainer = document.getElementsByClassName("reviews_section");

// Function to fetch comments data
function getComments(commentsId) {
  fetch(apiUrl + `avis/${commentsId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data:", error));
}

getComments(1);

// Function to POST new comments

const commentsForm = document.getElementById("commentsForm");

function postComments() {
  const dataForm = new FormData(commentsForm);

  fetch(apiUrl + `avis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pseudo: dataForm.get("commentsPseudo"),
      commentaire: dataForm.get("commentsText"),
      isVisible: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Votre commentaire a bien été envoyé");
    })
    .catch((error) => console.error("Error posting data:", error));
}

const btnAddComments = document.getElementById("btnAddComments");
btnAddComments.addEventListener("click", postComments);
