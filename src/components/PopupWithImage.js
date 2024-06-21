import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._imagePreview = this._modalElement.querySelector(
      ".modal__preview-image"
    );
    this._imageTitle = this._modalElement.querySelector(
      ".modal__preview-title"
    );
  }
  open(imageData) {
    this._imagePreview.src = imageData.link;
    this._imagePreview.alt = imageData.name;
    this._imageTitle.textContent = imageData.name;
    super.open();
  }
}
