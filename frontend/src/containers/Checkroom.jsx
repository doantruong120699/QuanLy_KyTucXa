/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRooms as GetRooms } from "../redux/actions/checkroom";
import Room from "../components/checkroom/Room";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";
import PostFilterForm from "../components/common/PostFilterForm";
import { getRoom } from "../utilities/DataRender/checkroom";
import * as TitleList from "../utilities/constants/titles";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as ROUTER from "../utilities/constants/router";
import queryString from "query-string";

const Checkroom = () => {
  const [roomState, setState] = useState(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const loader = useSelector((state) => state.checkroom.loading);

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

  function handleFilterChange(newFilters) {
    setFilter({ ...filter, page: 1, keyword: newFilters.searchTerm });
  }

  function gotoPage(path) {
    window.scrollTo(0, 0);
    history.push(path);
  }

  useEffect(() => {
    let mounted = true;

    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[1].title));

    const paramsString = queryString.stringify(filter);

    const GetAllRooms = () => {
      GetRooms(paramsString, (output) => {
        if (output) {
          const pagination = {
            page: output.current_page,
            page_size: output.page_size,
            totals: output.totals,
          };
          if (mounted) {
            window.scrollTo(0, 0);
            setState(getRoom(output));
            setPagination(pagination);
          }
        }
      });
    };
    GetAllRooms();
    return () => (mounted = false);
  }, [filter]);
  return (
    <div className="style-background-container" style={{ height: "85vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <PostFilterForm onSubmit={handleFilterChange} />
          </div>
          <div>
            {roomState &&
              roomState.map((area, index) => {
                return (
                  <div
                    key={index}
                    className="col col-full style-lg-box bg-color-white mb-24"
                  >
                    <p className="bold-text">{area.name}</p>
                    {area.rooms.map((room, i) => {
                      return (
                        <div key={i} className="col col-5 pd-8">
                          <Room
                            name={room.name}
                            maximum={room.typeroom.number_max}
                            numberNow={room.number_now}
                            getDetails={() =>
                              gotoPage(
                                `${ROUTER.ROUTE_CHECKROOM}/detail/${room.slug}`
                              )
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
  );
};
export default Checkroom;
