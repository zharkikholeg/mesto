export default class FormValidator {
  constructor(configObject, formElement) {
    this._inputSelector = configObject.inputSelector;
    this._submitButtonSelector = configObject.submitButtonSelector;
    this._inactiveButtonClass = configObject.inactiveButtonClass;
    this._inputErrorClass = configObject.inputErrorClass;
    this._errorClass = configObject.errorClass;
    this._formElement = formElement;
  }

  //Включаемвалидацию для этой конкретной кнопки
  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }

  // Вешаем слушатели на все поля ввода в этой форме
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  //Изменяет состояние кнопки, принимает массив инпутов и кнопку
  _toggleButtonState(inputList, buttonElement) {
    
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //Проверяет, есть ли хоть 1 невалидный инпут в массиве
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Функция проверки валидности инпута, которая дальше показывает или скрывапет сообщение об ошибке
  _checkInputValidity (form, input) {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage);
    } else {
      this._hideError(form, input);
    }
  };

  //Показываем сообщение об ошибке
  _showError (form, input, errorMessage) {
    //console.log(rest);
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

  //Скрываем сообщение об ошибке
  _hideError (form, input) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  };
}