//Показываем сообщение об ошибке
const showError = (form, input, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  //console.log(rest);
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

//Скрываем сообщение об ошибке
const hideError = (form, input, {inputErrorClass, errorClass, ...rest}) => {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = "";
};

//Функция проверки валидности инпута, которая дальше показывает или скрывапет сообщение об ошибке
const checkInputValidity = (form, input, {...rest}) => {
  if (!input.validity.valid) {
    //console.log(rest);
    showError(form, input, input.validationMessage, rest);
    //console.log(input.validity);
  } else {
    hideError(form, input, rest);
  }
};


//Вешаем слушатели на все поля формы + меняем статус кнопки сабмита
const setEventListeners = (form, {inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

//Изменяет состояние кнопки, принимает массив инпутов и кнопку
function toggleButtonState(inputList, buttonElement, {inactiveButtonClass, ...rest}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//Проверяет, есть ли хоть 1 невалидный инпут в массиве
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Включаем валидацию для всех форм на странице
const enableValidation = ({ formSelector, ...rest }) => {
  //Находим все формы и проходим по ним циклом
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    //Передаём rest в следующую функцию
    setEventListeners(formElement, rest);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});