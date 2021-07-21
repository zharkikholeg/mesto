import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(cardSelector, src) {
    super(cardSelector);
    this._src = src;
    }

  open() {
    const popupForPreviw = document.querySelector(this._popupSelector);
    const popupName = popupForPreviw.querySelector(".popup__name");
    const popupImage = popupForPreviw.querySelector(".popup__image");
    popupImage.src = this._src;
    popupImage.alt = this._name;
    popupName.textContent = this._name;
    const escButton = "Escape";
    super.open();
  }
}
