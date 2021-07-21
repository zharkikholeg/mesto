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
    //console.log(this);
    const openedPopup = document.querySelector('.popup_active');
    openedPopup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscPress);
    //console.log(openedPopup);
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
    document.querySelectorAll(".popup").forEach((overlay) => {
      overlay.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
          console.log("overlay click worked from Popup class");
          this.close();
        }
      });
    });

    console.log(document.querySelectorAll(".popup__close-icon"))

    document.querySelectorAll(".popup__close-icon").forEach(item => {
      item.addEventListener('click', event => {
        this.close();
      })
    })
 


    document.querySelector(".popup__close-icon_for-preview").addEventListener("click", () => {
      console.log("button click worked from Popup class");
      this.close();
    });

  }  

}
