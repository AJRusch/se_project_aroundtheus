export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings._errorClass;
    this._modalSpan = settings._modalSpan;
    this._form = formEl;
  }
  resetSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _hideInputError(inputEl) {
    const errorMessageElement = this._form.querySelector(this._inputSelector);
    const modalSpan = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    modalSpan.remove(this._errorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._inputErrorClass);
  }

  _showInputError(inputEl) {
    const errorMessageElement = this._form.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _isValidInput() {
    return this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    const isValidInputResult = this._isValidInput(this._inputEls);
    if (!isValidInputResult) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(evt);
    });
    this._setEventListeners();
  }
}
