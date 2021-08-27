import React, { useState } from "react";
import Button from "../common/Button";
import Popup from "reactjs-popup";
import InputField from "../common/InputField";
const RoomRegistration = (props) => {
  const { open, onClose, name, id, registerRoom, payment, schoolYear } = props;

  const [resgistrationState, setRegistration] = useState({
    room: id,
    semester: "1",
    school_year: "1",
    payment_method: "1",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistration({ ...resgistrationState, [name]: value });
  };

  const register = () => {
    registerRoom(resgistrationState);
    onClose();
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      {payment && schoolYear && (
        <div className="col modal style-lg-box bg-color-white">
          <div className="col col-full text-align-ct">
            <h2>Đăng kí phòng</h2>
          </div>
          <div className="col col-full pd-16">
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Tên phòng</div>
              <div className="col col-full">
                <InputField
                  name="room"
                  type="input"
                  isValid={true}
                  value={name}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Thời gian</div>
              <div className="col col-full">
                <select
                  name="semester"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="1">Học kỳ I</option>
                  <option value="2">Học kỳ II</option>
                  <option value="3">Học kỳ hè</option>
                </select>
              </div>
            </div>
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Năm học</div>
              <div className="col col-full">
                <select
                  name="school_year"
                  className="form-control"
                  onChange={handleChange}
                >
                  {schoolYear.map((value, index) => {
                    return (
                      <option key={index} value={value.id}>
                        {value.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Phương thức thanh toán</div>
              <select
                name="payment_method"
                className="col col-full form-control"
                onChange={handleChange}
              >
                {payment.map((value, index) => {
                  return (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col col-full mt-24 text-align-ct">
              <div className="col col-half">
                <Button
                  type="normal-blue"
                  content="Đăng ký"
                  onClick={register}
                />
              </div>
              <div className="col col-half">
                <Button type="normal-red" content="Hủy bỏ" onClick={onClose} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
export default RoomRegistration;
