import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form_type_submit")
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });  
  }

  setSubmitAction(callback) {
    this._submit = callback;
  }

}