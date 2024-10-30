import "../pages/index.css";

import { createCard, renderCard, deleteCard, heartToggler } from "./card.js";

import { openPopup, closePopup } from "./modal.js";

import {
  nameInput,
  jobInput,
  newName,
  newJob,
  inputUrl,
  inputName,
  popupProfile,
  popupAdd,
  popupPhoto,
  photoText,
  photo,
  editBtnBox,
  profileAvatarWrapper,
  profileAvatar,
  avatarLinkInput,
  popupAvatar,
} from "./constants.js";

import {
  hasInvalidInput,
  checkInputValidity,
  enableValidation,
  validationConfig,
} from "./validation.js";

import {
  getInitialCardsApi,
  getUserInfoApi,
  editUserInfoApi,
  addCardApi,
  editAvatarApi,
} from "./api.js";

Promise.all([getInitialCardsApi(), getUserInfoApi()])
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardInfo = {
        name: item.name,
        link: item.link,
        id: item._id,
      };
      renderCard(
        createCard(cardInfo, deleteCard, heartToggler, handleImageClick)
      );
    });

    newName.textContent = userInfo.name;
    newJob.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.log(`Error retrieving data from server: ${err}`);
  });

export function handleImageClick(imageLink, imageName) {
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
  const submitButton = evt.target.querySelector(".popup__btn");
  submitButton.textContent = "Сохранение...";

  editAvatarApi(avatarLink)
    .then((data) => {
      console.log(`Avatar updated: ${data}`);
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.error(`Error updating avatar: ${err}`);
      profileAvatar.src = previousAvatarSrc;
    })
    .finally(() => {
      closePopup(popupAvatar, () => {
        submitButton.textContent = "Сохранить";
      });
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;
  const submitButton = evt.target.querySelector(".popup__btn");
  submitButton.textContent = "Сохранение...";

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
      closePopup(popupProfile, () => {
        submitButton.textContent = "Сохранить";
      });
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const url = inputUrl.value;
  const name = inputName.value;
  const submitButton = popupAdd.querySelector(".popup__btn");
  submitButton.textContent = "Создание...";

  const cardInfo = {
    name: name,
    link: url,
  };

  addCardApi(cardInfo.name, cardInfo.link)
    .then((data) => {
      if (data) {
        const cardInfo = {
          name: data.name,
          link: data.link,
          id: data._id,
          likes: data.likes,
        };
        const cardElement = createCard(
          cardInfo,
          deleteCard,
          heartToggler,
          handleImageClick
        );
        renderCard(cardElement);

        const deleteButton = cardElement.querySelector("#delete-btn");
        getUserInfoApi()
          .then((userInfo) => {
            if (userInfo._id === data.owner._id) {
              deleteButton.style.display = "block";
            } else {
              deleteButton.style.display = "none";
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error("Error adding card: No data returned");
      }
    })
    .catch((err) => {
      console.error(`Error adding card: ${err}`);
    })
    .finally(() => {
      closePopup(popupAdd, () => {
        const submitButton = popupAdd.querySelector(".popup__btn");
        submitButton.textContent = "Создать";
      });
    });

  evt.target.reset();
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
