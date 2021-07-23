import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/initial-cards.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import config from "../utils/constants.js"

const buttonForEditing = document.querySelector(".profile__info-edit");
const buttonForAdding = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup__form_type_place');
const bioForm = document.querySelector('.popup__form_type_bio');
const formName = document.querySelector("#name");
const formBio = document.querySelector("#bio");

const currentUserInfo = new UserInfo(".profile__info-name", ".profile__info-bio");

//Включаем валидацию значений формы после её открытия
const bioValidation = new FormValidator(config, bioForm);
bioValidation.enableValidation();

//Включаем валидацию данных для попапа добавления карточек
const addValidation = new FormValidator(config, addForm);
addValidation.enableValidation();


//Попап для редактирования био
  const bioPopup = new PopupWithForm(".popup_for-editing", (obj) => {
    currentUserInfo.setUserInfo(obj.name, obj.bio);
  })

  bioPopup.setEventListeners();

  buttonForEditing.addEventListener("click", () => {
    //console.log("button clicked");
    const data = currentUserInfo.getUserInfo();
    formName.value = data.name;
    formBio.value = data.bio;
    bioPopup.open();
    bioValidation.resetValidation();
  })


const imagePopup = new PopupWithImage (".popup_for-preview");
imagePopup.setEventListeners();

function createCard(data) {
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
    cardsList.addItem(createCard(item));
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

    cardsList.addItem(createCard(item));

  })
  popupForAdding.setEventListeners();
  buttonForAdding.addEventListener("click", () => {
    popupForAdding.open();
    addValidation.resetValidation();
  });







