import { cardTemplate } from "./constants.js";
import { cardsContainer } from "./constants.js";

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function heartToggler(heartIcon) {
  heartIcon.classList.toggle("card__heart_active");
}

export function createCard(item, deleteHandler, heartHandler, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const heartIcon = cardElement.querySelector("#heart-like");

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  deleteButton.addEventListener("click", () => deleteHandler(cardElement));

  heartIcon.addEventListener("click", () => {
    heartHandler(heartIcon);
  });

  cardPhoto.addEventListener("click", () => {
    handleImageClick(item.link, item.name);
  });

  return cardElement;
}

export function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
