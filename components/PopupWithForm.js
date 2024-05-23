import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this._modalValues = {};
    this._inputList.forEach((input) => {
      this._modalValues[input.name] = input.value;
    });
    return this._modalValues;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}
