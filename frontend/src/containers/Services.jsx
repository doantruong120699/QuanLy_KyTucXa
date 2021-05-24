import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as TitleList from "../utilities/constants/titles";

const Services = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[4].title));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="style-background-container">
      <h2 className="bold-text text-24">
        Hiện tại chưa có dịch vụ để đăng kí @_@
      </h2>
    </div>
  );
};
export default React.memo(Services);
