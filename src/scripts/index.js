import "../pages/index.css";
import { initialCards } from "./cards.js";

// DOM Elements
const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.getElementById("card-template").content;

// Initial setup
renderInitialCards();

// Render initial cards
function renderInitialCards() {
  initialCards.forEach((item) => renderCard(createCard(item, deleteCard)));
}

// Prepend a card to the container
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// Global delete card handler
function deleteCard(cardElement) {
  cardElement.remove();
}

// Create a card with the necessary listeners
function createCard(item, deleteHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  // Attach the passed deleteHandler to the delete button
  deleteButton.addEventListener("click", () => deleteHandler(cardElement));

  return cardElement;
}
