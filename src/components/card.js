import { deleteCard, addLike, removeLike } from './api.js';


export const handleLikeClick = (likeButton, likeCounter, cardData) => {   
  if (likeButton) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? removeLike : addLike;
    likeMethod(cardData._id)
      .then((updatedCard) => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });

  }
};
export const handleDeleteClick = (cardElement, cardData) => {
   
  deleteCard(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

const createCard = (item, handleImageClick, handleLikeClick, handleDeleteClick, cardTemplate, userId) => {


  const cardElement = cardTemplate.content.cloneNode(true).children[0];

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likeContainer = cardElement.querySelector('.card__like-container');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeCounter.textContent = item.likes ? item.likes.length : 0;

  const isOwner = item.owner && item.owner._id === userId;

  if (!isOwner) {
    deleteButton.style.display = 'none';
  }

  if (item.likes && item.likes.find(like => like._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', (evt) => {
    handleDeleteClick(cardElement, item)
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name, cardTitle.textContent)
  });

  likeBtn.addEventListener('click', (evt) => {

    handleLikeClick(likeBtn, likeCounter, item);
  });

  return cardElement;
}

export { createCard } 