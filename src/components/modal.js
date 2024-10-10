function onPopupEscPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", onPopupEscPress);
}

export function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", onPopupEscPress);
}
