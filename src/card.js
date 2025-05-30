
const deleteCard = (cardElement) => cardElement.remove();

const likeBtnClick = (cardElement) => cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

const createCard = (item, handleImageClick) => {

  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).children[0];

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(item.link, item.name, cardTitle.textContent)
  });

  likeBtn.addEventListener('click', () => {
    likeBtnClick(cardElement);
  });

  return cardElement;
}

export { createCard } 