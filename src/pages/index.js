import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import { initialCards, settings } from "../utils/constants.js";

/* Universal Var */
// const closeButtons = document.querySelectorAll(".modal__close-button");

/* Profile Var */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Places Var */
const placesAddBtn = document.querySelector("#places-add-btn");
const placesAddModal = document.querySelector("#places-add-modal");
const placeTitleInput = document.querySelector("#place-title-input");
const placeUrlInput = document.querySelector("#place-url-input");
const placeAddForm = document.forms["add-place-form"];

/* Card Var */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Image Preview Var*/
// const placesPreviewModal = document.querySelector("#places-preview-modal");
// const placesPreviewImage = placesPreviewModal.querySelector("#places-preview");
// const placesPreviewCaption = placesPreviewModal.querySelector(
//   "#modal-image-caption"
// );

/* Universal Open Modal Function */
// function openModal(modal) {
//   modal.classList.add("modal_open");
//   document.addEventListener("keydown", closeModalEsc);
//   modal.addEventListener("mousedown", closeModalOverlay);
// }

/* Auto Populate Profile Name-Description Upon Open */
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

/* Universal Modal Close Buttons - Close Functions */
// closeButtons.forEach((btn) => {
//   const modal = btn.closest(".modal");
//   btn.addEventListener("click", () => closeModal(modal));
// });

// function closeModal(modal) {
//   modal.classList.remove("modal_open");
//   document.removeEventListener("keydown", closeModalEsc);
//   modal.removeEventListener("mousedown", closeModalOverlay);
// }

// function closeModalEsc(e) {
//   if (e.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_open");
//     closeModal(modalOpened);
//   }
// }

function closeModalOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

/* Universal Reset Form Function */
function resetForm(form) {
  form.reset();
}

/* Edit Profile Name/Title Handler & Listener */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* Add Place Submit Button Listener */
placesAddBtn.addEventListener("click", () => {
  openModal(placesAddModal);
});

placeAddForm.addEventListener("submit", handleNewPlaceSubmit);

/* Image Preview Function */
function handleImageClick(data) {
  imagePreviewModal.open(data);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);

/* Profile Edit Handler w-Reset Validation upon open */
profileEditBtn.addEventListener("click", () => {
  profileEditValidation.resetValidation();
  fillProfileForm();
  openModal(profileEditModal);
});

function renderCard(cardData, wrapper) {
  wrapper.prepend(getCardElement(cardData));
}

/* Submit New Place Handler w- Reset Validation upon success submit */
function handleNewPlaceSubmit(e) {
  e.preventDefault();
  const name = placeTitleInput.value;
  const link = placeUrlInput.value;
  const cardElement = getCardElement({ name, link });
  section.addItem(cardElement);
  resetForm(placeAddForm);
  closeModal(placesAddModal);
}
const section = new Section(
  { items: initialCards, renderer: getCardElement },
  ".cards__list"
);

const imagePreviewModal = new PopupWithImage("#places-preview-modal");

section.renderItems();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();
