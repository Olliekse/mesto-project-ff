import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { renderCard } from "./card.js";
import { deleteCard } from "./card.js";
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
import { profileAvatarWrapper } from "./constants.js";
import { profileAvatar } from "./constants.js";
import { avatarLinkInput } from "./constants.js";
import { popupDelete } from "./constants.js";
import { popupAvatar } from "./constants.js";
import {
  getInitialCardsApi,
  setInitialCardsApi,
  getUserInfoApi,
  editUserInfoApi,
  addCardApi,
  deleteCardApi,
  changeLikeCardStatusApi,
  editAvatarApi,
} from "./api.js";

getInitialCardsApi()
  .then((data) => {
    console.log(`Received data from server: ${data}`);

    data.forEach((item) => {
      const cardInfo = {
        name: item.name,
        link: item.link,
        id: item._id,
      };
      renderCard(
        createCard(cardInfo, deleteCard, heartToggler, handleImageClick)
      );
    });
  })
  .catch((err) => {
    console.log(`Error retrieving data from server: ${err}`);
  });

getUserInfoApi()
  .then((userInfo) => {
    console.log(`Received user info from server: ${userInfo}`);

    newName.textContent = userInfo.name;
    newJob.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.log(`Error retrieving user info: ${err}`);
  });

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

  document
  .querySelector('[name="avatar-form"]')
  .addEventListener("submit", handleAvatarFormSubmit);

  function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
  
    const avatarLink = avatarLinkInput.value;
    profileAvatar.src = avatarLink;
  
    editAvatarApi(avatarLink)
      .then((data) => {
        console.log(`Avatar updated: ${data}`);
        profileAvatar.src = data.avatar;
      })
      .catch((err) => {
        console.error(`Error updating avatar: ${err}`);
      })
      .finally(() => {
        closePopup(popupAvatar);
      });
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
  
    const name = nameInput.value;
    const job = jobInput.value;
  
    editUserInfoApi(name, job)
      .then((data) => {
        console.log(`User info updated: ${data}`);
        newName.textContent = data.name;
        newJob.textContent = data.about;
      })
      .catch((err) => {
        console.error(`Error updating user info: ${err}`);
      })
      .finally(() => {
        closePopup(popupProfile);
      });
  }

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const url = inputUrl.value;
  const name = inputName.value;

  const cardInfo = {
    name: name,
    link: url,
  };

  addCardApi(cardInfo.name, cardInfo.link)
    .then((data) => {
      console.log(`Card added to server: ${data}`);
      renderCard(
        createCard(cardInfo, deleteCard, heartToggler, handleImageClick)
      );
    })
    .catch((err) => {
      console.error(`Error adding card: ${err}`);
    });

  evt.target.reset();

  closePopup(popupAdd);
}

export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
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

export const toggleButtonState = (
  inputList,
  buttonElement,
  validationConfig
) => {
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
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

profileAvatarWrapper.addEventListener("click", () => {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

enableValidation(validationConfig);
