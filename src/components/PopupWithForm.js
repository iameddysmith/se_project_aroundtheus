import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__form-input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  reset() {
    if (this._popupForm) {
      this._popupForm.reset();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._popupForm) {
      this._popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  open() {
    super.open();
  }

  setSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  setLoading(isLoading) {
    if (this._submitBtn) {
      if (isLoading) {
        this._submitBtn.textContent = "Saving...";
        this._submitBtn.setAttribute("disabled", true);
      } else {
        this._submitBtn.textContent = "Save";
        this._submitBtn.removeAttribute("disabled");
      }
    }
  }
}
