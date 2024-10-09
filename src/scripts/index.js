import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { renderCard } from "./card.js";
import { deleteCard } from "./card.js";
import { initialCards } from "./cards.js";

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const newName = document.querySelector(".profile__name");
const newJob = document.querySelector(".profile__job");
const inputUrl = document.getElementById("pic-link");
const inputName = document.getElementById("place-name");
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card");
export const popupPhoto = document.querySelector(".popup_type_photo");
export const cardTemplate = document.getElementById("card-template").content;
export const photoText = document.querySelector(".popup__photo-text");
export const photo = document.querySelector("#photo");
export const cardsContainer = document.querySelector(".cards");

renderInitialCards();

function renderInitialCards() {
  initialCards.forEach((item) => renderCard(createCard(item, deleteCard)));
}

document
  .querySelector(".profile__edit-btn-box")
  .addEventListener("click", () => {
    const name = newName.textContent;
    const job = newJob.textContent;

    nameInput.value = name;
    jobInput.value = job;

    openPopup(popupProfile);
  });

document.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(popupProfile);
});

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  openPopup(popupAdd);
});

document.getElementById("popup-close").addEventListener("click", () => {
  closePopup(popupAdd);
});

document.getElementById("popup-photo-close").addEventListener("click", () => {
  closePopup(popupPhoto);
});

document
  .querySelector('[name="profile-form"]')
  .addEventListener("submit", handleProfileFormSubmit);

document
  .querySelector('[name="add-form"]')
  .addEventListener("submit", handleAddCardFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;

  closePopup(popupProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const url = inputUrl.value;
  const name = inputName.value;

  const cardInfo = {
    name: name,
    link: url,
  };

  renderCard(createCard(cardInfo, deleteCard));

  inputUrl.value = "";
  inputName.value = "";

  closePopup(popupAdd);
}
