import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as TitleList from "../utilities/constants/titles";
import * as ROUTER from "../utilities/constants/router";
import ServiceTag from "../components/services/ServiceTag";

const Services = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  function goToPage(path) {
    history.push(path);
  }

  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[4].title));
  }, []);

  return (
    <div className="style-background-container" style={{ height: "85vh" }}>
      <div
        className="col col-5"
        onClick={() =>
          goToPage(`${ROUTER.ROUTE_SERVICES}${ROUTER.ROUTE_WATER_ELECTRIC}`)
        }
      >
        <ServiceTag />
      </div>
    </div>
  );
};
export default React.memo(Services);
