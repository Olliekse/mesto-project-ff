// DOM Elements
const formElement = document.querySelector(".popup");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const newName = document.querySelector(".profile__name");
const newJob = document.querySelector(".profile__job");
const cardsContainer = document.querySelector(".cards");
const inputUrl = document.getElementById("pic-link");
const inputName = document.getElementById("place-name");
const photoText = document.querySelector(".popup__photo-text");
const photo = document.querySelector("#photo");
const popupProfile = document.querySelector(".popup_type_profile");
const popupAdd = document.querySelector(".popup_type_card");
const popupPhoto = document.querySelector(".popup_type_photo");

// Initial setup
renderInitialCards();
attachEventListeners();

// Render initial cards
function renderInitialCards() {
  initialCards.forEach((item) => renderCard(createCard(item)));
}

// Prepend a card to the container
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// Create a card with the necessary listeners
function createCard(item) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector("#delete-btn");
  const heartIcon = cardElement.querySelector("#heart-like");
  const cardPhoto = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardText.textContent = item.name;
  cardPhoto.alt = item.name;
  cardPhoto.src = item.link;

  deleteButton.addEventListener("click", () => cardElement.remove());
  heartIcon.addEventListener("click", () => toggleLike(heartIcon));
  cardPhoto.addEventListener("click", () => openPhotoPopup(item));

  return cardElement;
}

// Toggle like button
function toggleLike(heartIcon) {
  heartIcon.classList.toggle("card__heart_active");
}

// Open photo popup
function openPhotoPopup(item) {
  photo.src = item.link;
  photo.alt = item.name;
  photoText.textContent = item.name;
  openPopup(popupPhoto);
}

// Utility function to open a popup
function openPopup(element) {
  element.classList.add("popup_opened");
}

// Utility function to close a popup
function closePopup(element) {
  element.classList.remove("popup_opened");
}

// Handle profile form submission
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Handle add card form submission
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardInfo = { name: inputName.value, link: inputUrl.value };
  renderCard(createCard(cardInfo));
  resetAddCardForm();
  closePopup(popupAdd);
}

// Reset add card form
function resetAddCardForm() {
  inputUrl.value = "";
  inputName.value = "";
}

// Attach all event listeners
function attachEventListeners() {
  // Profile edit button
  document.querySelector(".profile__edit-btn-box").addEventListener("click", () => {
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
    openPopup(popupProfile);
  });

  // Add card button
  document.querySelector(".profile__add-btn").addEventListener("click", () => openPopup(popupAdd));

  // Close buttons for popups
  document.querySelectorAll(".popup__close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => closePopup(closeBtn.closest(".popup")));
  });

  // Form submissions
  document.querySelector('[name="profile-form"]').addEventListener("submit", handleProfileFormSubmit);
  document.querySelector('[name="add-form"]').addEventListener("submit", handleAddCardFormSubmit);
}
