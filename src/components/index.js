import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { renderCard } from "./card.js";
import { deleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { heartToggler } from "./card.js";
import { nameInput } from "./constants.js";
import { jobInput } from "./constants.js";
import { newName } from "./constants.js";
import { newJob } from "./constants.js";
import { inputUrl } from "./constants.js";
import { inputName } from "./constants.js";
import { popupProfile } from "./constants.js";
import { popupAdd } from "./constants.js";
import { popupPhoto } from "./constants.js";
import { photoText } from "./constants.js";
import { photo } from "./constants.js";
import { editBtnBox } from "./constants.js";

renderInitialCards();

function renderInitialCards() {
  initialCards.forEach((item) =>
    renderCard(createCard(item, deleteCard, heartToggler, handleImageClick))
  );
}

function handleImageClick(imageLink, imageName) {
  photo.src = imageLink;
  photo.alt = imageName;
  photoText.textContent = imageName;
  openPopup(popupPhoto);
}

function handleEditProfileClick() {
  const name = newName.textContent;
  const job = newJob.textContent;

  nameInput.value = name;
  jobInput.value = job;

  openPopup(popupProfile);
}

editBtnBox.addEventListener("click", handleEditProfileClick);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    )
      closePopup(popup);
  });
});

// popupProfile.querySelector(".popup__close").addEventListener("click", () => {
//   closePopup(popupProfile);
// });

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  openPopup(popupAdd);
});

// popupAdd.querySelector(".popup-close").addEventListener("click", () => {
//   closePopup(popupAdd);
// });

// popupPhoto.querySelector(".popup-photo-close").addEventListener("click", () => {
//   closePopup(popupPhoto);
// });

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

  renderCard(createCard(cardInfo, deleteCard, heartToggler, handleImageClick));

  evt.target.reset();

  closePopup(popupAdd);
}
