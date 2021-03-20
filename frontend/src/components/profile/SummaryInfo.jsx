import Button from "../common/Button";
const SummaryInfo = (props) => {
  const {
    firstname,
    username,
    address,
    email,
    birthday,
    gender,
    identifyCard,
    onClick,
  } = props;
  return (
    <div className="col col-two-third style-summaryInfo">
      <div className="col col-full justify-content-sb mt-8">
        <div>
          <span className="style-firstname">{firstname}</span>
          <span>{username}</span>
        </div>
        <i className="fi-rr-edit"></i>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-marker" />
        <span>{address}</span>
      </div>
      <div className="col col-full  mt-8">
        <i className="fi-rr-envelope" />
        <span>{email}</span>
      </div>{" "}
      <div className="col col-full mt-8">
        <i className="fi-sr-bold" />
        <span>{birthday}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-heart" />
        <span>{gender}</span>
      </div>
      <div className="col col-full mt-8">
        <div>
          <i className="fi-rr-fingerprint" />
          <span>{identifyCard}</span>
        </div>
        <div className="style-buttonProfile">
          <Button
            type="normal-ubg"
            content="Đổi mật khẩu"
            onClick={onClick}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default SummaryInfo;
