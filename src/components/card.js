import { cardTemplate } from "./constants.js";
import { cardsContainer } from "./constants.js";
import { changeLikeCardStatusApi, deleteCardApi } from "./api.js";
import { getInitialCardsApi } from "./api.js";
import { handleImageClick } from "./index.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { popupDelete } from "./constants.js";
import { getUserInfoApi } from "./api.js";

export function deleteCard(cardElement) {
  const cardId = cardElement.dataset.id;

  openPopup(popupDelete);

  popupDelete.addEventListener("submit", () => {
    deleteCardApi(cardId)
      .then(() => {
        cardElement.remove();

        getInitialCardsApi()
          .then((data) => {
            const updatedCards = data.filter((card) => card._id !== cardId);

            cardsContainer.innerHTML = "";

            updatedCards.forEach((card) => {
              const cardInfo = {
                name: card.name,
                link: card.link,
                id: card.id,
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
                  if (userInfo._id === card.owner._id) {
                    deleteButton.style.display = "block";
                  } else {
                    deleteButton.style.display = "none";
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          })
          .catch((err) => {
            console.error(`Error updating server data: ${err}`);
          });
      })
      .catch((err) => {
        console.error(`Error deleting card: ${err}`);
      });

    closePopup(popupDelete);

    getUserInfoApi()
      .then((userInfo) => {
        const cards = cardsContainer.children;
        Array.from(cards).forEach((card) => {
          const deleteButton = card.querySelector("#delete-btn");
          const cardId = card.dataset.id;
          getInitialCardsApi()
            .then((data) => {
              const cardData = data.find((card) => card._id === cardId);
              if (cardData && userInfo._id === cardData.owner._id) {
                deleteButton.style.display = "block";
              } else {
                deleteButton.style.display = "none";
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
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

export function createCard(
  item,
  deleteHandler,
  heartHandler,
  handleImageClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const heartIcon = cardElement.querySelector("#heart-like");
  const likeCountElement =
    heartIcon.parentNode.querySelector(".card__like-count");

  if (item.id) {
    cardElement.dataset.id = item.id;
  }

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  getInitialCardsApi()
    .then((data) => {
      const cardData = data.find((card) => card._id === item.id);

      if (cardData) {
        likeCountElement.textContent = cardData.likes.length.toString();

        getUserInfoApi()
          .then((userInfo) => {
            const isLiked = cardData.likes.some(
              (like) => like._id === userInfo._id
            );
            heartIcon.classList.toggle("card__heart_active", isLiked);

            if (userInfo._id === cardData.owner._id) {
              deleteButton.style.display = "block";
            } else {
              deleteButton.style.display = "none";
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });

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

  return cardElement;
}

export function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
