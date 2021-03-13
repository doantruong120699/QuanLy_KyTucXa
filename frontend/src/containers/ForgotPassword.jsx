import React, { useState } from "react";
import InputField from "../components/common/InputField";
import FormError from "../components/common/FormError";
import Button from "../components/common/Button";
import * as AlertMessage from "../utilities/constants/AlertMessage";

const ForgotPassword = () => {
  const [errorState, setError] = useState({
    email: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  });

  const validEmailInput = (checkingValue) => {
    const regrexPass = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = regrexPass.exec(checkingValue);
    if (isValidEmail === null) {
      return {
        isEmailInputValid: false,
        isEmailErrorHidden: false,
        emailErrorMessage: AlertMessage.EMAIL_INVALID,
      };
    } else {
      return {
        isEmailInputValid: true,
        isEmailErrorHidden: true,
        emailErrorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...errorState[name] };
    newState.value = value;
    setError({ ...errorState, [name]: newState });
  };

  const submit = (event) => {
    event.preventDefault();

    let {
      isEmailInputValid,
      isEmailErrorHidden,
      emailErrorMessage,
    } = validEmailInput(errorState.email.value);

    if (isEmailInputValid) {
      isEmailInputValid = false;
      isEmailErrorHidden = false;
      emailErrorMessage = AlertMessage.EMAIL_UNAVAILABLE;
    }

    const newEmailState = { ...errorState.newPass };
    newEmailState.isInputValid = isEmailInputValid;
    newEmailState.isHidden = isEmailErrorHidden;
    newEmailState.errorMessage = emailErrorMessage;

    setError({
      ...errorState,
      email: newEmailState,
    });
  };
  return (
    <div className="login-container">
      <div className="form-login">
        <h2 className="title-login">Quên mật khẩu</h2>
        <h3 className="content-login">
          Bạn hãy nhập vào Email dưới đây. Chúng tôi sẽ gửi cho bạn đường link
          đổi mật khẩu mới.
        </h3>
        <form>
          <FormError
            isHidden={errorState.email.isHidden}
            errorMessage={errorState.email.errorMessage}
          />
          <div className="mb-16">
            <InputField
              type="text"
              isValid={errorState.email.isInputValid}
              id="email"
              name="email"
              placeholder="Địa chỉ Email"
              autocomplete="off"
              onChange={handleInput}
            />
          </div>
          <Button type="normal-blue" content="Xác nhận" onClick={submit} />
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
