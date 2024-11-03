import { cardTemplate, cardsContainer, popupDelete } from "./constants.js";
import { handleImageClick } from "./index.js";
import { changeLikeCardStatusApi, deleteCardApi } from "./api.js";
import { openPopup, closePopup } from "./modal.js";

function handleDeleteCardSubmit(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
      closePopup(popupDelete);
    })
    .catch((err) => {
      console.error(`Error deleting card: ${err}`);
      alert("Не удалось удалить карточку. Попробуйте ещё раз.");
    });
}

export function deleteCard(cardElement) {
  const cardId = cardElement.dataset.id;

  openPopup(popupDelete);

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    handleDeleteCardSubmit(cardId, cardElement);
    popupDelete.removeEventListener("submit", handleDeleteSubmit);
  };

  popupDelete.addEventListener("submit", handleDeleteSubmit);
}

export function heartToggler(heartIcon, cardId, isLiked) {
  const likeCountElement = heartIcon
    .closest(".card")
    .querySelector(".card__like-count");

  changeLikeCardStatusApi(cardId, isLiked)
    .then((data) => {
      const likesCount = data.likes.length;
      likeCountElement.textContent = likesCount.toString();
      heartIcon.classList.toggle("card__heart_active");
    })
    .catch((err) => {
      console.log(`Error updating like status: ${err}`);
    });
}

function setCardState(cardElement, cardData, userId) {
  const deleteButton = cardElement.querySelector("#delete-btn");
  const heartIcon = cardElement.querySelector("#heart-like");
  const likeCountElement =
    heartIcon.parentNode.querySelector(".card__like-count");

  likeCountElement.textContent = cardData.likes.length.toString();

  const isLiked = cardData.likes.some((like) => like._id === userId);
  heartIcon.classList.toggle("card__heart_active", isLiked);

  if (userId === cardData.ownerId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }
}

function attachEventListeners(cardElement, config) {
  const { cardInfo } = config;
  const deleteButton = cardElement.querySelector("#delete-btn");
  const heartIcon = cardElement.querySelector("#heart-like");
  const cardPhoto = cardElement.querySelector(".card__image");

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  heartIcon.addEventListener("click", () => {
    heartToggler(
      heartIcon,
      cardElement.dataset.id,
      heartIcon.classList.contains("card__heart_active")
    );
  });

  cardPhoto.addEventListener("click", () => {
    handleImageClick(cardInfo.link, cardInfo.name);
  });
}

export function createCard(config) {
  const { cardInfo, userId } = config;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  if (cardInfo.id) {
    cardElement.dataset.id = cardInfo.id;
  }

  cardText.textContent = cardInfo.name;
  cardPhoto.alt = cardInfo.name;
  cardPhoto.src = cardInfo.link;

  setCardState(cardElement, cardInfo, userId);
  attachEventListeners(cardElement, config);

  return cardElement;
}

export function renderCard(cardElement, method = "prepend") {
  cardsContainer[method](cardElement);
}
