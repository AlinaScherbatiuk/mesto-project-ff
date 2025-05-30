import '/pages/index.css';
import { initialCards } from './cards.js';
import { createCard } from './card.js';
import { closeModal, openModal } from './modal.js';

const cardsParent = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

const editModal = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const newCardPupup = document.querySelector('.popup_type_new-card');

const closeButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description')
const inputNameFormNewCard = document.querySelector('.popup__input_type_card-name');
const inputLinkFormNewCard = document.querySelector('.popup__input_type_url');

const editButton = document.querySelector('.profile__edit-button');
const profilTitle = document.querySelector('.profile__title');
const profilDesc = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');

const newPlaceForm = document.forms["new-place"];
const editProfileForm = document.forms["edit-profile"];

//events
document.addEventListener('DOMContentLoaded', () => {
  drawCards(initialCards, cardsParent);
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

addButton.addEventListener('click', () => openModal(newCardPupup));

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent);
  evt.target.reset();
  closeModal(newCardPupup);
});

//functions
function drawCards(cards, container) {
  cards.forEach((card) => {
    const cardElem = createCard(card, () => openImagePopup(card.link, card.name, card.name), cardTemplate);

    container.append(cardElem);
  });
}

function openProfileModal(modal, nameInput, descriptionInput, profilTitle, profilDesc) {
  nameInput.value = profilTitle.textContent;
  descriptionInput.value = profilDesc.textContent;
  openModal(modal);
}

function openImagePopup(src, alt, caption) {

  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
  openModal(imagePopup);
}

function updateProfileData(evt, nameInput, descriptionInput, profilTitle, profilDesc) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = descriptionInput.value;

  profilTitle.textContent = nameInputValue;
  profilDesc.textContent = jobInputValue;
}

function addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent) {
  evt.preventDefault();

  const newImg = inputNameFormNewCard.value;
  const newUrl = inputLinkFormNewCard.value;
  const card = { name: newImg, link: newUrl };
  const cardElem = createCard(card,
    () => openImagePopup(card.link, card.name, card.name), cardTemplate);
  cardsParent.prepend(cardElem);
}

