import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Popup from "reactjs-popup";
import InputField from "../common/InputField";
import { getPaymentMethods } from "../../redux/actions/checkroom";
import moment from "moment";
const RoomRegistration = (props) => {
  const { open, onClose, name, id, registerRoom } = props;

  const [resgistrationState, setRegistration] = useState({
    room: id,
    start_at: moment(new Date()).format("YYYY-MM-DD"),
    end_at: moment(new Date()).format("YYYY-MM-DD"),
    payment_method: "1",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistration({ ...resgistrationState, [name]: value });
  };

  const [paymentState, setPayment] = useState();
  useEffect(() => {
    getPaymentMethods((output) => {
      if (output) {
        setPayment(output);
      }
    });
  }, []);

  const register = () => {
    registerRoom(resgistrationState);
    onClose();
  };
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      {paymentState && (
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
              <div className="col col-full pb-8">Ngày bắt đầu</div>
              <div className="col col-full">
                <InputField
                  name="start_at"
                  type="date"
                  value={resgistrationState.start_at}
                  isValid={true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Ngày kết thúc</div>
              <div className="col col-full">
                <InputField
                  name="end_at"
                  type="date"
                  value={resgistrationState.end_at}
                  isValid={true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col col-full pd-8">
              <div className="col col-full pb-8">Phương thức thanh toán</div>
              <select
                name="payment_method"
                className="col col-full form-control"
                onChange={handleChange}
              >
                {paymentState.map((value, index) => {
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
