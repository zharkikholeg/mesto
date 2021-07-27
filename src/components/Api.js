export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getAllCards() {
    return fetch(this.url + "cards", {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addCard(data) {
    return fetch(this.url + "cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard(cardId) {
    return fetch(this.url + "cards/" + cardId, {
      method: "DELETE",
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }

  getUser() {
    return fetch(this.url + "users/me", {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editUser(name, about) {
    return fetch(this.url + "users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  changeAvatar(link) {
    return fetch(this.url + "users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(cardId) {
    return fetch(this.url + "cards/likes/" + cardId, {
      method: "PUT", 
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike(cardId) {
    return fetch(this.url + "cards/likes/" + cardId, {
      method: "DELETE", 
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}