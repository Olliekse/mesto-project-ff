import { cardTemplate } from "./constants.js";
import { cardsContainer } from "./constants.js";
import { deleteCardApi } from "./api.js";
import { getInitialCardsApi } from "./api.js";
import { handleImageClick } from "./index.js";

export function deleteCard(cardElement) {
  console.log("cardElement:", cardElement);
  const cardId = cardElement.dataset.id;
  console.log(`Deleting card with ID ${cardId}`);
  deleteCardApi(cardId)
    .then(() => {
      console.log("Card deleted successfully");

      cardElement.remove();
      console.log("Card element removed from DOM");

      getInitialCardsApi()
        .then((data) => {
          console.log("Received updated cards data");
          const updatedCards = data.filter((card) => card._id !== cardId);
          console.log("Updated cards data filtered");

          cardsContainer.innerHTML = "";

          updatedCards.forEach((card) => {
            const cardInfo = {
              name: card.name,
              link: card.link,
              id: card.id,
            };
            renderCard(
              createCard(cardInfo, deleteCard, heartToggler, handleImageClick)
            );
          });
        })
        .catch((err) => {
          console.error(`Error updating server data: ${err}`);
        });
    })
    .catch((err) => {
      console.error(`Error deleting card: ${err}`);
    });
}

export function heartToggler(heartIcon) {
  heartIcon.classList.toggle("card__heart_active");
}

export function createCard(
  item,
  deleteHandler,
  heartHandler,
  handleImageClick
) {
  console.log("item:", item);
  console.log("item._id:", item._id);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const heartIcon = cardElement.querySelector("#heart-like");

  if (item.id) {
    cardElement.dataset.id = item.id;
  }

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  deleteButton.addEventListener("click", () => {
    deleteHandler(cardElement);
  });
  heartIcon.addEventListener("click", () => {
    heartHandler(heartIcon);
  });

  cardPhoto.addEventListener("click", () => {
    handleImageClick(item.link, item.name);
  });

  return cardElement;
}

export function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
