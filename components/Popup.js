export default class Popup {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector("#modal-close-button");
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  /*_handleEscClose() {
    if (e.key === "Escape") {
      this.close();
    }
  } */

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._modalElement.addEventListener("click", (evt) => {
      if (evt.target === this._modalElement) {
        this.close();
      }
    });
  }
}
