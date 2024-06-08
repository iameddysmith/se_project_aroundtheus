export default class UserInfo {
  constructor() {
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__description");
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
  }
}
