import './assets/scss/app.scss';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'
import $ from 'cash-dom';
import UserProfile from './components/userProfile';
import checkUserNameFieldCorrectness from './utilities/checkUserNameFieldCorrectness.js';

export class App {
  initializeApp = () => {
    const userProfile = new UserProfile();

    $('.load-username').on('click', function () {
      const userNameInput = $('.username.input');
      const userName = userNameInput.val();

      const isUserNameCorrect = checkUserNameFieldCorrectness(userName, userNameInput);
      if(isUserNameCorrect) userProfile.render(userName);
    })
  }
}