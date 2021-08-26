import React from "react";
import Popup from "reactjs-popup";
import Button from "../common/Button";
import InputField from "../common/InputField";

const DetailedBill = (props) => {
  const { open, onClose, currentBill } = props;
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
        <div className="col modal style-lg-box bg-color-white text-align-ct">
          <h2>Thông tin chi tiết</h2>
          <div className="col col-full pd-24">
            <div className="col col-half mt-8 pr-4">
              <InputField
                isValid={true}
                value={currentBill?.room}
                autocomplete="off"
                disabled={true}
              />
            </div>
            <div className="col col-half mt-8 pl-4">
              <InputField
                isValid={true}
                value={currentBill?.month}
                autocomplete="off"
                disabled={true}
              />
            </div>
            <div className="col col-full">
              <div className="col col-full mt-8 pr-4">
                <InputField
                  isValid={true}
                  value={`Người thanh toán: ${currentBill?.sinhvien_paid?.first_name} ${currentBill?.sinhvien_paid?.last_name}`}
                  autocomplete="off"
                  disabled={true}
                />
              </div>
            </div>
            <div className="col col-full">
              <div className="col col-half mt-8 pr-4">
                <InputField
                  isValid={true}
                  value={
                    currentBill?.is_paid ? "Đã thanh toán" : "Chưa thanh toán"
                  }
                  autocomplete="off"
                  disabled={true}
                />
              </div>
              <div className="col col-half mt-8 pl-4">
                <InputField isValid={true} autocomplete="off" disabled={true} />
              </div>
            </div>
            <div className="col col-half mt-8 pr-4">
              <InputField
                isValid={true}
                value={""}
                autocomplete="off"
                disabled={true}
              />
            </div>
            <div className="col col-half mt-8 pl-4">
              <InputField
                isValid={true}
                value={""}
                autocomplete="off"
                disabled={true}
              />
            </div>
          </div>
          <div className="col col-full mt-24">
            <div className="col col-half">
              <Button
                type="normal-red"
                content="ĐÓNG"
                isDisable={false}
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default DetailedBill;
