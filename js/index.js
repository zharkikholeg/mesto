import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initial-cards.js";

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
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

function handleEscPress(evt) {
  if (evt.key === escButton) {
    closeModal()
  }
}

function openModal(popupVariable) {
  popupVariable.classList.add('popup_active')
  document.addEventListener('keydown', handleEscPress)
}

function closeModal() {
  const openedPopup = document.querySelector('.popup_active')
  openedPopup.classList.remove('popup_active')
  document.removeEventListener('keydown', handleEscPress)
}

function openProfilePopup() {
  formName.value = currentName.textContent;
  formBio.value = currentBio.textContent;
  openModal(profilePopup);
  //Включаем валидацию значений формы после её открытия
  const bioForm = document.querySelector('.popup__form_type_bio');
  const bioValidation = new FormValidator(config, bioForm);
  bioValidation.enableValidation();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = formName.value;
  currentBio.textContent = formBio.value;
  closeModal();
}

//Обрабатываем сабмит попапа для добавления новых карточек
function formSubmitHandlerForAdding(evt) {
  evt.preventDefault();
  const name = formPlaceName.value;
  const link = formLink.value;
  const card = new Card({name: name, link: link}, '#element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  closeModal(popupForAdding);
}


//Вешаем все обработчики
formElement.addEventListener("submit", formSubmitHandler);
buttonForEditing.addEventListener("click", openProfilePopup);
buttonForClosing.addEventListener("click", () => {
  closeModal();
});
buttonForClosingPreviewPopup.addEventListener("click", () => {
  closeModal(popupForPreviw);
});
formForAddingElement.addEventListener("submit", formSubmitHandlerForAdding);

buttonForAdding.addEventListener("click", () => {
  openModal(popupForAdding);
  //Включаем валидацию данных для попапа добавления карточек
  const addForm = document.querySelector('.popup__form_type_place');
  const addValidation = new FormValidator(config, addForm);
  addValidation.enableValidation();
});
buttonForClosingPopupForAdding.addEventListener("click", () => {
  closeModal(popupForAdding);
});

//Закрываем попап кликом по оверлею
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
    }
  });
});



// Рендерим карты из массива используя класс Card
initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  elements.append(cardElement);
});



