import "../pages/index.css";
import { createCard, renderCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { handleSubmit } from "./utils.js";

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
  enableValidation,
  validationConfig,
  clearValidation,
} from "./validation.js";

import {
  getInitialCardsApi,
  getUserInfoApi,
  editUserInfoApi,
  addCardApi,
  editAvatarApi,
} from "./api.js";

let userId;

Promise.all([getInitialCardsApi(), getUserInfoApi()])
  .then(([cards, userInfo]) => {
    userId = userInfo._id;
    newName.textContent = userInfo.name;
    newJob.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach((item) => {
      const cardInfo = {
        name: item.name,
        link: item.link,
        id: item._id,
        ownerId: item.owner._id,
        likes: item.likes,
      };
      renderCard(createCard({ cardInfo, userId }));
    });
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

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return editAvatarApi(avatarLinkInput.value).then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(popupAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return editUserInfoApi(nameInput.value, jobInput.value).then((data) => {
      newName.textContent = data.name;
      newJob.textContent = data.about;
      closePopup(popupProfile);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return addCardApi(inputName.value, inputUrl.value).then((data) => {
      const cardInfo = {
        name: data.name,
        link: data.link,
        id: data._id,
        ownerId: data.owner._id,
        likes: data.likes,
      };
      renderCard(createCard({ cardInfo, userId }));
      evt.target.reset();
      closePopup(popupAdd);
    });
  }
  handleSubmit(makeRequest, evt, "Создание...");
}

profileAvatarWrapper.addEventListener("click", () => {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["add-form"];
const avatarForm = document.forms["avatar-form"];

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(validationConfig);
