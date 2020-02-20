import './assets/scss/app.scss';
import $ from 'cash-dom';


export class App {
  initializeApp() {
    let self = this;

    const userNameCondition = "[a-z0-9-_]";
    const reg = new RegExp(userNameCondition);

    const checkUserNameFieldCorrectness = (reg, userName) => reg.test(userName);

    const removeInputUserNameError = userNameInput => {
      userNameInput.removeClass("is-danger");
      userNameInput.off("input", () => removeInputUserNameError(userNameInput));
    };

    const setInputUserNameError = userNameInput => {
      userNameInput.addClass("is-danger");
      userNameInput.on("input", () => removeInputUserNameError(userNameInput));
    };

    var URL = 'https://api.github.com/users/';

    const getData = userName => {
      fetch(URL + userName)
      .then((response)=> response.json())
      .then(function (body) {
        self.profile = body;
        self.update_profile();
      })
    }

    function getDataForIE(userName){
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function() {
            self.profile = JSON.parse(xhr.response);
            self.update_profile();
      });
      xhr.open("GET", URL + userName, true);
      xhr.send();   
    }

    $('.load-username').on('click', function () {
      let userName = $('.username.input').val();
      const userNameInput = $('.username.input');

      const checkFieldResult = checkUserNameFieldCorrectness(reg, userName);
      if(checkFieldResult){
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        if(!isIE) getData(userName);
        else getDataForIE(userName);
      } else setInputUserNameError(userNameInput);
    })
  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
