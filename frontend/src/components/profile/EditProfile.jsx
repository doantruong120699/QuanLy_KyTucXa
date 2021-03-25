import Popup from "reactjs-popup";
import Button from "../common/Button";
import FormError from "../common/FormError";
import InputField from "../common/InputField";

const EditProfile = (props) => {
  const { open, onClose, saveInfo } = props;
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div className="col modal style-lg-box bg-color-white text-align-ct">
        <h2 className="pt-12">Nhập thông tin cá nhân mới</h2>
        <div className="col col-full pd-24">
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={true}
              type="text"
              placeholder="Tên hiển thị"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={true}
              type="text"
              placeholder="Địa chỉ"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <InputField
              name="curPass"
              isValid={true}
              type="date"
              placeholder="Ngày sinh"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={true}
              type="tel"
              placeholder="Số điện thoại"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={true}
              type="tel"
              placeholder="CMND"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <div className="col col-third pr-4">
              <InputField
                name="curPass"
                isValid={true}
                type="tel"
                placeholder="Lớp"
                onChange={""}
                autocomplete="off"
              />
            </div>
            <div className="col col-two-third pl-4">
              <InputField
                name="curPass"
                isValid={true}
                type="tel"
                placeholder="Ngành"
                onChange={""}
                autocomplete="off"
              />
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
export default EditProfile;
