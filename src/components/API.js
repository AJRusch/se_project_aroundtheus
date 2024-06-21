export default class API {
  constructor(options) {
    this.server = options.baseUrl;
    this.headers = options.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.server}/cards`, {
      headers: this.headers,
    }).then(this._checkRes);
  }
  getUserInfo() {
    return fetch(`${this.server}/users/me`, {
      headers: this.headers,
    }).then(this._checkRes);
  }

  renderCards() {
    return Promise.all(this.getUserInfo(), this.getInitialCards());
  }

  updateProfileInfo({ name, about }) {
    return fetch(`${this.server}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkRes);
  }

  updateProfileImage(avatar) {
    return fetch(`${this.server}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(avatar),
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this.server}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: data.title, link: data.url }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this.server}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkRes);
  }

  addLike(cardId) {
    return fetch(`${this.server}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ isLiked: true }),
    }).then(this._checkRes);
  }

  deleteLike(cardId) {
    return fetch(`${this.server}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({ isLiked: false }),
    }).then(this._checkRes);
  }
}
