import Popup from "./Popup.js";

export default class PopupWithDeleteCardConfirm extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._form = this._modalElement.querySelector(".moda__form");
    this._modalButton = this._modalElement.querySelector(".modal__button");
  }

  handleDelete(card) {
    this._handleDeletedCard = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeletedCard();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Loading...";
    } else {
      this._modalButton.textContent = "YES";
    }
  }
}
