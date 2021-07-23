export default class FormValidator {
  constructor(configObject, formElement) {
    //console.log(configObject)
    this._inputSelector = configObject.inputSelector;
    this._submitButtonSelector = configObject.submitButtonSelector;
    this._inactiveButtonClass = configObject.inactiveButtonClass;
    this._inputErrorClass = configObject.inputErrorClass;
    this._errorClass = configObject.errorClass;
    this._formElement = formElement;
    this._button = formElement.querySelector(configObject.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
  }

  resetValidation() {
    this._toggleButtonState();// <== управляем кнопкой ==

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)// <==очищаем ошибки ==
    });

  }


  //Включаем валидацию для этой конкретной кнопки
  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }

  // Вешаем слушатели на все поля ввода в этой форме
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  //Изменяет состояние кнопки, принимает массив инпутов и кнопку
  _toggleButtonState() {
    
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  //Проверяет, есть ли хоть 1 невалидный инпут в массиве
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Функция проверки валидности инпута, которая дальше показывает или скрывапет сообщение об ошибке
  _checkInputValidity (input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  };

  //Показываем сообщение об ошибке
  _showError (input, errorMessage) {
    //console.log(rest);
    const formError = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

  //Скрываем сообщение об ошибке
  _hideError (input) {
    const formError = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  };
}