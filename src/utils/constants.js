export const initialCards = [
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
export const closeButtons = document.querySelectorAll(".modal__close-button");

/* Profile Var */
export const profileEditBtn = document.querySelector("#profile-edit-btn");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileEditForm = document.forms["profile-form"];
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Places Var */
export const placesAddBtn = document.querySelector("#places-add-btn");
export const placesAddModal = document.querySelector("#places-add-modal");
export const placeTitleInput = document.querySelector("#place-title-input");
export const placeUrlInput = document.querySelector("#place-url-input");
export const placeAddForm = document.forms["add-place-form"];

/* Card Var */
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Image Preview Var*/
export const placesPreviewModal = document.querySelector(
  "#places-preview-modal"
);
export const placesPreviewImage =
  placesPreviewModal.querySelector("#places-preview");
export const placesPreviewCaption = placesPreviewModal.querySelector(
  "#modal-image-caption"
);

/* Form Validation Settings & Var */
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: "modal__form_input_type_error",
  errorClass: "modal__form-input-error-visible",
};
