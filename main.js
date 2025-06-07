/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/components/api.js
// API
var config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  // идентификатор группы
  headers: {
    authorization: '7aa91673-1079-4433-82ab-3cc3aedc26c2',
    // токен
    'Content-Type': 'application/json'
  }
};
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
}
var getUserInfo = function getUserInfo() {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'GET',
    headers: config.headers
  }).then(checkResponse);
};
var getInitialCards = function getInitialCards() {
  return fetch("".concat(config.baseUrl, "/cards"), {
    headers: config.headers
  }).then(checkResponse);
};
var updateUserInfo = function updateUserInfo(data) {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  }).then(checkResponse);
};
var updateUserAvatar = function updateUserAvatar(avatarUrl) {
  return fetch("".concat(config.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(checkResponse);
};
var addCard = function addCard(data) {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(checkResponse);
};
var deleteCard = function deleteCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};
var addLike = function addLike(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: config.headers
  }).then(checkResponse);
};
var removeLike = function removeLike(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};
;// ./src/components/card.js

var likeBtnClick = function likeBtnClick(event, cardData) {
  var likeButton = event.target.closest('.card__like-button');
  var likeContainer = event.target.closest('.card__like-container');
  var likeCounter = likeContainer.querySelector('.card__like-counter');
  if (likeButton) {
    var isLiked = likeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
      removeLike(cardData._id).then(function (updatedCard) {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })["catch"](function (err) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
      });
    } else {
      addLike(cardData._id).then(function (updatedCard) {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })["catch"](function (err) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
      });
    }
  }
};
var createCard = function createCard(item, handleImageClick, cardTemplate, userId) {
  var cardElement = cardTemplate.content.cloneNode(true).children[0];
  var deleteButton = cardElement.querySelector('.card__delete-button');
  var likeBtn = cardElement.querySelector('.card__like-button');
  var cardTitle = cardElement.querySelector('.card__title');
  var cardImage = cardElement.querySelector('.card__image');
  var likeCounter = cardElement.querySelector('.card__like-counter');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes ? item.likes.length : 0;
  var isOwner = item.owner && item.owner._id === userId;
  if (!isOwner) {
    deleteButton.style.display = 'none';
  }
  if (item.likes && item.likes.find(function (like) {
    return like._id === userId;
  })) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  deleteButton.addEventListener('click', function () {
    deleteCard(item._id).then(function () {
      cardElement.remove();
    })["catch"](function (err) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
    });
  });
  cardImage.addEventListener('click', function () {
    handleImageClick(item.link, item.name, cardTitle.textContent);
  });
  likeBtn.addEventListener('click', function (evt) {
    likeBtnClick(evt, item);
  });
  return cardElement;
};

;// ./src/components/modal.js
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

;// ./src/components/validation.js
function showInputError(formElement, inputElement, errorMessage, config) {
  var errorElement = formElement.querySelector(".".concat(inputElement.name, "-input-error"));
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}
function hideInputError(formElement, inputElement, config) {
  var errorElement = formElement.querySelector(".".concat(inputElement.name, "-input-error"));
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
function setEventListeners(formElement, config) {
  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  var buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}
function enableValidation(config) {
  var formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}
function clearValidation(formElement, config) {
  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  var buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, config);
  });
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}
;// ./src/index.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var cardsParent = document.querySelector('.places__list');
var cardTemplate = document.querySelector('#card-template');
var editModal = document.querySelector('.popup_type_edit');
var imagePopup = document.querySelector('.popup_type_image');
var popupImage = imagePopup.querySelector('.popup__image');
var popupImageCaption = imagePopup.querySelector('.popup__caption');
var newCardPupup = document.querySelector('.popup_type_new-card');
var closeButtons = document.querySelectorAll('.popup__close');
var nameInput = document.querySelector('.popup__input_type_name');
var descriptionInput = document.querySelector('.popup__input_type_description');
var inputNameFormNewCard = document.querySelector('.popup__input_type_card-name');
var inputLinkFormNewCard = document.querySelector('.popup__input_type_url');
var editButton = document.querySelector('.profile__edit-button');
var profilTitle = document.querySelector('.profile__title');
var profilDesc = document.querySelector('.profile__description');
var profilImage = document.querySelector('.profile__image');
var addButton = document.querySelector('.profile__add-button');
var avatarForm = document.forms['avatar-form'];
var newPlaceForm = document.forms["new-place"];
var editProfileForm = document.forms["edit-profile"];
var avatarPopup = document.querySelector('.popup_type_avatar');
var avatarInput = avatarPopup.querySelector('#avatar-input');
var validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
var userId;
//events
document.addEventListener('DOMContentLoaded', function () {
  Promise.all([getUserInfo(), getInitialCards()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      user = _ref2[0],
      initialCards = _ref2[1];
    profilTitle.textContent = user.name;
    profilDesc.textContent = user.about;
    userId = user._id;
    if (user.avatar) {
      profilImage.style.backgroundImage = "url(".concat(user.avatar, ")");
    }
    drawCards(initialCards, cardsParent);
  });
  enableValidation(validationConfig);
});
document.querySelectorAll('.popup').forEach(function (modal) {
  modal.classList.add('popup_is-animated');
  modal.addEventListener('click', function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
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
    var modal = evt.target.closest(".popup");
    if (modal) {
      closeModal(modal);
    }
  });
});
addButton.addEventListener('click', function () {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(newCardPupup);
});
profilImage.addEventListener('click', function () {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});
newPlaceForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent);
  evt.target.reset();
  closeModal(newCardPupup);
});
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  handleAvatarFormSubmit();
});

//functions
function drawCards(cards, container) {
  cards.forEach(function (card) {
    var cardElem = createCard(card, function () {
      return openImagePopup(card.link, card.name, card.name);
    }, cardTemplate, userId);
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
  var input = {
    name: nameInput.value,
    about: descriptionInput.value
  };
  updateUserInfo(input).then(function (userData) {
    profilTitle.textContent = userData.name;
    profilDesc.textContent = userData.about;
  })["catch"](function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
  })["finally"](function () {
    loader(false, editProfileForm);
  });
}
function addNewCard(evt, inputNameFormNewCard, inputLinkFormNewCard, cardsParent) {
  evt.preventDefault();
  loader(true, newPlaceForm);
  var newImg = inputNameFormNewCard.value;
  var newUrl = inputLinkFormNewCard.value;
  var card = {
    name: newImg,
    link: newUrl
  };
  addCard(card).then(function (newCardData) {
    var cardElem = createCard(newCardData, function () {
      return openImagePopup(card.link, card.name, card.name);
    }, cardTemplate, userId);
    cardsParent.prepend(cardElem);
  })["catch"](function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
  })["finally"](function () {
    loader(false, newPlaceForm);
  });
  clearValidation(newPlaceForm, validationConfig);
}
function handleAvatarFormSubmit() {
  loader(true, avatarForm);
  updateUserAvatar(avatarInput.value).then(function (userData) {
    profilImage.style.backgroundImage = "url(".concat(userData.avatar, ")");
    closeModal(avatarPopup);
    avatarForm.reset();
  })["catch"](function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(err));
  })["finally"](function () {
    loader(false, avatarForm);
  });
}
var loader = function loader(isLoading, formElement) {
  var buttonElement = formElement.querySelector('.popup__button');
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};
/******/ })()
;