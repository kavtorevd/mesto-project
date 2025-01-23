const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopupElement = document.querySelector('.popup_type_edit');
const cardPopupElement = document.querySelector('.popup_type_new-card');
const imagePopupElement = document.querySelector('.popup_type_image');

const popupInputName = profilePopupElement.querySelector('.popup__input_type_name');
const popupInputDescription = profilePopupElement.querySelector('.popup__input_type_description');

const popupInputCardName = cardPopupElement.querySelector('.popup__input_type_card-name');
const popupInputCardUrl = cardPopupElement.querySelector('.popup__input_type_url');

const profileInfoElement = document.querySelector('.profile__info');
const profileTitle = profileInfoElement.querySelector('.profile__title');
const profileDescription = profileInfoElement.querySelector('.profile__description');

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
  
    return cardElement;
  }

  initialCards.forEach(item => {
    placesList.append(createCard(item.name, item.link));
});

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}   


const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function() {
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
    openModal(profilePopupElement);
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function() {
    popupInputCardName.textContent = '';
    popupInputCardUrl.textContent = '';
    openModal(cardPopupElement);
});

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        closeModal(closeButton.closest('.popup'));
    });
});

const imageCards = document.querySelectorAll('.card__image');
imageCards.forEach(imageCard => {
    imageCard.addEventListener('click', function() {
        openModal(imagePopupElement);
        imagePopupElement.querySelector('.popup__image').src = imageCard.src;
    });
})


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
}

profilePopupElement.addEventListener('submit', handleProfileFormSubmit); 

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    placesList.prepend(createCard(popupInputCardName.value, popupInputCardUrl.value));   
}

cardPopupElement.addEventListener('submit', handleCardFormSubmit); 

const likeButtons = document.querySelectorAll('.card__like-button');
likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('.card__like-button_is-active');
    });
});


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
