export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = {
      name: data.name,
      link: data.link,
    };
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__react-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__react-button")
      .classList.toggle("card__react-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._data.name;
    this._cardImageEl.src = this._data.link;
    this._cardImageEl.alt = "Photo of " + this._data.name;
    this._setEventListeners();
    return this._cardElement;
  }
}
