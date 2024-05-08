import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;

  function handleImageClick() {
    previewImageCard.src = cardData.link;
    previewImageCard.alt = cardData.name + " " + "Image";
    previewImageTitle.textContent = cardData.name;
    openPopup(previewImageModal);
  }
}

//const card = new Card(cardData, "#card-template");
//card.getView();

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__title");
const profileDescriptionInput = document.querySelector(".modal__description");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardSection = document.querySelector(".cards");
const cardListEl = cardSection.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseBtn = cardAddModal.querySelector("#modal-close-button");
const cardAddForm = document.querySelector("#card-add-form");
const cardTitleInput = cardAddForm.querySelector(".modal__title");
const cardLinkInput = cardAddForm.querySelector(".modal__description");
const previewImageModal = document.querySelector("#preview-image-modal");
const preveiwImageCloseButton =
  previewImageModal.querySelector(".modal__close");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__preview-title"
);
const previewImageCard = previewImageModal.querySelector(
  ".modal__preview-image"
);
const allModal = document.querySelectorAll(".modal");

/* Functions */

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

const isEscEvent = (evt, action) => {
  const activeModal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(activeModal);
  }
};

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.target);
  }
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopup);
};

//function renderCard(cardData, wrapper) {
//const cardElement = getCardElement(cardData);
// wrapper.prepend(cardElement);
//}

//function getCardElement(cardData) {
//const cardElement = cardTemplate.cloneNode(true);
//const cardImageEl = cardElement.querySelector(".card__image");
//const cardTitleEl = cardElement.querySelector(".card__title");
//const likeButton = cardElement.querySelector(".card__like-button");
//const deleteButton = cardElement.querySelector(".card__delete-button");
//deleteButton.addEventListener("click", () => {
//cardElement.remove();
//});
//cardImageEl.addEventListener("click", () => {
//openPopup(previewImageModal);
//previewImageTitle.textContent = cardData.name;
//previewImageCard.alt = cardData.name;
//previewImageCard.src = cardData.link;
//});
//likeButton.addEventListener("click", () => {
//likeButton.classList.toggle("card__like-button_active");
//});
//cardImageEl.src = cardData.link;
//cardImageEl.alt = cardData.name;
//cardTitleEl.textContent = cardData.name;
//return cardElement;
//}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

/*function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closePopup(cardAddModal);
  evt.target.reset();
}*/

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);

  cardListEl.prepend(cardElement);
  closePopup(cardAddModal);
  evt.target.reset();
  addFormValidator._toggleButtonState();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddCloseBtn.addEventListener("click", () => {
  closePopup(cardAddModal);
});

preveiwImageCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
profileEditModal.addEventListener("mousedown", handleEscUp);
cardAddModal.addEventListener("mousedown", closeModalOnRemoteClick);
previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);

/* Form Handlers */

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

/* Validation Sc */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_active",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = document.querySelector("#card-add-form");
const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
