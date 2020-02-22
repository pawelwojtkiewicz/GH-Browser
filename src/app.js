import './assets/scss/app.scss';
import $ from 'cash-dom';
import checkUserNameFieldCorrectness from './utilities/checkUserNameFieldCorrectness.js';


export class App {
  initializeApp() {
    const self = this;

    $('.load-username').on('click', function () {
      const userName = $('.username.input').val();
      const userNameInput = $('.username.input');

      const isUserNameCorrect = checkUserNameFieldCorrectness(userName, userNameInput);
    })

  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
