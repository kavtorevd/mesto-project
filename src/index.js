import "./pages/index.css";

import { enableValidation } from "./scripts/validate.js";
import { createCard } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closePopupByEsc,
  closePopupByOverlay,
} from "./scripts/modal.js";

const profilePopupElement = document.querySelector(".popup_type_edit");
const cardPopupElement = document.querySelector(".popup_type_new-card");
const imagePopupElement = document.querySelector(".popup_type_image");

const popupInputName = profilePopupElement.querySelector(
  ".popup__input_type_name"
);
const popupInputDescription = profilePopupElement.querySelector(
  ".popup__input_type_description"
);

const popupInputCardName = cardPopupElement.querySelector(
  ".popup__input_type_card-name"
);
const popupInputCardUrl = cardPopupElement.querySelector(
  ".popup__input_type_url"
);

const profileInfoElement = document.querySelector(".profile__info");
const profileTitle = profileInfoElement.querySelector(".profile__title");
const profileDescription = profileInfoElement.querySelector(
  ".profile__description"
);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openModal(profilePopupElement);
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function () {
  popupInputCardName.textContent = "";
  popupInputCardUrl.textContent = "";
  openModal(cardPopupElement);
});

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", function () {
    closeModal(closeButton.closest(".popup"));
  });
});

const imageCards = document.querySelectorAll(".card__image");
imageCards.forEach((imageCard) => {
  imageCard.addEventListener("click", function () {
    openModal(imagePopupElement);
    imagePopupElement.querySelector(".popup__image").src = imageCard.src;
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
}

profilePopupElement.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(
    createCard(popupInputCardName.value, popupInputCardUrl.value)
  );
}

cardPopupElement.addEventListener("submit", handleCardFormSubmit);

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });
});

const deleteButtons = document.querySelectorAll(".card__delete-button");
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
});

document.addEventListener("keydown", closePopupByEsc);

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};

enableValidation(validationSettings);
