import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this.close = this.close.bind(this);
    this._form = document.querySelector(popupSelector).querySelector(".popup__form")
	}

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll(".popup__input");
  
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

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });

    
  }

  close() {
    super.close();
    this._form.reset();
  }

  
  
}
