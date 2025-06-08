import './pages/index.css';
import { createCard, handleLikeClick, handleDeleteClick } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import * as api from './components/api.js';
import { enableValidation, clearValidation } from './components/validation.js';

const cardsParent = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

const editModal = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const newCardPupup = document.querySelector('.popup_type_new-card');

const closeButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description')
const inputNameFormNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = document.querySelector('.popup__input_type_url');

const editButton = document.querySelector('.profile__edit-button');
const profilTitle = document.querySelector('.profile__title');
const profilDesc = document.querySelector('.profile__description');
const profilImage = document.querySelector('.profile__image');
const addButton = document.querySelector('.profile__add-button');

const avatarForm = document.forms['avatar-form'];
const newPlaceForm = document.forms["new-place"];
const editProfileForm = document.forms["edit-profile"];

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarInput = avatarPopup.querySelector('#avatar-input');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;
//events
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, initialCards]) => {
      profilTitle.textContent = user.name;
      profilDesc.textContent = user.about;
      userId = user._id;
      if (user.avatar) {
        profilImage.style.backgroundImage = `url(${user.avatar})`;
      }
      drawCards(initialCards, cardsParent);
    });
  enableValidation(validationConfig);
});

document.querySelectorAll('.popup').forEach(modal => {
  modal.classList.add('popup_is-animated');

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  updateProfileData(evt, nameInput, descriptionInput, profilTitle, profilDesc);
  closeModal(editModal);
});

editButton.addEventListener('click', () => openProfileModal(editModal, nameInput, descriptionInput, profilTitle, profilDesc));

closeButtons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    const modal = evt.target.closest(".popup");
    if (modal) {
      closeModal(modal);
    }
  });
});

addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(newCardPupup)
});

profilImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent);
  evt.target.reset();
  closeModal(newCardPupup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleAvatarFormSubmit();
});

//functions
function drawCards(cards, container) {
  cards.forEach((card) => {
    const cardElem = createCard(card,
      () => openImagePopup(card.link, card.name, card.name),
      handleLikeClick,
      handleDeleteClick,
      cardTemplate, userId);

    container.append(cardElem);
  });
}

function openProfileModal(modal, nameInput, descriptionInput, profilTitle, profilDesc) {
  nameInput.value = profilTitle.textContent;
  descriptionInput.value = profilDesc.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(modal);
}

function openImagePopup(src, alt, caption) {

  popupImage.src = src;
  popupImage.alt = alt;
  popupImageCaption.textContent = caption;
  openModal(imagePopup);
}

function updateProfileData(evt, nameInput, descriptionInput, profilTitle, profilDesc) {
  evt.preventDefault();
  loader(true, editProfileForm);

  const input = { name: nameInput.value, about: descriptionInput.value };

  api.updateUserInfo(input).then((userData) => {
    profilTitle.textContent = userData.name;
    profilDesc.textContent = userData.about;
  })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loader(false, editProfileForm);
    });
}

function addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent) {
  evt.preventDefault();

  loader(true, newPlaceForm);

  const newImg = inputNameFormNewCard.value;
  const newUrl = inputLinkFormNewCard.value;

  const card = { name: newImg, link: newUrl };
  api.addCard(card)
    .then((newCardData) => {
      const cardElem = createCard(newCardData,
        () => openImagePopup(card.link, card.name, card.name),
        handleLikeClick,
        handleDeleteClick,
        cardTemplate, userId);
      cardsParent.prepend(cardElem);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loader(false, newPlaceForm);
    })
  clearValidation(newPlaceForm, validationConfig);
}

function handleAvatarFormSubmit() {
  loader(true, avatarForm);
  api.updateUserAvatar(avatarInput.value)
    .then((userData) => {
      profilImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loader(false, avatarForm);
    })
}

const loader = (isLoading, formElement) => {
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}
