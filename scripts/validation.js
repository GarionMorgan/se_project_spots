const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  // const toggleButtonState = () => {
  //   if (formEl.checkValidity()) {
  //     buttonEl.disabled = false;
  //     buttonEl.classList.add("modal__submit-btn_active");
  //   } else {
  //     buttonEl.disabled = true;
  //     buttonEl.classList.remove("modal__submit-btn_active");
  //   }
  // };

  const showInputError = (formEl, inputEl, errorMessage) => {
    const errorEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add("modal__input_type_error");
    errorEl.textContent = errorMessage;
    errorEl.classList.add("modal__error_visible");
  };

  // const hideInputError = (inputEl) => {
  //   const errorMsgID = inputEl.nextElementSibling;

  //   inputEl.classList.remove("modal__input_type_error");
  //   errorEl.textContent = "";
  //   errorEl.classList.remove("modal__error_visible");
  // };

  const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      // hideInputError(inputEl);
    }
  };

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      // toggleButtonState(inputList, buttonEl);
    });
  });

  // toggleButtonState();
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
