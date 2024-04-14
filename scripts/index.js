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
    name: "Bagby Hot Springs",
    link: "https://images.unsplash.com/photo-1533657794-ad5a8ae38c55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFnYnl8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Amazon River",
    link: "https://images.unsplash.com/photo-1598837218686-a456fdaa5cf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1hem9uJTIwcml2ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Cairo",
    link: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWd5cHR8ZW58MHx8MHx8fDA%3D",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Profile -------------------------------- */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector("#modal-close-btn");
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
const placesModalCloseBtn = placesAddModal.querySelector("#modal-close-btn");
const placeTitleInput = document.querySelector("#place-title-input");
const placeUrlInput = document.querySelector("#place-url-input");
const placeAddForm = placesAddModal.querySelector("#add-place-form");

/* ---------------------------------- Cards --------------------------------- */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeReactBtn = cardElement.querySelector(".card__react-button");

  likeReactBtn.addEventListener("click", () => {
    likeReactBtn.classList.toggle("card__react-button_active");
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
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_open");
});
profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* --------------------------------- Places --------------------------------- */
placesAddBtn.addEventListener("click", () => {
  placesAddModal.classList.add("modal_open");
});
placesModalCloseBtn.addEventListener("click", () => {
  resetPlaceForm(placeAddForm);
  closeModal(placesAddModal);
});

placeAddForm.addEventListener("submit", handleNewPlaceSubmit);

/* ---------------------------------- Cards --------------------------------- */
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
