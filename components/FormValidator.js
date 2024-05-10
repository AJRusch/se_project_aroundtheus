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
    _this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _showInputError(inputEl) {
    this.errormessageElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this.errormessageElement.textContent = inputEl.validationMessage;
  }

  _hideInputError(inputEl) {
    this.errormessageElement = this._form.querySelector(this._inputSelector);
    inputEl.classList.remove(this._inputErrorClass);
    this._modalSpan.remove(this._errorClass);
    this.errormessageElement.textContent = "";
    this.errormessageElement.textContent = "";
    this.errormessageElement.classList.remove(this._inputErrorClass);
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
    this.isValidForm = this._isValidInput(this._inputEls);
    if (!this.isValidForm) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButtonSelector = this._form.querySelector(
      this._submitButtonSelector
    );
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEls);
        this._toggleButtonState(inputEls);
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
