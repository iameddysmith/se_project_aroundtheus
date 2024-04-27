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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Profile -------------------------------- */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profile-modal-close-btn"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-form");

/* --------------------------------- Places --------------------------------- */
const placesAddBtn = document.querySelector("#places-add-btn");
const placesAddModal = document.querySelector("#places-add-modal");
const placesModalCloseBtn = placesAddModal.querySelector(
  "#places-modal-close-btn"
);
const placeTitleInput = document.querySelector("#place-title-input");
const placeUrlInput = document.querySelector("#place-url-input");
const placeAddForm = placesAddModal.querySelector("#add-place-form");

/* ---------------------------------- Cards --------------------------------- */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* ------------------------------ Image Preview ----------------------------- */
const placesPreviewModal = document.querySelector("#places-preview-modal");
const placesPreviewModalCloseBtn = placesPreviewModal.querySelector(
  "#preview-modal-close-btn"
);
const placesPreviewImage = document.querySelector("#places-preview");
const placesPreviewCaption = document.querySelector("#modal-image-caption");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_open");
  resetPlaceForm(placeAddForm);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeReactBtn = cardElement.querySelector(".card__react-button");
  const deleteActionBtn = cardElement.querySelector(".card__delete-button");

  likeReactBtn.addEventListener("click", () => {
    likeReactBtn.classList.toggle("card__react-button_active");
  });

  deleteActionBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    placesPreviewImage.src = cardData.link;
    placesPreviewImage.alt = "Photo of " + cardData.name;
    placesPreviewCaption.textContent = cardData.name;
    openModal(placesPreviewModal);
    /* placesPreviewModal.classList.add("modal_open"); */
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(getCardElement(cardData));
}

function resetPlaceForm(form) {
  form.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Profile -------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

/* --------------------------------- Places --------------------------------- */
function handleNewPlaceSubmit(e) {
  e.preventDefault();
  const name = placeTitleInput.value;
  const link = placeUrlInput.value;
  renderCard({ name, link }, cardListEl);
  resetPlaceForm(placeAddForm);
  closeModal(placesAddModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Profile -------------------------------- */
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* --------------------------------- Places --------------------------------- */
placesAddBtn.addEventListener("click", () => {
  openModal(placesAddModal);
});
placesModalCloseBtn.addEventListener("click", () => {
  resetPlaceForm(placeAddForm);
  closeModal(placesAddModal);
});
placeAddForm.addEventListener("submit", handleNewPlaceSubmit);

/* ------------------------------ Image Preview ----------------------------- */

placesPreviewModalCloseBtn.addEventListener("click", () => {
  closeModal(placesPreviewModal);
});

/* ---------------------------------- Cards --------------------------------- */
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
