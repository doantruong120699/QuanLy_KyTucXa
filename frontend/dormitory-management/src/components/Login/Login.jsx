import React, { useState } from "react";
import FormError from "../common/FormError/FormError";
import Button from "../common/Button/Button";
import InputField from "../common/InputField/InputField";
import * as AlertMessage from "../../constants/AlertMessage";
import { loginUser } from "../../actions/actions";
import { requestLogin } from "../../apis/handleAPIs";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [errorState, setError] = useState({
    accountTxt: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
    passwordTxt: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  });

  const validAccountInput = (checkingValue) => {
    if (checkingValue === "") {
      return {
        isAccountInputValid: false,
        isAccountErrorHidden: false,
        accountErrorMessage: AlertMessage.ACCOUNT_EMPTY,
      };
    } else {
      return {
        isAccountInputValid: true,
        isAccountErrorHidden: true,
        accountErrorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const validPasswordInput = (checkingValue) => {
    const regrexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPass = regrexPass.exec(checkingValue);

    if (isValidPass === null) {
      return {
        isPassInputValid: false,
        isPassErrorHidden: false,
        passErrorMessage: AlertMessage.PASSWORD_INVALID,
      };
    } else {
      return {
        isPassInputValid: true,
        isPassErrorHidden: true,
        passErrorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...errorState[name] };
    newState.value = value;
    setError({ ...errorState, [name]: newState });
  };

  const login = (event) => {
    event.preventDefault();

    let {
      isAccountInputValid,
      isAccountErrorHidden,
      accountErrorMessage,
    } = validAccountInput(errorState.accountTxt.value);

    let {
      isPassInputValid,
      isPassErrorHidden,
      passErrorMessage,
    } = validPasswordInput(errorState.passwordTxt.value);

    if (isAccountInputValid && isPassInputValid) {
      const user = {
        username: errorState.accountTxt.value,
        password: errorState.passwordTxt.value,
      };
      requestLogin(user).then((res) => {
        const token = res.data.access;
        console.log(token);
      });

      /*isAccountErrorHidden = false;
      isAccountInputValid = false;
      accountErrorMessage = AlertMessage.ACCOUNT_PASSWORD_UNAVAILABLE;
      isPassErrorHidden = true;
      isPassInputValid = false;*/
    }

    const newAccountState = { ...errorState.accountTxt };
    newAccountState.isInputValid = isAccountInputValid;
    newAccountState.isHidden = isAccountErrorHidden;
    newAccountState.errorMessage = accountErrorMessage;

    const newPassState = { ...errorState.passwordTxt };
    newPassState.isInputValid = isPassInputValid;
    newPassState.isHidden = isPassErrorHidden;
    newPassState.errorMessage = passErrorMessage;
    setError({
      ...errorState,
      accountTxt: newAccountState,
      passwordTxt: newPassState,
    });
  };

  return (
    <div className="login-container">
      <div className="form-login">
        <h2 className="title-login">Đăng nhập</h2>
        <h3 className="content-login">
          Có thể đăng nhập bằng tài khoản sinh viên:
        </h3>
        <form>
          <FormError
            isHidden={errorState.accountTxt.isHidden}
            errorMessage={errorState.accountTxt.errorMessage}
          />
          <div className="mb-16">
            <InputField
              type="text"
              isValid={errorState.accountTxt.isInputValid}
              id="account"
              name="accountTxt"
              placeholder="Tài khoản"
              autocomplete="off"
              onChange={handleInput}
            />
          </div>
          <FormError
            isHidden={errorState.passwordTxt.isHidden}
            errorMessage={errorState.passwordTxt.errorMessage}
          />
          <div className="mb-16">
            <InputField
              type="password"
              isValid={errorState.passwordTxt.isInputValid}
              id="password"
              name="passwordTxt"
              placeholder="Mật khẩu"
              autocomplete="off"
              onChange={handleInput}
            />
          </div>
          <div className="forgot-pass-link">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          <Button type="normal-blue" content="Đăng nhập" onClick={login} />
        </form>
      </div>
    </div>
  );
};
export default Login;
