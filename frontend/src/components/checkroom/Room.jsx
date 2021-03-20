const Room = (props) => {
  const { name, students, number } = props;
  const studentList = [];
  for (var i = 0; i < number; i++) {
    var style = students[i]
      ? { backgroundColor: "#09bd3d" }
      : { backgroundColor: "#ffaa2b" };
    studentList.push(
      <div key={i} className="col col-4">
        <div className="style-student" style={style}>
          <i className="fi-sr-user"></i>
        </div>
      </div>
    );
  }
  return (
    <div className="col col-5">
      <div className="col style-roomOfArea style-smBox">
        <p>{name}</p>
        {studentList}
      </div>
    </div>
  );
};
export default Room;
