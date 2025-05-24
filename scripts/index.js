//  Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
//  DOM узлы
const cardsParent = document.querySelector('.places__list');
// Функция создания карточки
const createCard = (item, deleteCard) => {
    if (cardTemplate) {
        const clone = cardTemplate.content.cloneNode(true);
        const cardClone = clone.firstElementChild;

        const cardImage = cardClone.querySelector('.card__image');
        const cardTitle = cardClone.querySelector('.card__title');
        const deleteButton = cardClone.querySelector('.card__delete-button');

        if (cardImage) {
            cardImage.src = item.link;
            cardImage.alt = item.name;
        }
        if (cardTitle) {
            cardTitle.textContent = item.name;
        }
        
        cardsParent.append(cardClone);

        if (deleteButton) {
            deleteButton.addEventListener('click', deleteCard);
        }
    }
}
//  Функция удаления карточки
const deleteCard = (event) => event.target.closest('.card').remove();

// Вывести карточки на страницу
if (initialCards && initialCards.length > 0) {
    initialCards.forEach(card => createCard(card, deleteCard));
}