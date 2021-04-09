// Реализация добавления карточек с помощью класса
export default class Card {
  constructor (data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  //Получаем темплейт по кардСелектору
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    //Наполняем содержимым
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    //Вешаем слушатели
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  //Обработка лайков
  _handleLikeClick() {
    this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  }

  //Обработка удалений
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  //Обработка открытия попапа
  _handleImageClick() {
    const popupForPreviw = document.querySelector(".popup_for-preview");
    const popupName = popupForPreviw.querySelector(".popup__name");
    const popupImage = popupForPreviw.querySelector(".popup__image");
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupName.textContent = this._name;
    const escButton = "Escape";
    openModal(popupForPreviw);

    function handleEscPress(evt) {
      if (evt.key === escButton) {
        closeModal()
        document.removeEventListener('keydown', handleEscPress)
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
  }
}