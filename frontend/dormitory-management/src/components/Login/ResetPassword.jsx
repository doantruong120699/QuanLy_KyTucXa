import React, { useState } from "react";
import "./Login.css";
import FormError from "../common/FormError/FormError";
import Button from "../common/Button/Button";
import InputField from "../common/InputField/InputField";
import * as AlertMessage from "../../constants/AlertMessage";

const ResetPassword = () => {
  const [errorState, setError] = useState({
    newPass: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
    verification: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  });

  const validPasswordInput = (checkingValue) => {
    const regrexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPass = regrexPass.exec(checkingValue);

    if (isValidPass === null) {
      return {
        isInputValid: false,
        isErrorHidden: false,
        errorMessage: AlertMessage.PASSWORD_INVALID,
      };
    } else {
      return {
        isInputValid: true,
        isErrorHidden: true,
        errorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...errorState[name] };
    newState.value = value;
    setError({ ...errorState, [name]: newState });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    let passError = validPasswordInput(errorState.newPass.value);

    let verificationError = validPasswordInput(errorState.verification.value);

    if (passError.isInputValid && verificationError.isInputValid) {
      if (errorState.newPass.value === errorState.verification.value) {
        //API
      } else {
        passError.isInputValid = false;
        passError.isErrorHidden = false;
        passError.errorMessage = AlertMessage.PASSWORD_DIFFERENT;
        verificationError.isInputValid = false;
        verificationError.isErrorHidden = true;
      }
    }

    const newPassState = { ...errorState.newPass };
    newPassState.isInputValid = passError.isInputValid;
    newPassState.isHidden = passError.isErrorHidden;
    newPassState.errorMessage = passError.errorMessage;

    const newVerification = { ...errorState.verification };
    newVerification.isInputValid = verificationError.isInputValid;
    newVerification.isHidden = verificationError.isErrorHidden;
    newVerification.errorMessage = verificationError.errorMessage;

    setError({
      ...errorState,
      newPass: newPassState,
      verification: newVerification,
    });
  };
  return (
    <div className="login-container">
      <div className="form-login">
        <h2 className="title-login">Đặt lại mật khẩu</h2>
        <form>
          <FormError
            isHidden={errorState.newPass.isHidden}
            errorMessage={errorState.newPass.errorMessage}
          />
          <div className="mb-16">
            <InputField
              type="password"
              isValid={errorState.newPass.isInputValid}
              id="newPass"
              name="newPass"
              placeholder="Mật khẩu mới"
              autocomplete="off"
              onChange={handleInput}
            />
          </div>
          <FormError
            isHidden={errorState.verification.isHidden}
            errorMessage={errorState.verification.errorMessage}
          />
          <div className="mb-16">
            <InputField
              type="password"
              isValid={errorState.verification.isInputValid}
              id="verification"
              name="verification"
              placeholder="Xác thực mật khẩu"
              autocomplete="off"
              onChange={handleInput}
            />
          </div>
          <Button
            type="normal-blue"
            content="Đặt lại"
            onClick={resetPassword}
          />
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
