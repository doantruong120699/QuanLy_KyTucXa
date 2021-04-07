const Room = (props) => {
  const { name, maximum, students } = props;

  var listStudentIcons = [];

  for (var i = 0; i < maximum; i++) {
    let styleStudentIcon =
      typeof students[i] === "undefined" ? "#fd5353" : "#09bd3d";
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
    <div className="col col-full style-roomOfArea style-sm-box">
      <div className="col col-full justify-content-sb text-20 pd-8">
        <span className="bold-text">{name}</span>
        <i className="fi-rr-info"></i>
      </div>
      <div>{listStudentIcons}</div>
    </div>
  );
};
export default Room;
