import moment from "moment";
const Notification = (props) => {
  const { time, poster, content, title } = props;
  return (
    <div className="style-notificationBox">
      <p className="">
        <span className="bold-text text-is-red">
          {moment(new Date(time)).format("DD-MM-YYYY")}
        </span>
        <span className="bold-text"> [{poster}] </span>:
        <span className="bold-text text-is-blue">{title}</span>
      </p>
      <span>{content}</span>
    </div>
  );
};
export default Notification;
