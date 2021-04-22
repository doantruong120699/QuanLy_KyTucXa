import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import Button from "../common/Button";
import FormError from "../common/FormError";
import InputField from "../common/InputField";
import validate from "../../utilities/regex";
import ProfileContext from "./ProfileContext";
import { getRawDataRender } from "./DataRender";

const EditEmployeeProfile = (props) => {
  const { open, onClose, dataRender, studyInfo } = props;

  const [infoState, setInfo] = useState(dataRender);

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
      onClose();
    }
  };
  return (
    <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
      <div className="col modal style-lg-box bg-color-white text-align-ct">
        <h2>Nhập thông tin cá nhân mới</h2>
        <div className="col col-full pd-24">
          <div className="col col-full mt-8">
            <div className="col col-half mt-8 pr-4">
              <FormError
                isHidden={infoState.firstName.isHidden}
                errorMessage={dataRender.firstName.errorMessage}
              />
            </div>
            <div className="col col-half mt-8 pl-4">
              <FormError
                isHidden={infoState.lastName.isHidden}
                errorMessage={dataRender.lastName.errorMessage}
              />
            </div>
          </div>
          <div className="col col-full mt-8">
            <div className="col col-half mt-8 pr-4">
              <InputField
                name="firstName"
                isValid={infoState.firstName.isValid}
                value={infoState.firstName.value}
                type={dataRender.firstName.type}
                placeholder={dataRender.firstName.title}
                onChange={handleInput}
                autocomplete="off"
              />
            </div>
            <div className="col col-half mt-8 pl-4">
              <InputField
                name="lastName"
                isValid={infoState.lastName.isValid}
                value={infoState.lastName.value}
                type={dataRender.lastName.type}
                placeholder={dataRender.lastName.title}
                onChange={handleInput}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="col col-full mt-8">
            <FormError
              isHidden={infoState.email.isHidden}
              errorMessage={dataRender.email.errorMessage}
            />
            <InputField
              name="email"
              isValid={infoState.email.isValid}
              value={infoState.email.value}
              type={dataRender.email.type}
              placeholder={dataRender.email.title}
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-8">
            <FormError
              isHidden={infoState.birthday.isHidden}
              errorMessage={dataRender.birthday.errorMessage}
            />
            <InputField
              name="birthday"
              isValid={infoState.birthday.isValid}
              value={infoState.birthday.value}
              type={dataRender.birthday.type}
              placeholder={dataRender.birthday.title}
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-8">
            <FormError
              isHidden={infoState.address.isHidden}
              errorMessage={dataRender.address.errorMessage}
            />
            <InputField
              name="address"
              isValid={infoState.address.isValid}
              value={infoState.address.value}
              type={dataRender.address.type}
              placeholder={dataRender.address.title}
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-8">
            <FormError
              isHidden={infoState.phone.isHidden}
              errorMessage={dataRender.phone.errorMessage}
            />
            <InputField
              name="phone"
              isValid={infoState.phone.isValid}
              value={infoState.phone.value}
              type={dataRender.phone.type}
              placeholder={dataRender.phone.title}
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-8">
            <FormError
              isHidden={infoState.identification.isHidden}
              errorMessage={dataRender.identification.errorMessage}
            />
            <InputField
              name="identification"
              isValid={infoState.identification.isValid}
              value={infoState.identification.value}
              type={dataRender.identification.type}
              placeholder={dataRender.identification.title}
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full">
            <div className="col col-half pr-4">
              <select name="faculty" id="faculty" onChange={handleInput}>
                {studyInfo.faculty.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col col-half pl-4">
              <select name="grade" id="grade" onChange={handleInput}>
                {studyInfo.grade.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
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
