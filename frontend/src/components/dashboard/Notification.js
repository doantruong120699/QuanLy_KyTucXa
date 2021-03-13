
const Notification = (props) => {
  const { time, poster, content } = props;
  return (
    <div className="style-notificationBox">
      <p className="">{time}</p>
      <span>
        {poster}: {content}
      </span>
    </div>
  );
};
export default Notification;
