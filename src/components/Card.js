// Реализация добавления карточек с помощью класса
export default class Card {
  constructor (data, myId, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id; // Это надо пофиксить
    this._myId = myId; 
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector(".element__likecount").textContent = this._likes.length;
    this._likeButton = this._element.querySelector('.element__heart');
    this._deleteButton = this._element.querySelector(".element__trash");
    //console.log(this._myId != this._ownerId)
    if (this._myId != this._ownerId) {
      this._deleteButton.remove();
      //this._element.querySelector(".element__trash") = null;
    }
    if (this._likes.some(e => e._id === this._myId)) {
      //console.log(this._name + " with my like");
      this._likeButton.classList.toggle("element__heart_active");
    }

    //Вешаем слушатели
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    if (this._myId == this._ownerId) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      })
    }
    
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //Обработка лайков
  // _handleLikeClick() {
  //   this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  // }


  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  processLike({callbackLike, callbackUnlike}) {
    //console.log(this._element.querySelector('.element__heart').classList);
    if (this._likeButton.classList.contains("element__heart_active")) {
      this._likeButton.classList.toggle("element__heart_active")
      //console.log("liked by me");
      callbackUnlike();
    } else {
      this._likeButton.classList.toggle("element__heart_active")
      //console.log("not liked by me");
      callbackLike();
    }
  }

  changeLikeCount(data) {
    //console.log(data);
    this._element.querySelector(".element__likecount").textContent = data.likes.length;
  }
}