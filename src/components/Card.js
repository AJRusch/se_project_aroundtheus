export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._data = { name, link };
    this._name = name;
    this._link = link;
    //this._id = addData._id;
    //this._activeLike = addData.activeLike;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getCardId() {
    return this._id;
  }

  getActiveLike() {
    return this._activeLike;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__delete-button"
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this.handleDeleteCard();
    });
    //".card__image"
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _renderLike() {
    if (this._activeLike) {
      this._likeButton.classList.add("card__like_button_active");
    } else {
      this._likeButton.classList.remove("card__like_button_active");
    }
  }

  setActiveLike(doLike) {
    this._activeLike = doLike;
    this._renderLike();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._data.link;
    this._cardImageEl.alt = this._data.name;
    this._cardTitleEl.textContent = this._data.name;

    // set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
