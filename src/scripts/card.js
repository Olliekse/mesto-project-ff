import { openPopup } from "./modal.js";
import { cardTemplate } from "./index.js";
import { photoText } from "./index.js";
import { photo } from "./index.js";
import { cardsContainer } from "./index.js";
import { popupPhoto } from "./index.js";


export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(item, deleteHandler) {
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
    heartToggler();
  });

  function heartToggler() {
    heartIcon.classList.toggle("card__heart_active");
  }

  cardPhoto.addEventListener("click", () => {
    photo.src = item.link;
    photo.alt = item.name;
    photoText.textContent = item.name;

    openPopup(popupPhoto);
  });

  return cardElement;
}

export function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
