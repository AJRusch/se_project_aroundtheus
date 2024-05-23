export default class UserInfo {
  constructor() {
    this._profileName = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__description");
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContnet,
    };
  }
  setUserInfo({ title, description }) {
    this._profileName.textContent = title;
    this._profileDescription.textContent = description;
  }
}
