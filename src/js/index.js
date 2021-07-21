import '../pages/index.css';

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initial-cards.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js"
import PopupWithImage from "./PopupWithImage.js"
import PopupWithForm from "./PopupWithForm.js"

const buttonForEditing = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup");
const buttonForClosing = document.querySelector(".popup__close-icon");
const formName = document.querySelector("#name");
const formBio = document.querySelector("#bio");
const currentName = document.querySelector(".profile__info-name");
const currentBio = document.querySelector(".profile__info-bio");
const formElement = document.querySelector(".popup__form");
const escButton = "Escape";
const buttonForAdding = document.querySelector(".profile__add-button");
const popupForAdding = document.querySelector(".popup_for-adding");
const buttonForClosingPopupForAdding = document.querySelector("div.popup_for-adding .popup__close-icon ");
const formPlaceName = document.querySelector("#place-name");
const formLink = document.querySelector("#link");
const formForAddingElement = document.querySelector("div.popup_for-adding .popup__form");
const elements = document.querySelector(".elements");
const popupForPreviw = document.querySelector(".popup_for-preview");
const buttonForClosingPreviewPopup = document.querySelector(".popup__close-icon_for-preview");
const overlays = document.querySelectorAll(".popup");
const addForm = document.querySelector('.popup__form_type_place');
const bioForm = document.querySelector('.popup__form_type_bio');
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

//Добавляем данные в форму Bio, чтобы валидация конкретно сработала до её открытия
// formName.value = currentName.textContent;
// formBio.value = currentBio.textContent;


function handleEscPress(evt) {
  if (evt.key === escButton) {
    closeModal();
  }
}

// function openModal(popupVariable) {
//   popupVariable.classList.add('popup_active')
//   document.addEventListener('keydown', handleEscPress)
// }

function closeModal() {
  const openedPopup = document.querySelector('.popup_active')
  openedPopup.classList.remove('popup_active')
  document.removeEventListener('keydown', handleEscPress)
}



//Обрабатываем сабмит попапа для добавления новых карточек
function formSubmitHandlerForAdding(evt) {
  evt.preventDefault();
  const name = formPlaceName.value;
  const link = formLink.value;
  const card = new Card({name: name, link: link}, '#element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  closeModal();
}


//Попап для редактирования био
buttonForEditing.addEventListener("click", () => {
  const popup = new PopupWithForm(".popup_for-editing", (obj) => {
    //console.log("callback called");
    //console.log(obj);
    currentName.textContent = obj.name;
    currentBio.textContent = obj.bio;
  })
  popup.open();
  popup.setEventListeners();
})


//formForAddingElement.addEventListener("submit", formSubmitHandlerForAdding);


// buttonForAdding.addEventListener("click", () => {
//   openModal(popupForAdding);
// });
// buttonForClosingPopupForAdding.addEventListener("click", () => {
//   closeModal();
// });





// Рендерим карты из массива используя класс Card и Section
let cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#element", {
    handleCardClick: () => {
      const imagePopup = new PopupWithImage (".popup_for-preview", item.link, item.name);
      imagePopup.open();
      imagePopup.setEventListeners();
      }
    })

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
    },
  },
  ".elements"
);
cardsList.renderItems();

//Добавление новой карточки
buttonForAdding.addEventListener("click", () => {
  const popup = new PopupWithForm(".popup_for-adding", (obj) => {
    //console.log(obj);
    const item = {
      name: obj.placename,
      link: obj.link,
    }
    //console.log(item);
    const card = new Card(item, "#element", {
      handleCardClick: () => {
        const imagePopup = new PopupWithImage (".popup_for-preview", item.link);
        imagePopup.open();
        imagePopup.setEventListeners();
        }
      });
    const cardElement = card.generateCard();

    //document.querySelector(".elements").innerHTML = "";
    cardsList.addItem(cardElement);
    //cardsList.renderItems();
  })
  popup.open();
  popup.setEventListeners();
})


// Инициализируем экземпляр UserInfo
const userInfo = new UserInfo(".profile__info-name", ".profile__info-bio");



//Включаем валидацию значений формы после её открытия
const bioValidation = new FormValidator(config, bioForm);
bioValidation.enableValidation();

//Включаем валидацию данных для попапа добавления карточек
const addValidation = new FormValidator(config, addForm);
addValidation.enableValidation();

export {closeModal, handleEscPress}
