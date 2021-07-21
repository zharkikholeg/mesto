import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this.close = this.close.bind(this);
	}

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = document.querySelector(this._popupSelector).querySelectorAll(".popup__input");
  
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

    document.querySelector(".popup_active" + this._popupSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });

    
  }

  close() {
    let openedPopup = document.querySelector(this._popupSelector);
    openedPopup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscPress);
    document.querySelectorAll('.popup__form').forEach(form => {
      form.reset();
    })
    openedPopup.outerHTML = openedPopup.outerHTML;
  }

  
  
}
