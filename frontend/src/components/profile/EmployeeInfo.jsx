import React from "react";
import Button from "../common/Button";
import { useHistory } from "react-router-dom";
import * as ROUTER from "../../utilities/constants/router";
const EmployeeInfo = (props) => {
  const { position, username, area } = props;

  const history = useHistory();

  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin công việc</span>
      <div className="col col-full pt-8 pl-16">
        <span>Chức vụ: </span>
        <span>{position}</span>
      </div>
      <div className="col col-full pt-8 pl-16">
        <span>Mã số nhân viên: </span>
        <span>{username}</span>
      </div>
      <div className="col col-full pt-8 pl-16">
        <span>Khu: </span>
        <span>{area}</span>
      </div>
      <div className="col col-third style-detail-btn">
        <Button
          type="normal-ubg"
          content="Xem lịch làm việc"
          isDisable={false}
          onClick={() =>
            history.push(`${ROUTER.ROUTE_MY_PROFILE}${ROUTER.ROUTE_SCHEDULE}`)
          }
        />
      </div>
    </div>
  );
};
export default EmployeeInfo;
