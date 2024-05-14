import Card from "../../components/Card.js";
import FormValidator from "../../components/FormValidator.js";
import "./index.css";

const initialCards = [
  {
    name: "Mar Caribe",
    link: "https://images.unsplash.com/photo-1538964173425-93884d739596?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mount Shasta",
    link: "https://images.unsplash.com/photo-1581881067989-7e3eaf45f4f6?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Death Valley",
    link: "https://images.unsplash.com/photo-1559767180-47d8f4919e5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2VydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Weddell Sea",
    link: "https://images.unsplash.com/photo-1585247174031-7ff21755972c?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amazon River",
    link: "https://images.unsplash.com/photo-1601687304561-387a8d2f4155?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cairo",
    link: "https://images.unsplash.com/photo-1559738933-d69ac3ff674b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* Universal Var */
const closeButtons = document.querySelectorAll(".modal__close-button");

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
const placesPreviewModal = document.querySelector("#places-preview-modal");
const placesPreviewImage = placesPreviewModal.querySelector("#places-preview");
const placesPreviewCaption = placesPreviewModal.querySelector(
  "#modal-image-caption"
);

/* Universal Open Modal Function */
function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

/* Auto Populate Profile Name-Description Upon Open */
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

/* Universal Modal Close Buttons - Close Functions */
closeButtons.forEach((btn) => {
  const modal = btn.closest(".modal");
  btn.addEventListener("click", () => closeModal(modal));
});

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_open");
    closeModal(modalOpened);
  }
}

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
function handleImageClick(cardData) {
  placesPreviewImage.src = cardData.link;
  placesPreviewImage.alt = "Photo of " + cardData.name;
  placesPreviewCaption.textContent = cardData.name;
  openModal(placesPreviewModal);
}

/* Intialize Cards */
initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

/* Form Validation Settings & Var */
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: "modal__form_input_type_error",
  errorClass: "modal__form-input-error-visible",
};

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
  renderCard({ name, link }, cardListEl);
  resetForm(placeAddForm);
  addPlaceValidation.resetValidation();
  addPlaceValidation.disableButton();
  closeModal(placesAddModal);
}

profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();
