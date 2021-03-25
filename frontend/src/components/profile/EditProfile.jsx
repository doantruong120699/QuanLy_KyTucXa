import Popup from "reactjs-popup";
import FormError from "../common/FormError";
import InputField from "../common/InputField";

const EditProfile = () => {
  return (
    <Popup open={true} closeOnDocumentClick onClose={""}>
      <div className="col modal style-lg-box bg-color-white text-align-ct">
        <h2 className="pt-12">Nhập thông tin cá nhân mới</h2>
        <div className="col col-full pd-24">
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={""}
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
              isValid={""}
              type="text"
              placeholder="Địa chỉ"
              onChange={""}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <FormError isHidden={""} errorMessage={""} />
            <InputField
              name="curPass"
              isValid={""}
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
              isValid={""}
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
              isValid={""}
              type="tel"
              placeholder="CMND"
              onChange={""}
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default EditProfile;
