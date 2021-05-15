const Room = (props) => {
  const { name, maximum, numberNow, getDetails } = props;

  var listStudentIcons = [];

  for (var i = 0; i < maximum; i++) {
    let styleStudentIcon = i < numberNow ? "#fd5353" : "#09bd3d";
    listStudentIcons.push(
      <div key={i} className="col col-4">
        <div
          className="style-student"
          style={{ backgroundColor: `${styleStudentIcon}` }}
        >
          <i className="fi-sr-user"></i>
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
