import { allRooms } from "../dashboard/Data";
import Room from "../checkroom/Room";
const Checkroom = () => {
  const rooms = allRooms;
  const dataRooms = rooms.map((data, index) => {
    return (
      <div key={index} className="col col-full style-areaBox style-lg-box">
        <p>{data.area}</p>
        {data.roomsOfArea.map((room, value) => {
          return (
            <div className="col col-5 pd-8">
              <Room
                key={value}
                name={room.name}
                maximum={room.number}
                students={room.students}
              />
            </div>
          );
        })}
      </div>
    );
  });
  return <div className="style-checkroom">{dataRooms}</div>;
};
export default Checkroom;
