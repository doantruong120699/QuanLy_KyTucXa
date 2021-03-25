import React, { useState } from "react";
import Button from "../common/Button";
import EditProfile from "./EditProfile";
import * as AlertMessage from "../../utilities/constants/AlertMessage";
import { changePass } from "../../redux/actions/changePass";
import ChangePass from "./ChangePass";
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
          closeChangePassModal();
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

  const [openChangePass, setOpenChangePass] = useState(false);
  const closeChangePassModal = () => {
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

    setOpenChangePass(false);
  };
  const openChangePassModal = () => setOpenChangePass(true);

  const [openEdit, setOpenEdit] = useState(false);
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  const openEditModal = () => setOpenEdit(true);

  return (
    <div className="col col-full  pd-24 style-lg-box bg-color-white style-summaryinfo">
      <div className="col col-full justify-content-sb ml-8">
        <div>
          <span className="text-is-purple-gradient style-profile-name">
            {name}{" "}
          </span>
          <span>{username}</span>
        </div>
        <i className="fi-rr-edit" onClick={openEditModal}></i>
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
          onClick={openChangePassModal}
        />
        <ChangePass
          open={openChangePass}
          closeModal={closeChangePassModal}
          errorState={errorState}
          handleInput={handleInput}
          savePass={savePass}
        />
        <EditProfile open={openEdit} onClose={closeEditModal} />
      </div>
    </div>
  );
};
export default SummaryInfo;
