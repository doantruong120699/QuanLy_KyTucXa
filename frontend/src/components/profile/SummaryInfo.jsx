import React, { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../common/Button";
import InputField from "../common/InputField";
import * as AlertMessage from "../../utilities/constants/AlertMessage";
import FormError from "../common/FormError";
import { changePass } from "../../redux/actions/changePass";
const SummaryInfo = (props) => {
  const {
    name,
    username,
    address,
    email,
    birthday,
    phone,
    identification,
    gender,
  } = props;

  const [errorState, setError] = useState({
    curPass: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
    newPass: {
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

  const savePass = (event) => {
    event.preventDefault();

    let curPassError = validPasswordInput(errorState.curPass.value);

    let newPassError = validPasswordInput(errorState.newPass.value);

    if (curPassError.isInputValid && newPassError.isInputValid) {
      const data = {
        email: email,
        password: errorState.newPass.value,
        old_password: errorState.curPass.value,
        confirm_password: errorState.newPass.value,
      };
      console.log(data);
      var token = localStorage.getItem("token");
      changePass(data, token, (output) => {
        if (output) {
          console.log(output);
          closeModal();
        } else {
          const curPassState = { ...errorState.newPass };
          curPassState.isInputValid = false;
          curPassState.isHidden = false;
          curPassState.errorMessage = AlertMessage.PASSWORD_DIFFERENT;

          const newPassState = { ...errorState.newPass };
          newPassState.isInputValid = false;
          newPassState.isHidden = true;
          newPassState.errorMessage = newPassError.errorMessage;

          setError({
            ...errorState,
            curPass: curPassState,
            newPass: newPassState,
          });
        }
      });
    }

    const curPassState = { ...errorState.curPass };
    curPassState.isInputValid = curPassError.isInputValid;
    curPassState.isHidden = curPassError.isErrorHidden;
    curPassState.errorMessage = curPassError.errorMessage;

    const newPassState = { ...errorState.newPass };
    newPassState.isInputValid = newPassError.isInputValid;
    newPassState.isHidden = newPassError.isErrorHidden;
    newPassState.errorMessage = newPassError.errorMessage;

    setError({
      ...errorState,
      curPass: curPassState,
      newPass: newPassState,
    });
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setError({
      curPass: {
        isHidden: true,
        isInputValid: true,
        value: "",
        errorMessage: "",
      },
      newPass: {
        isHidden: true,
        isInputValid: true,
        value: "",
        errorMessage: "",
      },
    });

    setOpen(false);
  };
  const openModal = () => setOpen(true);

  return (
    <div className="col col-full  pd-24 style-lg-box bg-color-white style-summaryinfo">
      <div className="col col-full justify-content-sb ml-8">
        <div>
          <span className="text-is-purple-gradient style-profile-name">
            {name}{" "}
          </span>
          <span>{username}</span>
        </div>
        <i className="fi-rr-edit"></i>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-heart"></i>
        <span>{gender ? "Nam" : "Nữ"}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-marker"></i>
        <span>{address}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-envelope"></i>
        <span>{email}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-bold"></i>
        <span>{birthday}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-smartphone"></i>
        <span>{phone}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-fingerprint"></i>
        <span>{identification}</span>
      </div>
      <div className="col col-third style-profile-changepass-btn">
        <Button
          type="normal-ubg"
          content="Đổi mật khẩu"
          isDisable={false}
          onClick={openModal}
        />
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="col modal style-lg-box bg-color-white text-align-ct">
            <h2>Nhập mật khẩu mới</h2>
            <div className="col col-full pd-24">
              <div className="col col-full mt-24">
                <FormError
                  isHidden={errorState.curPass.isHidden}
                  errorMessage={errorState.curPass.errorMessage}
                />
                <InputField
                  name="curPass"
                  isValid={errorState.curPass.isInputValid}
                  type="text"
                  placeholder="Mật khẩu hiện tại"
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-24">
                <FormError
                  isHidden={errorState.newPass.isHidden}
                  errorMessage={errorState.newPass.errorMessage}
                />
                <InputField
                  name="newPass"
                  isValid={errorState.newPass.isInputValid}
                  type="text"
                  placeholder="Mật khẩu mới"
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-24">
                <div className="col col-half">
                  <Button
                    type="normal-red"
                    content="HỦY"
                    isDisable={false}
                    onClick={closeModal}
                  />
                </div>
                <div className="col col-half">
                  <Button
                    type="normal-ubg"
                    content="LƯU"
                    isDisable={false}
                    onClick={savePass}
                  />
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};
export default SummaryInfo;
