const passwordChecker = (pwdInputValue: string) => {
    // REGEX
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;

    // PASSWORD CHECK
    const passwordLength =      pwdInputValue.length;
    const uppercasePassword =   uppercaseRegExp.test(pwdInputValue);
    const lowercasePassword =   lowercaseRegExp.test(pwdInputValue);
    const digitsPassword =      digitsRegExp.test(pwdInputValue);
    const specialCharPassword = specialCharRegExp.test(pwdInputValue);
    const minLengthPassword =   minLengthRegExp.test(pwdInputValue);
    
    let errorState = true, errMsg = '', errDesc = '';
    if(passwordLength === 0){
        errMsg = "Password is empty";
        errDesc = "Password should not be empty";
    } else if(!minLengthPassword){
        errMsg = "At least minimum 8 characters";
        errDesc = "A safe password should have at least 8 characters.";
    } else if(!uppercasePassword){
        errMsg = "At least one Uppercase";
        errDesc = "A safe password should have at least 1 uppercase letter.";
    } else if(!lowercasePassword){
        errMsg = "At least one Lowercase";
        errDesc = "A safe password should have at least 1 lowercase letter.";
    } else if(!digitsPassword){
        errMsg = "At least one digit";
        errDesc = "A safe password should have at least 1 number.";
    } else if(!specialCharPassword){
        errMsg = "At least one Special Characters";
        errDesc = "A safe password should have at least 1 special character.";
    } else {
        errMsg = "";
        errorState = false;
        errDesc = '';
    }

    if(errorState) throw {
        code: 'auth/passwordStrengthCheckError',
        name: errMsg,
        message: errDesc,
        stack: `${errMsg}: ${errDesc}`
    };
}

export default passwordChecker;