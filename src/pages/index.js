import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "86ad626a-488e-4505-926f-04913062aa19",
    "content-type": "application/json",
  },
});

/* Profile Var */
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Places Var */
const placesAddBtn = document.querySelector("#places-add-btn");
const placeAddForm = document.forms["add-place-form"];

/* Image Click Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);

const imagePreviewModal = new PopupWithImage("#places-preview-modal");

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addPlaceModal = new PopupWithForm(
  "#places-add-modal",
  handleNewPlaceSubmit
);

const deletePlaceModal = new PopupWithForm("#places-delete-modal", () => {});

editProfileModal.setEventListeners();
imagePreviewModal.setEventListeners();
addPlaceModal.setEventListeners();
deletePlaceModal.setEventListeners();

profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

/* DELETE Place Function */
function handleDeleteClick(cardID, cardElement) {
  deletePlaceModal.setSubmitHandler(() => {
    api
      .removePlace(cardID)
      .then(() => {
        cardElement.remove();
        deletePlaceModal.close();
      })
      .catch((err) => {
        console.error("Error deleting place:", err);
      });
  });
  deletePlaceModal.open();
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  return card.getView();
}

/* GET Cards */
let section;
api
  .getInitialCards()
  .then((items) => {
    section = new Section(
      {
        items: items,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          return cardElement;
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.error(err));

/* GET Profile */
const userInfo = new UserInfo();
api
  .getUserInfo()
  .then((profileData) => {
    userInfo.setUserInfo(profileData);
  })
  .catch((err) => console.error(err));

/* PATCH Profile Edit Function */
function handleProfileEditSubmit(profileInputValues) {
  const userData = {
    name: profileInputValues.title,
    about: profileInputValues.description,
  };

  api
    .editUserInfo(userData.name, userData.about)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    });
}

/* POST Add Place Function */
function handleNewPlaceSubmit(placeCardData) {
  const cardData = {
    name: placeCardData.title,
    link: placeCardData.url,
  };

  api
    .addNewPlace(cardData.name, cardData.link)
    .then((newPlaceCard) => {
      const cardElement = getCardElement({
        name: newPlaceCard.name,
        link: newPlaceCard.link,
        _id: newPlaceCard._id,
      });
      section.addItem(cardElement);
      addPlaceModal.close();
      addPlaceModal.reset();
      addPlaceValidation.disableButton();
    })
    .catch((err) => {
      console.error("Error adding new place:", err);
    });
}

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileModal.open();
  profileEditValidation.resetValidation();
});

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});
