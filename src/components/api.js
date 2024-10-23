fetch('https://nomoreparties.co/v1/:wff-cohort-25/users/me', {
  headers: {
    authorization: 'bf321f60-bcd3-46d4-bcab-24d55df9bc76'
  }
})
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });