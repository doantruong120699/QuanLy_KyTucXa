import "./styles.css";
import moment from "moment";
export default function NotificationList({ notification }) {
  console.log("noti", notification);
  return (
    <div className="notification-item-box">
      <div className="notification-item-box__title">{notification.title}</div>
      <div className="notification-item-box__content">
        {notification.content}
      </div>
      <div className="notification-item-box__footer">{`Chỉnh sửa lần cuối bởi: ${
        notification.updated_by?.email ? notification.updated_by?.email : ""
      }`}</div>
      <div className="notification-item-box__footer">{`(${moment(
        notification.last_update
      ).format("DD/MM/YYYY HH:mm")})`}</div>
    </div>
  );
}
