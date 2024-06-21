import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._modalButton = this._modalElement.querySelector(".modal__button");
  }

  _getInputValues() {
    this._modalValues = {};
    this._inputList.forEach((input) => {
      this._modalValues[input.name] = input.value;
    });
    return this._modalValues;
  }

  renderLoading(tyringToSave) {
    if (tyringToSave) {
      this._modalButton.textContent = "Saving...";
    } else {
      this._modalButton.textContent = "Save";
    }
  }

  close() {
    super.close();
  }

  resetForm() {
    this._modalForm.reset();
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}
