import { allRooms } from "../components/checkroom/Data";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import Room from "../components/checkroom/Room";

const Checkroom = () => {
  const rooms = allRooms;
  return (
    <div className="style-background">
      <div className="col col-full justify-content-sb mb-16">
        <div className="col col-half">
          <div className="col col-half pd-8">
            <Button type="normal-blue" content="Xem phòng" isDisable={false} />
          </div>
          <div className="col col-half pd-8">
            <Button type="normal-blue" content="Đăng ký" isDisable={false} />
          </div>
        </div>
        <div className="col col-half">
          <div className="col col-two-third pd-8">
            <InputField
              name="searchInput"
              type="text"
              isValid={true}
              placeholder="Tìm kiếm phòng"
              autocomplete="off"
            />
          </div>
          <div className="col col-third pd-8">
            <Button type="normal-blue" content="Tìm kiếm" isDisable={false} />
          </div>
        </div>
      </div>
      {rooms.map((data, index) => {
        return (
          <div key={index} className="col col-full style-areaBox style-box">
            <p>{data.area}</p>
            {data.roomsOfArea.map((room, value) => {
              return (
                <Room
                  key={value}
                  name={room.name}
                  students={room.students}
                  number={room.number}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Checkroom;
