const inputCommentsDisplayFrom = document.getElementById(
  "inputCommentsDisplayFrom"
);
const inputCommentsDisplayTo = document.getElementById(
  "inputCommentsDisplayTo"
);
const displayComments = document.getElementById("displayComments");
const commentsTable = document.getElementById("commentsTable");

displayComments.addEventListener("click", function () {
  const fromId = parseInt(inputCommentsDisplayFrom.value, 10);
  const toId = parseInt(inputCommentsDisplayTo.value, 10);

  if (isNaN(fromId) || isNaN(toId) || fromId > toId) {
    console.error("Invalid input values");
    return;
  }

  // Clear existing table content except the header
  const tableBody = commentsTable.querySelector("tbody");
  tableBody.innerHTML = ""; // This clears the table body

  for (let i = fromId; i <= toId; i++) {
    getComments(i);
  }
});

function getComments(i) {
  fetch(apiUrl + `avis/${i}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (
        data.id === undefined ||
        typeof data.id !== "number" ||
        document.getElementById(`comment-row-${data.id}`)
      ) {
        console.log("Comment already displayed or invalid:", data);
        return; // Skip if already displayed or invalid
      }

      const dataVisibility = data.isVisible ? "Oui" : "Non";
      let template = `
                    <tr id="comment-row-${data.id}">
                        <th scope="row">${data.id}</th>
                          <td>${data.pseudo}</td>
                          <td>${dataVisibility}</td>
                          <td>
                            <select name="isVisible" id="isVisible-${data.id}"
                                onchange="updateVisibility(${data.id}, this)">
                                    <option value="true" ${
                                      data.isVisible ? "selected" : ""
                                    }>Visible</option>
                                    <option value="false" ${
                                      !data.isVisible ? "selected" : ""
                                    }>Non visible</option>
                            </select>
                          </td>
                          <td>${data.commentaire}</td>
                    </tr>`;
      commentsTable.insertAdjacentHTML("beforeend", template);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Update visibility

function updateVisibility(commentId, selectElement) {
  // Fetch other details from the row for completeness
  const row = document.getElementById(`comment-row-${commentId}`);
  const pseudo = row.cells[1].textContent; // Assuming 'pseudo' is in the second cell
  const commentaire = row.cells[4].textContent; // Assuming 'commentaire' is in the fourth cell
  const isVisible = selectElement.value === "true";

  fetch(apiUrl + `avis/${commentId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: commentId.toString(),
        pseudo: pseudo,
        commentaire: commentaire,
        isVisible: isVisible
    })
})
.then(response => {
    console.log("Raw response:", response);
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }
   
    if (response.status === 204 || (response.status >= 200 && response.status < 300)) {
        alert('Mise à jour réussie. Veuillez actualiser la page pour voir les changements');  
        return response.text(); 
    }
    return response.json(); 
})
.then(data => {
    if (data) {
        console.log('Successfully updated:', data);
    } else {
        console.log('No content returned, but update was successful.');
    }
})
.catch(error => {
    console.error('Failed to update:', error);
    alert('Échec de la mise à jour des données');  
});

}

// Update of services


function getServices(i) {
  fetch(apiUrl + `service/${i}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (
        data.id === undefined ||
        typeof data.id !== "number" ||
        document.getElementById(`comment-row-${data.id}`)
      ) {
        console.log("Service already displayed or invalid:", data);
        return; // Skip if already displayed or invalid
      }

      let template = `
      <div class="service">
      <img src="****" class="service-image" />
      <div class="service-details">
        <h3 class="service-title">********</h3>
        <p class="service-description">*******
        </p>
      </div>
      <div class="edit-delete-buttons" data-show="admin">
        <button
          class="btn btn-primary btn-outline-light edit-service-btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button
          class="btn btn-danger delete-service-btn"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
                     `;
      commentsTable.insertAdjacentHTML("beforeend", template);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

