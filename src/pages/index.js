import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#person-name");
const profileDescriptionInput = document.querySelector("#person-description");
const profileEditForm = document.querySelector("#profile-edit-form");
const cardSection = document.querySelector(".cards");
const cardListEl = cardSection.querySelector(".cards__list");
const cardAddButton = document.querySelector("#add-button");
const cardAddForm = document.querySelector("#card-add-form");

/* Functions */

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, cardAddForm);

const section = new Section(
  { items: initialCards, renderer: getCardElement },
  ".cards__list"
);

const userInfo = new UserInfo();

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const cardAddModal = new PopupWithForm(
  "#card-add-modal",
  handleAddCardFormSubmit
);

const previewImageModal = new PopupWithImage("#preview-image-modal");

/* Modal Button Listeners */

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditModal.open();
  editFormValidator.resetValidation();
});

cardAddButton.addEventListener("click", () => {
  cardAddModal.open();
});

/* Profile Edit & Card Add Functions */

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditModal.close();
}

function handleAddCardFormSubmit(cardData) {
  const { title, url } = cardData;
  const cardElement = getCardElement({ name: title, link: url });
  section.addItem(cardElement);
  cardAddModal.close();
  cardAddModal.resetForm();
  addFormValidator.disableSubmitButton();
}

/* Image Preview */

function handleImageClick(data) {
  previewImageModal.open(data);
}

/* SET Listeners, Validation, Renderer */

profileEditModal.setEventListeners();
cardAddModal.setEventListeners();
previewImageModal.setEventListeners();
section.renderItems();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* Extras, not sure if I need yet */

/*function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

/*const isEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    action(activeModal);
  }
};

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

/*const handleEscUp = (evt) => {
  isEscEvent(evt, closePopup);
};

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  closePopup(cardAddModal);
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  evt.target.reset();
  getCardElement({ name, link }), cardListEl;
  addFormValidator.toggleButtonState();
}

function handleImageClick(link, name) {
  previewImageCard.src = link;
  previewImageCard.alt = name;
  previewImageTitle.textContent = name;
  openPopup(previewImageModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

[profileEditModal, cardAddModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);
*/
