console.log("Fetching data...");

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "bf321f60-bcd3-46d4-bcab-24d55df9bc76",
    "Content-Type": "application/json",
  },
};

export const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export const getUserInfoApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export const editUserInfoApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export const addCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      data.likes = [];
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export const deleteCardApi = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export const changeLikeCardStatusApi = (cardId, isLiked) => {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const method = isLiked ? "DELETE" : "PUT";

  return fetch(url, {
    method: method,
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error updating like status: ${err}`);
    });
};

export const editAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
