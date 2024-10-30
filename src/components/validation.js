import { hideInputError, showInputError, setEventListeners } from "./index.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
};

export const checkInputValidity = (
  formElement,
  inputElement,
  validationConfig
) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.dataset.errorPatternMessage;
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else if (inputElement.validity.valueMissing) {
      const errorMessage = inputElement.dataset.errorMessage;
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else if (inputElement.validity.typeMismatch) {
      const errorMessage = inputElement.dataset.errorTypeMessage;
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else if (inputElement.validity.tooShort) {
      const entered = inputElement.value.length;
      const minLength = inputElement.minLength;
      const errorMessage = inputElement.dataset.errorMinlengthMessage
        .replace("{entered}", entered)
        .replace("{minlength}", minLength);
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else if (inputElement.validity.tooLong) {
      const entered = inputElement.value.length;
      const maxLength = inputElement.maxLength;
      const errorMessage = inputElement.dataset.errorMaxlengthMessage
        .replace("{entered}", entered)
        .replace("{maxlength}", maxLength);
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else {
      inputElement.setCustomValidity("");
    }
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
