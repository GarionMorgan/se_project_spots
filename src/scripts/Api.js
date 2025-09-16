// utils/Api.js

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "e94a018e-c690-4742-811e-7105b58943cf",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

// export the class
export default Api;
