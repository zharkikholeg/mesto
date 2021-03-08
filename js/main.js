
// Весь этот код отвечает за попап с изменением bio и имени (до 37-ой строки)
const editButton = document.querySelector('.profile__info-edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-icon');


const formName = document.querySelector('#name');
const formBio = document.querySelector('#bio');
const formElement = document.querySelector('.popup__form');


function openPopup() {
  document.querySelector('#name').value = document.querySelector('.profile__info-name').textContent;
  document.querySelector('#bio').value = document.querySelector('.profile__info-bio').textContent;
  popup.classList.add("popup_active");
};


function closePopup() {
  popup.classList.remove("popup_active");
};


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    newName = formName.value;
    newBio = formBio.value;
    const currentName = document.querySelector('.profile__info-name');
    const currentBio = document.querySelector('.profile__info-bio')
    currentName.textContent = newName;
    currentBio.textContent = newBio;
    popup.classList.remove("popup_active");
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


// Массив со стандартными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Функция для добавления элемента
function addElement (name, imageLink) {
  // Получаем содержимое template
  const elementTemplate = document.querySelector('#element').content;
  const elements = document.querySelector('.elements');

  // клонируем содержимое тега template
  const element = elementTemplate.querySelector('.element').cloneNode(true)

  // наполняем содержимым
  element.querySelector('.element__image').src = imageLink;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__text').textContent = name;

  //Сохранение лайков
  const likeButton = element.querySelector('.element__heart');

  likeButton.addEventListener('click', function (evt) {
    likeButton.classList.toggle('element__heart_active');
  })

  //Удаление элемента
  const deleteButton = element.querySelector('.element__trash');

  deleteButton.addEventListener('click', function () {
    element.remove();
  })

  //Открытие поппа с превью по клику
  const image = element.querySelector('.element__image');
  image.addEventListener('click', function () {
    const popupForPreviw = document.querySelector('.popup_for-preview');
    const popupName = popupForPreviw.querySelector('.popup__name');
    const popupImage = popupForPreviw.querySelector('.popup__image');
    popupImage.src = imageLink;
    popupImage.alt = name;
    popupName.textContent = name;

    popupForPreviw.classList.add('popup_active');
  })

  const previewPopupCloseButton = document.querySelector('.popup__close-icon_for-preview');
  previewPopupCloseButton.addEventListener('click', function () {
    document.querySelector('.popup_for-preview').classList.remove('popup_active');
  })


  elements.prepend(element);
}


//Добавляем исходный массив элементов на страницу
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
})

//Попап для добавления элементов
const addButton = document.querySelector('.profile__add-button');
const popupForAdding = document.querySelector('.popup_for-adding');
const closeButtonPopupForAdding = document.querySelector('div.popup_for-adding .popup__close-icon ');

const formPlaceName = document.querySelector('#place-name');
const formLink = document.querySelector('#link');
const formForAddingElement = document.querySelector('div.popup_for-adding .popup__form');

function openPopupForAdding() {
  popupForAdding.classList.add("popup_active");
};

function closePopupForAdding() {
  popupForAdding.classList.remove("popup_active");
};


function formSubmitHandlerForAdding (evt) {
    evt.preventDefault(); 
    const name = formPlaceName.value;
    const link = formLink.value;
    addElement(name, link);
    popupForAdding.classList.remove("popup_active");
}

formForAddingElement.addEventListener('submit', formSubmitHandlerForAdding);
addButton.addEventListener('click', openPopupForAdding);
closeButtonPopupForAdding.addEventListener('click', closePopupForAdding);













