import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfoContainer from "../components/dashboard/InfoContainer";
import Notification from "../components/dashboard/Notification";
import * as TitleList from "../utilities/constants/titles";
import Pagination from "../components/common/Pagination";
import {
  actFetchTitleNavigation,
  getNotifications,
  getDashboard,
} from "../redux/actions/dashboard";
const Dashboard = () => {
  const dispatch = useDispatch();

  const [notifications, setNotification] = useState();

  const [dashboard, setDashboard] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[0].title));

    const GetNotifications = () =>
      getNotifications((output) => {
        if (output) {
          const pagination = {
            page: output.current_page,
            page_size: output.page_size,
            totals: output.totals,
          };
          setNotification(output);
          setPagination(pagination);
        }
      });

    const GetDashboard = () =>
      getDashboard((output) => {
        if (output) {
          console.log(output);
          setDashboard(output);
        }
      });
    GetDashboard();
    GetNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div className="style-background-container">
      <div>
        {dashboard && (
          <div className="col col-half">
            <div className="col col-full">
              <div className="col col-half">
                <InfoContainer
                  number={dashboard.student.total}
                  title={"Tổng số sinh viên"}
                  iconStyle={"fi-sr-graduation-cap"}
                  color={"#c71cca"}
                  increasedPercent={dashboard.student.cur_month}
                />
              </div>
              <div className="col col-half">
                <InfoContainer
                  number={dashboard.staff.total}
                  title={"Tổng số nhân viên"}
                  iconStyle={"fi-sr-users"}
                  color={"#0a3dbd"}
                  increasedPercent={dashboard.staff.cur_month}
                />
              </div>
              <div className="col col-half">
                <InfoContainer
                  number={dashboard.room.total}
                  title={"Tổng số phòng"}
                  iconStyle={"fi-sr-school"}
                  color={"#2bc155"}
                  increasedPercent={null}
                />
              </div>
              <div className="col col-half">
                <InfoContainer
                  number={dashboard.room_available}
                  title={"Phòng trống"}
                  iconStyle={"fi-sr-checkbox"}
                  color={"#ff6275"}
                  increasedPercent={null}
                />
              </div>
            </div>
            <div></div>
          </div>
        )}
        {notifications && (
          <div className="col col-half">
            <div className="notificationsContainer style-lg-box">
              <p className="style-notiTitle">
                <span>
                  <i className="fi-sr-bell"></i>
                </span>
                Notification
              </p>
              <div>
                {notifications.results.map((data, index) => {
                  return (
                    <Notification
                      key={index}
                      time={data.last_update}
                      poster={`${data.created_by.first_name} ${data.created_by.last_name}`}
                      title={data.title}
                      content={data.content}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col col-full">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default React.memo(Dashboard);
