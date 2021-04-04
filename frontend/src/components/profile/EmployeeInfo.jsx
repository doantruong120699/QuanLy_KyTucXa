import Button from "../common/Button";
const EmployeeInfo = (props) => {
  const { position,username,area } = props;
  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin công việc</span>
      <div className="col col-full pt-8">
        <span className="text-is-bold">Chức vụ: </span>
        <span>{position}</span>
      </div>
      <div className="col col-full pt-8">
        <span className="text-is-bold">Mã số nhân viên: </span>
        <span>{username}</span>
      </div>
      <div className="col col-full pt-8">
        <span className="text-is-bold">Khu: </span>
        <span>{area}</span>
      </div>
      <div className="col col-third style-detail-btn">
        <Button
          type="normal-ubg"
          content="Xem lịch làm việc"
          isDisable={false}
        />
      </div>
    </div>
  );
};
export default EmployeeInfo;
