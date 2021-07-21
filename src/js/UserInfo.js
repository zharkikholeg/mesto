export default class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
  }

  getUserInfo() {
    return {
      "name": document.querySelector(this._nameSelector).textContent,
      "bio": document.querySelector(this._bioSelector).textContent
    }
  }

  setUserInfo(name, bio) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._bioSelector).textContent = bio;
    closeModal();
  }
}