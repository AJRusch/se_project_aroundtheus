import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._imagePreview = this._modalElement.querySelector(
      ".modal__preview-image"
    );
    this._imageCaption = this._modalElement.querySelector(
      ".modal__preview-title"
    );
  }
  open(imageData) {
    this._imagePreview.src = imageData.link;
    this._imagePreview.alt = imageData.name;
    this._imageCaption.textContent = imageData.name;
    super.open();
  }
}
