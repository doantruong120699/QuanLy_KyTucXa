import { allRooms } from "../dashboard/Data";
const Checkroom = () => {
  const rooms = allRooms;
  const dataRooms = rooms.map((data, index) => {
    return (
      <div key={index} className="col col-full style-areaBox style-lg-box">
        <p>{data.area}</p>
        {data.roomsOfArea.map((room, value) => {
          return (
            <div className="col col-5">
              <div key={value} className="col style-roomOfArea style-sm-box">
                <p>{room.name}</p>
                {room.students.map((student, index) => {
                  return (
                    <div className="col col-4">
                      <div className="style-student">
                        <i class="fi-sr-user"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  });
  return <div className="style-checkroom">{dataRooms}</div>;
};
export default Checkroom;
