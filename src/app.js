import "./assets/scss/app.scss";
import './assets/scss/app.scss';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'
import $ from 'cash-dom';
import UserProfile from "./components/userProfile";

const removeInputUserNameError = userNameInput => {
  userNameInput.removeClass("is-danger");
  userNameInput.off();
};

const setInputUserNameError = userNameInput => {
  userNameInput.addClass("is-danger");
  userNameInput.on("input", () => removeInputUserNameError(userNameInput));
}

const userFieldRegex = new RegExp("[a-z0-9-_]+$");

const validateUserName = userName => {
  return new Promise((resolve, reject) => {
    if (userFieldRegex.test(userName)) {
      resolve(userName);
    } else {
      reject(Error("Invalid User Name"));
    }
  });
}

const clearInput = input => input.val("")

export class App {
  initializeApp(){
    $(".load-username").on("click", function() {
      const userNameInput = $(".username.input");
      validateUserName(userNameInput.val())
        .then(userName => {
          new UserProfile().render(userName);
          clearInput(userNameInput);
        })
        .catch(error => {
          console.error(`Error ${error}`);
          setInputUserNameError(userNameInput);
        });
    });
  }
}