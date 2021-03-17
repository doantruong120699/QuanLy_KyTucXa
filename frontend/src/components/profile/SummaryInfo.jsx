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
        <i class="fi-rr-edit"></i>
      </div>
      <div className="col col-full mt-8">
        <i class="fi-rr-marker" />
        <span>{address}</span>
      </div>
      <div className="col col-full  mt-8">
        <i class="fi-rr-envelope" />
        <span>{email}</span>
      </div>{" "}
      <div className="col col-full mt-8">
        <i class="fi-sr-bold" />
        <span>{birthday}</span>
      </div>
      <div className="col col-full mt-8">
        <i class="fi-rr-heart" />
        <span>{gender}</span>
      </div>
      <div className="col col-full mt-8">
        <div>
          <i class="fi-rr-fingerprint" />
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
