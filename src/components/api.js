export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "bf321f60-bcd3-46d4-bcab-24d55df9bc76",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const fetchApi = (url, options = {}) => {
  return fetch(url, { headers: config.headers, ...options }).then(
    handleResponse
  );
};

export const getInitialCardsApi = () => fetchApi(`${config.baseUrl}/cards`);

export const getUserInfoApi = () => fetchApi(`${config.baseUrl}/users/me`);

export const editUserInfoApi = (name, about) => {
  return fetchApi(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
};

export const addCardApi = (name, link) => {
  return fetchApi(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({ name, link }),
  }).then((data) => {
    data.likes = [];
    return data;
  });
};

export const deleteCardApi = (id) => {
  return fetchApi(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
  });
};

export const changeLikeCardStatusApi = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  return fetchApi(`${config.baseUrl}/cards/likes/${cardId}`, { method });
};

export const editAvatarApi = (avatar) => {
  return fetchApi(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });
};
