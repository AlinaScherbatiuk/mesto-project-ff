// API
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39', // идентификатор группы
    headers: {
      authorization: '7aa91673-1079-4433-82ab-3cc3aedc26c2', // токен
      'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
       return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  export const updateUserInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(checkResponse);
  };
  
  export const updateUserAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(checkResponse);
  };
  
  export const addCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(checkResponse);
  };
  
  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse);
  };  
 
  export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  }; 