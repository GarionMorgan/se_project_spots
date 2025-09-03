const showInputError = (formEl, inputEl, errorMessage) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = errorMessage;
  inputEl.classList.add("modal__input_type_error");
  // errorEl.classList.add("modal__error_visible");
};

const hideInputError = (formEl, inputEl) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);

  inputEl.classList.remove("modal__input_type_error");
  errorEl.textContent = "";
  // errorEl.classList.remove("modal__error_visible");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonEl);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove("modal__submit-btn_disabled");
  }
};

const disableBtn = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("modal__submit-btn_disabled");
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
