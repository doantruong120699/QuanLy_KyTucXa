import "./styles.css";
import NotificationItem from "./NotificationItem";
export default function NotificationList({ listNoti }) {
  console.log("List", listNoti);
  return (
    <div className="notification-list-box">
      {listNoti.map((index) => {
        return <NotificationItem notification={index} />;
      })}
    </div>
  );
}
