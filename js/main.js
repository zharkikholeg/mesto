// Весь этот код отвечает за попап с изменением bio и имени (до 40-ой строки)
const editButton = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-icon");

const formName = document.querySelector("#name");
const formBio = document.querySelector("#bio");
const currentName = document.querySelector(".profile__info-name");
const currentBio = document.querySelector(".profile__info-bio");
const formElement = document.querySelector(".popup__form");

function openModal(popupVariable) {
  popupVariable.classList.add("popup_active");
  const handleEscPress = (evt) => {
    if (evt.key === "Escape") {
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

const elementTemplate = document.querySelector("#element").content;
const elements = document.querySelector(".elements");

const popupForPreviw = document.querySelector(".popup_for-preview");
const popupName = popupForPreviw.querySelector(".popup__name");
const popupImage = popupForPreviw.querySelector(".popup__image");
const previewPopupCloseButton = document.querySelector(
  ".popup__close-icon_for-preview"
);
previewPopupCloseButton.addEventListener("click", () => {
  closeModal(popupForPreviw);
});

// Функция для добавления элемента
function createElement(name, imageLink) {
  // Получаем содержимое template

  // клонируем содержимое тега template
  const element = elementTemplate.querySelector(".element").cloneNode(true);

  // наполняем содержимым
  element.querySelector(".element__image").src = imageLink;
  element.querySelector(".element__image").alt = name;
  element.querySelector(".element__text").textContent = name;

  //Сохранение лайков
  const likeButton = element.querySelector(".element__heart");

  likeButton.addEventListener("click", function (evt) {
    likeButton.classList.toggle("element__heart_active");
  });

  //Удаление элемента
  const deleteButton = element.querySelector(".element__trash");

  deleteButton.addEventListener("click", function () {
    element.remove();
  });

  //Открытие поппа с превью по клику
  const image = element.querySelector(".element__image");
  image.addEventListener("click", function () {
    popupImage.src = imageLink;
    popupImage.alt = name;
    popupName.textContent = name;

    openModal(popupForPreviw);
  });

  return element;
  //elements.prepend(element);
}

function renderElement(element) {
  elements.prepend(element);
}

//Добавляем исходный массив элементов на страницу
initialCards.forEach(function (item) {
  renderElement(createElement(item.name, item.link));
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

function formSubmitHandlerForAdding(evt) {
  evt.preventDefault();
  const name = formPlaceName.value;
  const link = formLink.value;
  renderElement(createElement(name, link));
  closeModal(popupForAdding);
}

formForAddingElement.addEventListener("submit", formSubmitHandlerForAdding);
addButton.addEventListener("click", () => {
  openModal(popupForAdding);
});
closeButtonPopupForAdding.addEventListener("click", () => {
  closeModal(popupForAdding);
});

//Закрываем попап кликом по оверлею
const overlays = document.querySelectorAll(".popup");
//console.log(overlays);
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    //console.log(evt.currentTarget);
    //console.log(evt.target);
    if (evt.currentTarget === evt.target) {
      //console.log("click");
      closeModal(evt.target);
    }
  });
});