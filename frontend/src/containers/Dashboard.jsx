import React from "react";
import InfoContainer from "../components/dashboard/InfoContainer";
import Notification from "../components/dashboard/Notification";
const Dashboard = () => {
  const notification = [
    {
      time: "3/9/2021",
      poster: "Admin1",
      content: "Thông báo hoạt động văn nghệ.",
    },
    {
      time: "3/9/2021",
      poster: "Admin1",
      content: "Thông báo hoạt động văn nghệ.",
    },
    {
      time: "3/9/2021",
      poster: "Admin1",
      content: "Thông báo hoạt động văn nghệ.",
    },
  ];
  return (
    <div className="style-dashboardContainer">
      <div className="col col-half">
        <div className="col col-full">
          <div className="col col-half">
            <InfoContainer
              number={"9,825"}
              title={"Students"}
              iconStyle={"fi-sr-users"}
              color={"#c71cca"}
              increasedPercent="+0,5"
            />
          </div>
          <div className="col col-half">
            <InfoContainer
              number={"9,825"}
              title={"Teachers"}
              iconStyle={"fi-sr-graduation-cap"}
              color={"#0a3dbd"}
              increasedPercent="+0,5"
            />
          </div>
          <div className="col col-half">
            <InfoContainer
              number={"9,825"}
              title={"Rooms"}
              iconStyle={"fi-sr-school"}
              color={"#2bc155"}
              increasedPercent="+0,5"
            />
          </div>
          <div className="col col-half">
            <InfoContainer
              number={"9,825"}
              title={"Events"}
              iconStyle={"fi-sr-flag"}
              color={"#ff6275"}
              increasedPercent="+0,5"
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className="col col-half">
        <div className="notificationsContainer style-lg-box">
          <p className="style-notiTitle">
            <span>
              <i class="fi-sr-bell"></i>
            </span>
            Notification
          </p>
          <div>
            {notification.map((data, index) => {
              return (
                <Notification
                  key={index}
                  time={data.time}
                  poster={data.poster}
                  content={data.content}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Dashboard);
