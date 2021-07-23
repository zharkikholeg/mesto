import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(cardSelector) {
    super(cardSelector);

    }

  open(src, name) {
    const popupName = this._popup.querySelector(".popup__name");
    const popupImage = this._popup.querySelector(".popup__image");
    popupImage.src = src;
    popupImage.alt = name;
    popupName.textContent = name;
    super.open();
  }
}
