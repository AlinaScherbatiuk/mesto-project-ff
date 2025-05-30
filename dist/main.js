/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/cards.js
var initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}];
;// ./src/card.js
var deleteCard = function deleteCard(cardElement) {
  return cardElement.remove();
};
var likeBtnClick = function likeBtnClick(cardElement) {
  return cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};
var createCard = function createCard(item, handleImageClick) {
  var cardTemplate = document.querySelector('#card-template');
  var cardElement = cardTemplate.content.cloneNode(true).children[0];
  var deleteButton = cardElement.querySelector('.card__delete-button');
  var likeBtn = cardElement.querySelector('.card__like-button');
  var cardTitle = cardElement.querySelector('.card__title');
  var cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });
  cardImage.addEventListener('click', function () {
    handleImageClick(item.link, item.name, cardTitle.textContent);
  });
  likeBtn.addEventListener('click', function () {
    likeBtnClick(cardElement);
  });
  return cardElement;
};

;// ./src/modal.js
var handleCloseButtonClick = function handleCloseButtonClick(evt) {
  var modal = evt.target.closest(".popup");
  if (modal) {
    closeModal(modal);
  }
};
var handleEscapeBtn = function handleEscapeBtn(evt) {
  if (evt.key === "Escape") {
    var openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
};
var openModal = function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeBtn);
};
var closeModal = function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeBtn);
};

;// ./src/index.js




var cardsParent = document.querySelector('.places__list');
var editModal = document.querySelector('.popup_type_edit');
var imagePopup = document.querySelector('.popup_type_image');
var newCardPupup = document.querySelector('.popup_type_new-card');
var closeButtons = document.querySelectorAll('.popup__close');
var nameInput = document.querySelector('.popup__input_type_name');
var descriptionInput = document.querySelector('.popup__input_type_description');
var cardName = document.querySelector('.popup__input_type_card-name');
var imgUrl = document.querySelector('.popup__input_type_url');
var editButton = document.querySelector('.profile__edit-button');
var profilTitle = document.querySelector('.profile__title');
var profilDesc = document.querySelector('.profile__description');
var addButton = document.querySelector('.profile__add-button');
var newPlaceForm = document.forms["new-place"];
var editProfileForm = document.forms["edit-profile"];

//events
document.addEventListener('DOMContentLoaded', function () {
  drawCards(initialCards, cardsParent);
});
document.querySelectorAll('.popup').forEach(function (modal) {
  modal.classList.add('popup_is-animated');
  modal.addEventListener('click', function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});
document.querySelectorAll('.popup__close').forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.closest('.popup').classList.remove('popup_opened');
  });
});
editProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  updateProfileData(evt, nameInput, descriptionInput, profilTitle, profilDesc);
  closeModal(editModal);
});
editButton.addEventListener('click', function () {
  return openProfileModal(editModal, nameInput, descriptionInput, profilTitle, profilDesc);
});
closeButtons.forEach(function (btn) {
  btn.addEventListener('click', function (evt) {
    handleCloseButtonClick(evt);
  });
});
addButton.addEventListener('click', function () {
  return openModal(newCardPupup);
});
newPlaceForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewCard(evt, cardName, imgUrl, cardsParent);
  cardName.value = '';
  imgUrl.value = '';
  closeModal(newCardPupup);
});

//functions
function drawCards(cards, container) {
  cards.forEach(function (card) {
    var cardElem = createCard(card, function () {
      return openImagePopup(card.link, card.name, card.name);
    });
    container.append(cardElem);
  });
}
function openProfileModal(modal, nameInput, descriptionInput, profilTitle, profilDesc) {
  nameInput.value = profilTitle.textContent;
  descriptionInput.value = profilDesc.textContent;
  openModal(modal);
}
function openImagePopup(src, alt, caption) {
  var popupImage = imagePopup.querySelector('.popup__image');
  var popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
  openModal(imagePopup);
}
function updateProfileData(evt, nameInput, descriptionInput, profilTitle, profilDesc) {
  evt.preventDefault();
  var nameInputValue = nameInput.value;
  var jobInputValue = descriptionInput.value;
  profilTitle.textContent = nameInputValue;
  profilDesc.textContent = jobInputValue;
}
function addNewCard(evt, cardName, imgUrl, cardsParent) {
  evt.preventDefault();
  var newImg = cardName.value;
  var newUrl = imgUrl.value;
  var card = {
    name: newImg,
    link: newUrl
  };
  var cardElem = createCard(card, function () {
    return openImagePopup(card.link, card.name, card.name);
  });
  cardsParent.prepend(cardElem);
}
/******/ })()
;