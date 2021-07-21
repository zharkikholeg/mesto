export default class Popup {
	constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.open = this.open.bind(this);
	}

  open() {
    //console.log(document.querySelector(this._popupSelector))
    document.querySelector(this._popupSelector).classList.add('popup_active');
    //console.log("opened popup");
    document.addEventListener('keydown', (evt) => {
      this._handleEscPress(evt);
    });
    
  }
  
  close() {
    let openedPopup = document.querySelector(this._popupSelector);
    openedPopup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscPress);
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
    //console.log(document.querySelector(".popup_active").querySelectorAll(".popup__close-icon"))


    document.querySelectorAll(".popup_active").forEach((overlay) => {
      overlay.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
          console.log("overlay click worked from Popup class");
          this.close();
        }
      });
    });

    //console.log(document.querySelectorAll(".popup__close-icon"))

    document.querySelector(".popup_active").querySelectorAll(".popup__close-icon").forEach(item => {
      item.addEventListener('click', event => {
        this.close();
      })
    })
  }  

}
