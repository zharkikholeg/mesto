import './index.css';

import Card from "../js/Card.js";
import FormValidator from "../js/FormValidator.js";
import initialCards from "../utils/initial-cards.js";
import Section from "../js/Section.js";
import UserInfo from "../js/UserInfo.js"
import PopupWithImage from "../js/PopupWithImage.js"
import PopupWithForm from "../js/PopupWithForm.js"
import config from "../utils/constants.js"

const buttonForEditing = document.querySelector(".profile__info-edit");
const buttonForAdding = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup__form_type_place');
const bioForm = document.querySelector('.popup__form_type_bio');

const currentUserInfo = new UserInfo(".profile__info-name", ".profile__info-bio");

//Включаем валидацию значений формы после её открытия
const bioValidation = new FormValidator(config, bioForm);


//Включаем валидацию данных для попапа добавления карточек
const addValidation = new FormValidator(config, addForm);


//Попап для редактирования био
  const bioPopup = new PopupWithForm(".popup_for-editing", (obj) => {
    currentUserInfo.setUserInfo(obj.name, obj.bio);
  })

  bioPopup.setEventListeners();

  buttonForEditing.addEventListener("click", () => {
    //console.log("button clicked");
    bioPopup.open();
    bioValidation.resetValidation();
    bioValidation.enableValidation();
  })


const imagePopup = new PopupWithImage (".popup_for-preview");
imagePopup.setEventListeners();

function newCard(data) {
  const card = new Card(
    data,
    "#element", {
    handleCardClick: () => {
      console.log(data);
      imagePopup.open(data.link, data.name);
    }
    });
    return card.generateCard();
}


// Рендерим карты из массива используя класс Card и Section
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.addItem(newCard(item));
    },
  },
  ".elements"
);
cardsList.renderItems();

//Добавление новой карточки
  const popupForAdding = new PopupWithForm(".popup_for-adding", (obj) => {
    //console.log(obj);
    const item = {
      name: obj.placename,
      link: obj.link,
    }

    cardsList.addItem(newCard(item));

  })
  popupForAdding.setEventListeners();
  buttonForAdding.addEventListener("click", () => {
    popupForAdding.open();
    addValidation.enableValidation();
    addValidation.resetValidation();
  });







