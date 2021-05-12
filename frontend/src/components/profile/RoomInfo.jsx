import Button from "../common/Button";
const RoomInfo = (props) => {
  const { room, area } = props;
  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin phòng</span>
      <div className="col col-full">
        <span className="pl-16">Tên phòng: </span>
        <span>{room}</span>
      </div>
      <div className="col col-full">
        <span className="pl-16">Khu: </span>
        <span>{area}</span>
      </div>
      <div className="col col-half style-detail-btn">
        <Button type="normal-ubg" content="Xem chi tiết" isDisable={false} />
      </div>
    </div>
  );
};
export default RoomInfo;
