// DOM Elements
const formElement = document.querySelector(".popup");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const newName = document.querySelector(".profile__name");
const newJob = document.querySelector(".profile__job");
const cardsContainer = document.querySelector(".cards");
const inputUrl = document.getElementById("pic-link");
const inputName = document.getElementById("place-name");
const photoText = document.querySelector(".popup__photo-text");
const photo = document.querySelector("#photo");
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card");
const popupPhoto = document.querySelector(".popup_type_photo");

// Initial setup
renderInitialCards();

// Render initial cards
function renderInitialCards() {
  initialCards.forEach((item) => renderCard(createCard(item)));
}

// Prepend a card to the container
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// Create a card with the necessary listeners
function createCard(item) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  deleteButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
}
