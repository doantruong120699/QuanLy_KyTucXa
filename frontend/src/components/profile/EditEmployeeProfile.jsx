import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import Button from "../common/Button";
import FormError from "../common/FormError";
import InputField from "../common/InputField";
import validate from "../../utilities/regex";
import ProfileContext from "./ProfileContext";
import { getEditEmployeeInfoState, getRawDataRender } from "./DataRender";

const EditEmployeeProfile = (props) => {
  const { open, onClose, dataRender } = props;

  const [infoState, setInfo] = useState(getEditEmployeeInfoState());

  const context = useContext(ProfileContext);

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...infoState[name] };
    newState.value = value;
    setInfo({ ...infoState, [name]: newState });
  };

  const validateEditedinfo = () => {
    let tempEditData = { ...infoState };
    Object.keys(infoState).forEach((value) => {
      if (
        dataRender[value].validateType &&
        !validate[dataRender[value].validateType](infoState[value].value)
      ) {
        tempEditData[value].isValid = false;
        tempEditData[value].isHidden = false;
      } else {
        tempEditData[value].isValid = true;
        tempEditData[value].isHidden = true;
      }
      setInfo(tempEditData);
    });
  };

  const saveInfo = () => {
    validateEditedinfo();
    if (
      infoState.firstName.isValid &&
      infoState.lastName.isValid &&
      infoState.email.isValid &&
      infoState.identification.isValid &&
      infoState.phone.isValid
    ) {
      const data = getRawDataRender(infoState);
      const { updateOrigin } = context;
      updateOrigin(data);
      onClose(setInfo(getEditEmployeeInfoState()));
    }
  };
  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={() => onClose(setInfo(getEditEmployeeInfoState()))}
    >
      <div className="col modal style-lg-box bg-color-white text-align-ct">
        <h2>Nhập thông tin cá nhân mới</h2>
        <div className="col col-full pd-24">
          {Object.keys(infoState).map((value, index) => {
            return (
              <div key={index} className="col col-full mt-8">
                <FormError
                  isHidden={infoState[value].isHidden}
                  errorMessage={dataRender[value].errorMessage}
                />
                <InputField
                  name={value}
                  isValid={infoState[value].isValid}
                  type={dataRender[value].type}
                  placeholder={dataRender[value].title}
                  onChange={handleInput}
                  autocomplete="off"
                />
              </div>
            );
          })}
          <div className="col col-full mt-24">
            <div className="col col-half">
              <Button
                type="normal-red"
                content="HỦY"
                isDisable={false}
                onClick={onClose}
              />
            </div>
            <div className="col col-half">
              <Button
                type="normal-ubg"
                content="LƯU"
                isDisable={false}
                onClick={saveInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default EditEmployeeProfile;
