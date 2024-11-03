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

export const clearValidation = (formElement, validationConfig) => {
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
