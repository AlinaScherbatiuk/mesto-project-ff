
const deleteCard = (cardElement) => cardElement.remove();

const likeBtnClick = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
};

const createCard = (item, handleImageClick, cardTemplate) => {


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

  likeBtn.addEventListener('click', (evt) => {
    likeBtnClick(evt);
  });

  return cardElement;
}

export { createCard } 