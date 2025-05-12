const BASE_URL = "http://localhost:8000";

const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const inputAuthor = document.getElementById("inputAuthor");
const inputPublicationYear = document.getElementById("inputPublicationYear");
const inputIsbn = document.getElementById("inputISBN");
const btnCreate = document.getElementById("btnCreate");

const createBooks = () => {

  fetch(BASE_URL + "/books", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title: inputTitle.value,
      description: inputDescription.value,
      author: inputAuthor.value,
      publicationYear: inputPublicationYear.value,
      ISBN: inputIsbn.value,
    }),
  }).then(() => {
    inputTitle.value = "";
    inputDescription.value = "";
    inputAuthor.value = "";
    inputPublicationYear.value = "";
    inputIsbn.value = "";
    getBooks();
  });
};

const getAnimals = () => {
  fetch(BASE_URL + "/animals")
    .then((res) => res.json())
    .then((animals) => {
      const animalsContainer = document.getElementById("animalsContainer");
      animalsContainer.innerHTML = "";

      animals.forEach((animal) => {
        animalsContainer.innerHTML += `
          <h2>${animal.name} - F: ${
          animal.strength
        } <button onclick="deleteAnimal(${
          animal.id
        })">Eliminar</button> <button onclick='updateAnimal(${JSON.stringify(
          animal
        )})'>Modificar</button> </h2>
        `;
      });
    });
};

const deleteAnimal = (animalId) => {
  fetch(BASE_URL + "/animals/" + animalId, {
    method: "DELETE",
  }).then(() => getAnimals());
};

const updateAnimal = (animal) => {
  const nameToUpdate = prompt("Ingrese un nuevo nombre", animal.name);
  const strengthToUpdate = prompt("Ingrese una nueva fuerza", animal.strength);
  const idToUpdate = animal.id;
  if(!nameToUpdate || !strengthToUpdate){
    alert("Por favor ingrese nombre y fuerza");
    return;
  }
  fetch(BASE_URL + `/animals/${idToUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameToUpdate,
      strength: strengthToUpdate,
    }),
  }).then(() => {
    alert(`Animal ${animal.name} actualizado a ${nameToUpdate}`);
    getAnimals();
  });
};

btnCreate.addEventListener("click", createBooks);
getAnimals();