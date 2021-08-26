import classNames from "classnames";

const Room = (props) => {
  const { name, maximum, pendding, numberNow, getDetails, typeRoom } = props;

  const bgStyle = classNames(
    `${typeRoom === "1" ? "bg-color-blue" : ""}`,
    `${typeRoom === "2" ? "bg-color-pink " : ""}`,
    `${typeRoom === "3" ? "bg-color-pale-yellow" : ""}`
  );

  var listStudentIcons = [];

  for (var i = 0; i < 8; i++) {
    let textIcon = "";
    let bedStyle = "";
    if (i < numberNow) {
      bedStyle = classNames("bg-color-red");
    } else if (i < pendding + numberNow) {
      bedStyle = classNames("bg-color-yellow");
    } else if (i < maximum) {
      bedStyle = classNames("bg-color-green");
    } else {
      textIcon = "transparency";
      bedStyle = bgStyle;
    }
    listStudentIcons.push(
      <div key={i} className="col col-4">
        <div className={`style-student ${bedStyle}`}>
          <i className={`fi-sr-user ${textIcon}`} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`col col-full style-sm-box style-roomOfArea ${bgStyle}`}
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
