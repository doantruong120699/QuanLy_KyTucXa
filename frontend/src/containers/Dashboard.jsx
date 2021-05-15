import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfoContainer from "../components/dashboard/InfoContainer";
import Notification from "../components/dashboard/Notification";
import * as TitleList from "../utilities/constants/titles";
import Pagination from "../components/common/Pagination";
import {
  actFetchTitleNavigation,
  getNotifications,
} from "../redux/actions/dashboard";
const Dashboard = () => {
  const dispatch = useDispatch();

  const [notifications, setNotification] = useState();

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

    GetNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div className="style-background-container">
      {notifications && (
        <div>
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
        </div>
      )}
    </div>
  );
};
export default React.memo(Dashboard);
