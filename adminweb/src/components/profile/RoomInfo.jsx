import Button from "../common/Button";
const RoomInfo = (props) => {
  const { name, area } = props;
  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin phòng</span>
      <div className="col col-full">
        <span className="text-is-bold">Tên phòng: </span>
        <span>{name}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Khu: </span>
        <span>{area}</span>
      </div>
      <div className="col col-half style-detail-btn">
        <Button type="normal-ubg" content="Xem chi tiết" isDisable={false} />
      </div>
    </div>
  );
};
export default RoomInfo;
