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
import { formElement } from "./constants.js";
import { inputElement } from "./constants.js";
import { hasInvalidInput } from "./validation.js";
import { checkInputValidity } from "./validation.js";
import { enableValidation } from "./validation.js";
import { validationConfig } from "./validation.js";
import { profileAvatar } from "./constants.js";
import { popupDelete } from "./constants.js";
import { popupAvatar } from "./constants.js";

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

  clearValidation(popupProfile, validationConfig);
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

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  clearValidation(popupAdd, validationConfig);
  openPopup(popupAdd);
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

  renderCard(createCard(cardInfo, deleteCard, heartToggler, handleImageClick));

  evt.target.reset();

  closePopup(popupAdd);
}

export const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );

  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
};

export const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
};

export const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};

export const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

profileAvatar.addEventListener("click", () => {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});


enableValidation(validationConfig);
