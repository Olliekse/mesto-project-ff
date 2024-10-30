import { cardTemplate, cardsContainer, popupDelete } from "./constants.js";

import {
  changeLikeCardStatusApi,
  deleteCardApi,
  getInitialCardsApi,
  getUserInfoApi,
} from "./api.js";

import { handleImageClick } from "./index.js";
import { openPopup, closePopup } from "./modal.js";

function handleDeleteCardSubmit(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
      refreshCards(cardId);
    })
    .catch((err) => {
      console.error(`Error deleting card: ${err}`);
    })
    .finally(() => {
      closePopup(popupDelete);
    });
}

function refreshCards(deletedCardId) {
  getInitialCardsApi()
    .then((data) => {
      const updatedCards = data.filter((card) => card._id !== deletedCardId);
      renderCards(updatedCards);
    })
    .catch((err) => {
      console.error(`Error updating server data: ${err}`);
    });
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach((card) => {
    const cardInfo = {
      name: card.name,
      link: card.link,
      id: card._id,
    };

    const cardElement = createCard(
      cardInfo,
      deleteCard,
      heartToggler,
      handleImageClick
    );
    renderCard(cardElement);

    updateDeleteButton(card, cardElement);
  });
}

function updateDeleteButton(card, cardElement) {
  getUserInfoApi()
    .then((userInfo) => {
      const deleteButton = cardElement.querySelector("#delete-btn");
      if (userInfo._id === card.owner._id) {
        deleteButton.style.display = "block";
      } else {
        deleteButton.style.display = "none";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function deleteCard(cardElement) {
  const cardId = cardElement.dataset.id;

  openPopup(popupDelete);

  popupDelete.addEventListener("submit", () => {
    handleDeleteCardSubmit(cardId, cardElement);
  });
}

export function heartToggler(heartIcon, cardId, isLiked) {
  heartIcon.classList.toggle("card__heart_active");

  const likeCountElement =
    heartIcon.parentNode.querySelector(".card__like-count");

  changeLikeCardStatusApi(cardId, isLiked)
    .then((data) => {
      const likesCount = data.likes.length;
      likeCountElement.textContent = likesCount.toString();
    })
    .catch((err) => {
      console.log(`Error updating like status: ${err}`);
    });
}

function setCardState(cardElement, cardData, userInfo) {
  const deleteButton = cardElement.querySelector("#delete-btn");
  const heartIcon = cardElement.querySelector("#heart-like");
  const likeCountElement =
    heartIcon.parentNode.querySelector(".card__like-count");

  likeCountElement.textContent = cardData.likes.length.toString();

  const isLiked = cardData.likes.some((like) => like._id === userInfo._id);
  heartIcon.classList.toggle("card__heart_active", isLiked);

  if (userInfo._id === cardData.owner._id) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }
}

function attachEventListeners(
  cardElement,
  item,
  deleteHandler,
  heartHandler,
  handleImageClick
) {
  const deleteButton = cardElement.querySelector("#delete-btn");
  const heartIcon = cardElement.querySelector("#heart-like");
  const cardPhoto = cardElement.querySelector(".card__image");

  deleteButton.addEventListener("click", () => {
    deleteHandler(cardElement);
  });

  heartIcon.addEventListener("click", () => {
    heartHandler(
      heartIcon,
      cardElement.dataset.id,
      heartIcon.classList.contains("card__heart_active")
    );
  });

  cardPhoto.addEventListener("click", () => {
    handleImageClick(item.link, item.name);
  });
}

export function createCard(
  item,
  deleteHandler,
  heartHandler,
  handleImageClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  if (item.id) {
    cardElement.dataset.id = item.id;
  }

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  Promise.all([getInitialCardsApi(), getUserInfoApi()])
    .then(([cardsData, userInfo]) => {
      const cardData = cardsData.find((card) => card._id === item.id);
      if (cardData) {
        setCardState(cardElement, cardData, userInfo);
      }
    })
    .catch((err) => {
      console.error(`Error fetching card data or user info: ${err}`);
    });

  attachEventListeners(
    cardElement,
    item,
    deleteHandler,
    heartHandler,
    handleImageClick
  );

  return cardElement;
}

export function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
