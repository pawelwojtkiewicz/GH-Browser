import './assets/scss/app.scss';
import $ from 'cash-dom';
import UserProfile from './components/userProfile';
import checkUserNameFieldCorrectness from './utilities/checkUserNameFieldCorrectness.js';


export class App {
  initializeApp() {
    const self = this;
    const userProfile = new UserProfile();

    $('.load-username').on('click', function () {
      const userNameInput = $('.username.input');
      const userName = userNameInput.val();

      const isUserNameCorrect = checkUserNameFieldCorrectness(userName, userNameInput);
      if(isUserNameCorrect) userProfile.render(userName);
    })

  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}