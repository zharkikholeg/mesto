import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import config from "../utils/constants.js"
import Api from "../components/Api.js";

const buttonForEditing = document.querySelector(".profile__info-edit");
const buttonForAdding = document.querySelector(".profile__add-button");
const addForm = document.querySelector('.popup__form_type_place');
const bioForm = document.querySelector('.popup__form_type_bio');
const avaForm = document.querySelector('.popup__form_type_ava');
const formName = document.querySelector("#name");
const formBio = document.querySelector("#bio");
const userPic = document.querySelector(".profile__avatar");
const avaWrapper = document.querySelector(".profile__avatar-wrapper");
const avaOverlay = document.querySelector(".profile__avatar-overlay");


avaWrapper.addEventListener("mouseover", () => {
  avaOverlay.style.visibility = "visible";
})

avaWrapper.addEventListener("mouseout", () => {
  avaOverlay.style.visibility = "hidden";
})

const fetchConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-26/",
  headers: {
    'Content-Type': 'application/json',
    authorization: '9ac46a9a-c60a-4887-8c79-f1f3a6e1b013'
  }
};

const currentUserInfo = new UserInfo(".profile__info-name", ".profile__info-bio");

let myId = null;

//Создаём Section под карточки, рендерим потом
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
    }
  },
  ".elements"
);

const api = new Api(fetchConfig)
//Получаем и выводим данные пользователя
api.getUser().then((data) => {
  //console.log(data);
  currentUserInfo.setUserInfo(data.name, data.about);
  userPic.src = data.avatar;
  myId = data._id;
  //console.log(myId);
}).then( //Получаем и рендерим карточки
  api.getAllCards().then((data) => {
    console.log(data);
    //Рендерим карточки в Section
    cardsList.renderItems(data);
  })
).catch((err) => {
  console.log(err); 
});


//Получаем и выводим карточки








//Включаем валидацию значений формы после её открытия
const bioValidation = new FormValidator(config, bioForm);
bioValidation.enableValidation();

//Включаем валидацию данных для попапа добавления карточек
const addValidation = new FormValidator(config, addForm);
addValidation.enableValidation();

//Включаем валидацию замены авы
const avaValidation = new FormValidator(config, avaForm)
avaValidation.enableValidation();

//Попап для замены авы
const avaPopup = new PopupWithForm(".popup_for-ava", (obj) => {
  document.querySelector(".popup_for-ava .popup__submit").value = "Сохранение...";
  //console.log(obj);
  api.changeAvatar(obj.link).then((res) => {
    //console.log(res);
    userPic.src = res.avatar;
    avaPopup.close();
  }).catch((err) => {
    console.log(err); 
  }).finally(() => {
    document.querySelector(".popup_for-ava .popup__submit").value = "Сохранить";
  })

})
avaPopup.setEventListeners();

avaWrapper.addEventListener("click", () => {
  //console.log("click");
  avaPopup.open();
  avaValidation.resetValidation();
})


//Попап для редактирования био
  const bioPopup = new PopupWithForm(".popup_for-editing", (obj) => {
    //console.log(document.querySelector(".popup_for-editing .popup__submit"))
    document.querySelector(".popup_for-editing .popup__submit").value = "Сохранение...";
    api.editUser(obj.name, obj.bio).then((res) => {
      //console.log(res);
      currentUserInfo.setUserInfo(res.name, res.about);
      bioPopup.close();
    }).catch((err) => {
      console.log(err); 
    }).finally(() => {
      document.querySelector(".popup_for-editing .popup__submit").value = "Сохранить";
    })
    
  },)

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

const submitPopup = new PopupWithSubmit(".popup_for-submit");
submitPopup.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    myId,
    "#element", {
    handleCardClick: () => {
      console.log(data);
      imagePopup.open(data.link, data.name);
    }, 
    handleDeleteClick: () => {
      submitPopup.setSubmitAction(() => {
        api.deleteCard(card._cardId).catch((err) => {
          console.log(err); 
        });
        card.deleteCard();
      })
      submitPopup.open();
    },
    handleLikeClick: () => {
      card.processLike({
        callbackLike: () => {
          api.addLike(card._cardId).then((res) => {
            //console.log(res);
            card.changeLikeCount(res);
          }).catch((err) => {
            console.log(err); 
          });
        },
        callbackUnlike: () => {
          api.removeLike(card._cardId).then((res) => {
            //console.log(res);
            card.changeLikeCount(res);
          }).catch((err) => {
            console.log(err); 
          });
        }
      });
    }
    });
    return card.generateCard();
}


// // Рендерим карты из массива используя класс Card и Section
// const cardsList = new Section({
//   data: initialCards,
//   renderer: (item) => {
//     cardsList.addItem(createCard(item));
//     },
//   },
//   ".elements"
// );
// cardsList.renderItems();

//Добавление новой карточки
  const popupForAdding = new PopupWithForm(".popup_for-adding", (obj) => {
    //console.log(obj);
    document.querySelector(".popup_for-adding .popup__submit").value = "Сохранение...";
    const item = {
      name: obj.placename,
      link: obj.link,
    }
    api.addCard(item).then((data) => {
      data.ownerId = data.owner._id;
      data.myId = myId;
      data.cardId = data._id;
      console.log(data);
      cardsList.addItem(createCard(data));
      popupForAdding.close();
      
    }).catch((err) => {
      console.log(err); 
    }).finally(() => {
      document.querySelector(".popup_for-adding .popup__submit").value = "Создать";
    })
    item.myId = myId;
    

  })
  popupForAdding.setEventListeners();
  buttonForAdding.addEventListener("click", () => {
    popupForAdding.open();
    addValidation.resetValidation();
  });
