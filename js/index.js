import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Весь этот код отвечает за попап с изменением bio и имени (до 40-ой строки)
const editButton = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-icon");

const formName = document.querySelector("#name");
const formBio = document.querySelector("#bio");
const currentName = document.querySelector(".profile__info-name");
const currentBio = document.querySelector(".profile__info-bio");
const formElement = document.querySelector(".popup__form");

const escButton = "Escape";

function openModal(popupVariable) {
  popupVariable.classList.add("popup_active");
  const handleEscPress = (evt) => {
    if (evt.key === escButton) {
      closeModal(popupVariable);
      document.removeEventListener("keydown", handleEscPress);
    }
  };
  document.addEventListener("keydown", handleEscPress);
}

function closeModal(popupVariable) {
  popupVariable.classList.remove("popup_active");
}

function openProfilePopup() {
  formName.value = currentName.textContent;
  formBio.value = currentBio.textContent;
  openModal(profilePopup);
  //Включаем валидацию значений формы после её открытия
  const bioForm = document.forms[0];
  const bioValidation = new FormValidator(config, bioForm);
  bioValidation.enableValidation();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = formName.value;
  currentBio.textContent = formBio.value;
  closeModal(profilePopup);
}

formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openProfilePopup);
closeButton.addEventListener("click", () => {
  closeModal(profilePopup);
});

// Массив со стандартными карточками
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementTemplate = document.querySelector("#element").content.querySelector(".element");


const popupForPreviw = document.querySelector(".popup_for-preview");
const previewPopupCloseButton = document.querySelector(
  ".popup__close-icon_for-preview"
);
previewPopupCloseButton.addEventListener("click", () => {
  closeModal(popupForPreviw);
});




// Рендерим карты из массива используя класс Card
const elements = document.querySelector(".elements");
initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  elements.append(cardElement);
});



//Попап для добавления элементов
const addButton = document.querySelector(".profile__add-button");
const popupForAdding = document.querySelector(".popup_for-adding");
const closeButtonPopupForAdding = document.querySelector(
  "div.popup_for-adding .popup__close-icon "
);

const formPlaceName = document.querySelector("#place-name");
const formLink = document.querySelector("#link");
const formForAddingElement = document.querySelector(
  "div.popup_for-adding .popup__form"
);


//Обрабатываем сабмит попапа для добавления новых карточек
function formSubmitHandlerForAdding(evt) {
  evt.preventDefault();
  const name = formPlaceName.value;
  const link = formLink.value;
  const card = new Card({name: name, link: link}, '#element');
  const cardElement = card.generateCard();
  elements.append(cardElement);
  closeModal(popupForAdding);
}

formForAddingElement.addEventListener("submit", formSubmitHandlerForAdding);
addButton.addEventListener("click", () => {
  openModal(popupForAdding);
  //Включаем валидацию данных для попапа добавления карточек
  const addForm = document.forms[1];
  const addValidation = new FormValidator(config, addForm);
  addValidation.enableValidation();
});
closeButtonPopupForAdding.addEventListener("click", () => {
  closeModal(popupForAdding);
});

//Закрываем попап кликом по оверлею
const overlays = document.querySelectorAll(".popup");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
    }
  });
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}



