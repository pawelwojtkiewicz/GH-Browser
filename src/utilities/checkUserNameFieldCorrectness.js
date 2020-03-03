import '../assets/scss/app.scss';

export default function checkUserNameFieldCorrectness(userName, userNameInput){
    const userNameCondition = "[a-z0-9-_]+$";
    const reg = new RegExp(userNameCondition);

    function removeInputUserNameError(userNameInput){
        userNameInput.removeClass("is-danger");
        userNameInput.off();
    };

    function setInputUserNameError(userNameInput){
        userNameInput.addClass("is-danger");
        userNameInput.on("input", function(){removeInputUserNameError(userNameInput)});
    };

    function checkFieldCorrectness(reg, userName){
        const result = reg.test(userName);
        return result;
    };

    const isUserNameCorrect = checkFieldCorrectness(reg, userName);
    if(isUserNameCorrect){
        return isUserNameCorrect;
    } else {
        setInputUserNameError(userNameInput);
        return isUserNameCorrect;
    }
}