import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

/* Universal Var */
// const closeButtons = document.querySelectorAll(".modal__close-button");

/* Profile Var */
const profileEditBtn = document.querySelector("#profile-edit-btn");
// const profileEditModal = document.querySelector("#profile-edit-modal");
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

/* Auto Populate Profile Name-Description Upon Open */
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
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
  editProfileModal.close();
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* Add Place Submit Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
  addPlaceModal.setEventListeners();
});

placeAddForm.addEventListener("submit", handleNewPlaceSubmit);

/* Image Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
  imagePreviewModal.setEventListeners();
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
  editProfileModal.open();
  editProfileModal.setEventListeners();
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
  addPlaceModal.close();
}
const section = new Section(
  { items: initialCards, renderer: getCardElement },
  ".cards__list"
);

const imagePreviewModal = new PopupWithImage("#places-preview-modal");

const userData = new UserInfo({
  name: "title",
  job: "description",
});

section.renderItems();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addPlaceModal = new PopupWithForm(
  "#places-add-modal",
  handleProfileEditSubmit
);
