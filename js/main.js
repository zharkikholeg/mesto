let editButtin = document.querySelector('.profile__info__edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');

let formName = document.querySelector('#name');
let formBio = document.querySelector('#bio');
let formElement = document.querySelector('.popup__form');


editButtin.onclick = function() {
  document.querySelector('#name').value = document.querySelector('.profile__info__name').textContent;
  document.querySelector('#bio').value = document.querySelector('.profile__info__bio').textContent;
  popup.style.visibility='visible';
};


closeButton.onclick = function() {
  popup.style.visibility='hidden';
};


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    newName = formName.value;
    newBio = formBio.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let currentName = document.querySelector('.profile__info__name');
    let currentBio = document.querySelector('.profile__info__bio')
    // Вставьте новые значения с помощью textContent
    currentName.textContent = newName;
    currentBio.textContent = newBio;
    popup.style.visibility='hidden';
}

formElement.addEventListener('submit', formSubmitHandler);

