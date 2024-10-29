import { validationConfig } from "./validation";

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

export function closePopup(element, callback) {
  const inputFields = Array.from(element.querySelectorAll(".popup__input"));
  const inputErrors = Array.from(
    element.querySelectorAll(".popup__input-error")
  );

  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", onPopupEscPress);

  inputFields.forEach((field) => {
    field.classList.remove(validationConfig.inputErrorClass);
  });
  inputErrors.forEach((error) => {
    error.classList.remove(validationConfig.errorClass);
  });

  if (callback) {
    element.addEventListener("transitionend", callback, { once: true });
  }
}
