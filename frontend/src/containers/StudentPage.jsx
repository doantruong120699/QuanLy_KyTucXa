import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStudents } from "../redux/actions/studentPage";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as Titlelist from "../utilities/constants/titles";
import * as ROUTER from "../utilities/constants/router";
import Pagination from "../components/common/Pagination";
import PostFilterForm from "../components/common/PostFilterForm";
import queryString from "query-string";

const StudentPage = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [studentListState, setStudentList] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    totals: 11,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleFilterChange(newFilters) {
    setFilter({ ...filter, page: 1, title_like: newFilters.searchTerm });
  }

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    dispatch(actFetchTitleNavigation(Titlelist.NAVIGATION_TITLE[2].title));

    getStudents(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };
        setStudentList(output);
        setPagination(pagination);
      }
    });
  }, []);
  return (
    <div className="style-background-container">
      <div className="col col-full">
        <PostFilterForm onSubmit={handleFilterChange} />
      </div>
      {studentListState && (
        <div>
          <table className="col col-full style-lg-box bg-color-white">
            <thead className="col col-full">
              <tr className="col col-full">
                <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                  STT
                </th>
                <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                  Họ
                </th>
                <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                  Tên
                </th>
                <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                  Giới tính
                </th>
                <th className="col col-4 bold-text pl-4 pr-4 pt-16 pb-16">
                  Khoa
                </th>
                <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                  Lớp
                </th>
                <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {studentListState.results.map((student, index) => {
                return (
                  <tr key={index} className="col col-full style-tr-hightlight">
                    <td className="col col-15 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      #{index + 1}
                    </td>
                    <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.last_name}
                    </td>
                    <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.first_name}
                    </td>
                    <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.profile.gender ? "Nam" : "Nữ"}
                    </td>
                    <td className="col col-4 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.profile.faculty.name}
                    </td>
                    <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.profile.my_class.name}
                    </td>
                    <td className="col col-15 text-align-ct bold-text text-20 pl-4 pr-4 pt-16 pb-16">
                      <i
                        className="fi-rr-search-alt icon-white-active"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(
                            `${ROUTER.ROUTE_STUDENTS}${ROUTER.ROUTE_DETAILED_STUDENTS}/${student.profile.public_id}`
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="col col-full">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
export default React.memo(StudentPage);
