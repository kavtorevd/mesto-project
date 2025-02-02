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

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => { popup.classList.add('popup_is-animated'); });

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
        evt.target.classList.toggle('card__like-button_is-active');
    });
});


const deleteButtons = document.querySelectorAll('.card__delete-button');
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click',() => {
        deleteButton.closest('.card').remove();
    });
});

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error'); // Ensure this class is correct
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active'); // Ensure this class is correct
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error'); // Ensure this class is correct
    errorElement.classList.remove('popup__error_active'); // Ensure this class is correct
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement); // Corrected to set event listeners on the form element
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__button_inactive');
    } else {
    buttonElement.classList.remove('popup__button_inactive');
    }
}

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}

popups.forEach(popup => {
    popup.addEventListener('click', closePopupByOverlay);
});

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

document.addEventListener('keydown', closePopupByEsc);

enableValidation();