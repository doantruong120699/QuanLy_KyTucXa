/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImgUrl, getRooms as GetRooms } from "../../redux/actions/checkroom";
import Room from "./Room";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";
import PostFilterForm from "../common/PostFilterForm";
import { getRoom } from "../../utilities/DataRender/checkroom";
import * as ROUTER from "../../utilities/constants/router";
import queryString from "query-string";
import AreaMap from "./AreaMap";
import Annotation from "./Annotation";

const Checkroom = () => {
  const [roomState, setState] = useState(null);

  const history = useHistory();

  const area = useParams();

  const loader = useSelector((state) => state.checkroom.loading);

  const [imgUrl, setImgUrl] = useState(null);

  const [openMap, setOpenMap] = useState(false);

  const setOpen = () => setOpenMap(true);

  const setClose = () => setOpenMap(false);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
    keyword: "",
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

    const params = queryString.stringify(filter);

    const GetAllRooms = () => {
      GetRooms(area.area, params, (output) => {
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

  useEffect(() => {
    getImgUrl(area.area, (output) => {
      if (output) {
        setImgUrl(output.image);
      }
    });
  }, []);

  return (
    <div className="style-background-container" style={{ height: "95vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="col col-full display-flex-space-between">
            <div className="col col-full">
              <PostFilterForm
                onSubmit={handleFilterChange}
                value={filter.keyword}
              />
            </div>
            <div
              className="col map-box"
              onClick={setOpen}
              style={{ cursor: "pointer" }}
            >
              <i className="fi-rr-eye" />
            </div>
          </div>
          <div className="col col-full mb-8">
            <Annotation />
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
                            pendding={room.pendding}
                            typeRoom={room.typeroom.gender}
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
            <AreaMap open={openMap} onClose={setClose} imgUrl={imgUrl} />
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
