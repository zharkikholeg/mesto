export default class Section {
  constructor({renderer}, containerSelector) {
    //this._renderedItems = data;
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.slice().reverse().forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.prepend(element);
  }
}