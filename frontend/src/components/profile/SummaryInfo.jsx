import Button from "../common/Button";
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
        <Button type="normal-ubg" content="Đổi mật khẩu" isDisable={false} />
      </div>
    </div>
  );
};
export default SummaryInfo;
