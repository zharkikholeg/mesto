export default class Popup {
	constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.open = this.open.bind(this);
    this._popup = document.querySelector(popupSelector);
    this._handleEscPress = this._handleEscPress.bind(this)
	}

  open() {
    //console.log(document.querySelector(this._popupSelector))
    this._popup.classList.add('popup_active');
    //console.log("opened popup");
    document.addEventListener('keydown', this._handleEscPress);
    
  }
  
  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscPress);
    //this._popup.outerHTML = this._popup.outerHTML; 
  }

  _handleEscPress(evt) {
    //console.log("ивент на эскейп поставлен");
    //console.log(evt);
    if (evt.key === "Escape") {
      //console.log("esc pressed");
      this.close();
    }
  }

  setEventListeners() {

    this._popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        console.log("overlay click worked from Popup class");
        this.close();
      }
    });

    this._popup.querySelector(".popup__close-icon").addEventListener('click', event => {
      this.close();
    });
  }  

}
