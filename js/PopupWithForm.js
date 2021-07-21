import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this.close = this.close.bind(this);
	}

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = document.querySelectorAll(".popup__input");
  
    // создаём пустой объект
    this._formValues = {};
  
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    // возвращаем объект значений
    return this._formValues;
  } 

  setEventListeners() {
    super.setEventListeners();

    document.querySelector(this._popupSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    const openedPopup = document.querySelector('.popup_active');
    openedPopup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscPress);
    document.querySelectorAll('.popup__form').forEach(form => {
      form.reset();
    })
  }

  
  
}
