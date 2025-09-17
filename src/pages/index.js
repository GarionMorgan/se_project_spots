import "./index.css";
import {
  enableValidation,
  settings,
  disableBtn,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

//Cards array
// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e94a018e-c690-4742-811e-7105b58943cf",
    "Content-Type": "application/json",
  },
});
//Fetch initial cards and user info from the api
api
  .getAppInfo()
  .then(([cards, profile]) => {
    cards.forEach((item) => {
      function renderCard(item, method = "append") {
        const cardElement = getCardElement(item);

        cardsList[method](cardElement);
      }
      renderCard(item, "prepend");
    });
    profileNameEl.textContent = profile.name;
    profileDescriptionEl.textContent = profile.about;
    profileAvatarEl.src = profile.avatar;
    editProfileNameInput.value = profile.name;
    editProfileDescriptionInput.value = profile.about;
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//Edit Profile Modal
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileAvatarEl = document.querySelector(".profile__avatar");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

//New Post Modal
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#card-description-input"
);
//Avatar Edit Modal
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
//Delete Card Modal
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteForm = deleteCardModal.querySelector(".modal__form");
const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardCancelBtn = deleteCardModal.querySelector(
  ".modal__cancel-card-btn"
);

//Template objects
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  } else {
    cardLikeBtnEl.classList.remove("card__like-btn_active");
  }

  cardLikeBtnEl.addEventListener("click", () =>
    handleLike(data._id, cardLikeBtnEl)
  );

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Helper functions
const openModal = (modal) => {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", handleEscapeKey);

  modal.addEventListener("click", handleOverlayClick);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", handleEscapeKey);

  modal.removeEventListener("click", handleOverlayClick);
};

//function handler for closing modals
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
};

deleteCardCancelBtn.addEventListener("click", () => {
  const modal = document.getElementById("delete-card-modal");
  closeModal(modal);
});

const handleDeleteCard = (cardElement, cardId) => {
  selectedCard = cardElement;
  selectedCardId = cardId;

  openModal(deleteCardModal);
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .deleteCard(selectedCardId)
    .then(() => {
      console.log("Card deleted");
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
};

const handleLike = (cardId, buttonLiked) => {
  const isLiked = buttonLiked.classList.contains("card__like-btn_active");

  if (isLiked) {
    api
      .handleLike(cardId, isLiked)
      .then(() => {
        buttonLiked.classList.remove("card__like-btn_active");
      })
      .catch(console.error);
  } else {
    api
      .handleLike(cardId, isLiked)
      .then(() => {
        buttonLiked.classList.add("card__like-btn_active");
      })
      .catch(console.error);
  }
};

let selectedCard, selectedCardId;

//Closes all modals
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});

// Event Listeners for Edit Profile Modal
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      // submitBtn.textContent = "Save";
      setButtonText(submitBtn, false);
    });
}

const handlePostSubmit = (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .postCard({
      link: newPostImageInput.value,
      caption: newPostDescriptionInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);

      cardsList.append(cardElement);

      newPostForm.reset();

      disableBtn(newPostSubmitBtn, settings);

      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Event Listeners for New Post Modal
newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handlePostSubmit);

// Event Listeners for avatar Modal
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(avatarInput.value);
  api
    .editAvatarInfo({
      avatar: avatarInput.value,
    })
    .then((data) => {
      console.log(data.avatar);
      profileAvatarEl.src = data.avatar;
      avatarForm.reset();
      disableBtn(avatarSubmitBtn, settings);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
});

//event listeners for Delete Card Modal
deleteCardCloseBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

deleteForm.addEventListener("submit", handleDeleteCardSubmit);

// Enable validation

enableValidation(settings);
