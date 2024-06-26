import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationSettings,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  cardSection,
  cardAddButton,
  cardAddForm,
  editAvatarButton,
  editAvatarForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDeleteCardConfirm from "../components/PopupWithDeleteCardConfirm.js";
import UserInfo from "../components/UserInfo.js";
import API from "../components/API.js";

/* API */

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f5d44699-6bb9-4731-950e-2a46017dd420",
    "Content-Type": "application/json",
  },
});

/* Functions */

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCardClick,
    handleLikeIcon
  );
  const cardElement = card.getView();
  return cardElement;
}

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      { items: cards, validationSettings, renderer: getCardElement },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ title: res.name, description: res.about });
    userInfo.setAvatarImage(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

/* Modal Button Listeners */

profileEditButton.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;
  profileEditModal.open();
  editFormValidator.resetValidation();
});

cardAddButton.addEventListener("click", () => {
  cardAddModal.open();
});

/* Profile Edit */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

function handleProfileEditSubmit(data) {
  profileEditModal.renderLoading(true);
  api
    .updateProfileInfo({ name: data.title, about: data.description })
    .then(() => {
      userInfo.setUserInfo(data);
      profileEditModal.close();
      editFormValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error("Could not update profile info:", err);
    })
    .finally(() => {
      profileEditModal.renderLoading(false);
    });
  editFormValidator.disableSubmitButton();
}

/* Card Add */

const addFormValidator = new FormValidator(validationSettings, cardAddForm);

const cardAddModal = new PopupWithForm(
  "#card-add-modal",
  handleAddCardFormSubmit
);

function handleAddCardFormSubmit(cardData) {
  const { title, url } = cardData;
  cardAddModal.renderLoading(true);
  api
    .addNewCard({ title, url })
    .then((res) => {
      const cardElement = getCardElement(res, {
        name: title,
        link: url,
      });
      section.addItem(cardElement);
      cardAddModal.close();
      cardAddModal.resetForm();
      addFormValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error("Could not add card:", err);
    })
    .finally(() => {
      cardAddModal.renderLoading(false);
    });
}

/* Image Preview */

const previewImageModal = new PopupWithImage("#preview-image-modal");

function handleImageClick(data) {
  previewImageModal.open(data);
}

/* Update Avatar Picture */

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  editAvatarForm
);

const editAvatarModal = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatarSubmit
);

function handleEditAvatarSubmit(data) {
  editAvatarModal.renderLoading(true);
  api
    .updateProfileImage({ avatar: data.link })
    .then((res) => {
      userInfo.setAvatarImage(res.avatar);
      editAvatarModal.close();
    })
    .catch((err) => {
      console.error("Could not update profile image:", err);
    })
    .finally(() => {
      editAvatarModal.renderLoading(false);
    });
}

editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});

/* Delete Card Modal */

const confirmDeleteCardModal = new PopupWithDeleteCardConfirm(
  "#delete-card-modal"
);

function handleDeleteCardClick(card) {
  confirmDeleteCardModal.open();
  confirmDeleteCardModal.handleDelete(() => {
    confirmDeleteCardModal.renderLoading(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        console.log("Card deleted successfully");
        card.handleDeleteCard();
        confirmDeleteCardModal.close();
      })

      .catch((err) => {
        console.error("Could not delete card:", err);
      })
      .finally(() => {
        confirmDeleteCardModal.renderLoading(false);
      });
  });
}

/* Likes */

function handleLikeIcon(card) {
  if (card.getActiveLike()) {
    api
      .deleteLike(card.getCardId())
      .then(() => {
        card.setActiveLike(false);
      })
      .catch((err) => {
        console.error("Could not remove like:", err);
      });
  } else {
    api
      .addLike(card.getCardId())
      .then(() => {
        card.setActiveLike(true);
      })
      .catch((err) => {
        console.error("Could not add like:", err);
      });
  }
}

/* SET Listeners, Validation, Renderer */

profileEditModal.setEventListeners();
cardAddModal.setEventListeners();
previewImageModal.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
editAvatarModal.setEventListeners();
confirmDeleteCardModal.setEventListeners();
