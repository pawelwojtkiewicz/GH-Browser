import '../assets/scss/app.scss';

export default checkUserNameFieldCorrectness = (userName, userNameInput) => {
    const userNameCondition = "[a-z0-9-_]+$";
    const reg = new RegExp(userNameCondition);

    const removeInputUserNameError = userNameInput => {
        userNameInput.removeClass("is-danger");
        userNameInput.off();
    };

    const setInputUserNameError = userNameInput => {
        userNameInput.addClass("is-danger");
        userNameInput.on("input", () => removeInputUserNameError(userNameInput));
    };

    const checkFieldCorrectness = (reg, userName) => reg.test(userName);
       
    const isUserNameCorrect = checkFieldCorrectness(reg, userName);
    if(isUserNameCorrect){
        return isUserNameCorrect;
    } else {
        setInputUserNameError(userNameInput);
        return isUserNameCorrect;
    }
}