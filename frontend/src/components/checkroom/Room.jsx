const Room = (props) => {
  const { name, maximum, numberNow, getDetails } = props;

  var listStudentIcons = [];

  for (var i = 0; i < 8; i++) {
    let styleStudent;
    let textIcon = "";
    if (i < numberNow) {
      styleStudent = "#fd5353";
    } else if (i >= numberNow && i < maximum) {
      styleStudent = "#09bd3d";
    } else {
      styleStudent = "#ffaa2b";
      textIcon = "text-is-orange";
    }
    listStudentIcons.push(
      <div key={i} className="col col-4">
        <div
          className="style-student"
          style={{ backgroundColor: `${styleStudent}` }}
        >
          <i className={`fi-sr-user ${textIcon}`} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="col col-full style-roomOfArea style-sm-box"
      onClick={getDetails}
    >
      <div className="col col-full justify-content-sb text-20 pd-8">
        <span className="bold-text">{name}</span>
      </div>
      <div>{listStudentIcons}</div>
    </div>
  );
};
export default Room;
