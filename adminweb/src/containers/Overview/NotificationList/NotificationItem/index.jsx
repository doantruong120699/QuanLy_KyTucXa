import "./styles.css";
import moment from "moment";
export default function NotificationList({ notification }) {
  return (
    <div className="notification-item-box">
      <div className="notification-item-box__title">{notification.title}</div>
      <div className="notification-item-box__content">
        {notification.content}
      </div>
      <div className="notification-item-box__footer">
        Tạo bởi:{" "}
        <span>
          {notification.created_by
            ? notification.created_by.first_name +
              notification.created_by.last_name
            : ""}
        </span>
      </div>
      <div className="notification-item-box__footer">{`(${moment(
        notification.last_update
      ).format("DD/MM/YYYY HH:mm")})`}</div>
    </div>
  );
}
