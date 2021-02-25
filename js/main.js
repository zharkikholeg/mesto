let editButton = document.querySelector('.profile__info-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');

let formName = document.querySelector('#name');
let formBio = document.querySelector('#bio');
let formElement = document.querySelector('.popup__form');


function openPopup() {
  document.querySelector('#name').value = document.querySelector('.profile__info-name').textContent;
  document.querySelector('#bio').value = document.querySelector('.profile__info-bio').textContent;
  popup.classList.add("popup_active");
};


function closePopup() {
  popup.classList.remove("popup_active");
};


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    newName = formName.value;
    newBio = formBio.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let currentName = document.querySelector('.profile__info-name');
    let currentBio = document.querySelector('.profile__info-bio')
    // Вставьте новые значения с помощью textContent
    currentName.textContent = newName;
    currentBio.textContent = newBio;
    popup.classList.remove("popup_active");
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);