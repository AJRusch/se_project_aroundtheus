export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
      avatar: this._avatarElement.src,
    };
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }

  setAvatarImage(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
