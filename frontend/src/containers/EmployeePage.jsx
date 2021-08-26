import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/actions/employeePage";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as Titlelist from "../utilities/constants/titles";
import EmployeeTag from "../components/employeePage/EmployeeTag";
import Pagination from "../components/common/Pagination";
import PostFilterForm from "../components/common/PostFilterForm";
import Loader from "../components/common/Loader";

import queryString from "query-string";

const EmployeePage = () => {
  const [employeeListState, setEmployeeList] = useState();

  const dispatch = useDispatch();

  const loader = useSelector((state) => state.employeePage.loading);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    totals: 11,
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

  useEffect(() => {
    let mounted = true;

    const paramsString = queryString.stringify(filter);

    dispatch(actFetchTitleNavigation(Titlelist.NAVIGATION_TITLE[3].title));

    getEmployees(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };
        if (mounted) {
          window.scrollTo(0, 0);
          setEmployeeList(output);
          setPagination(pagination);
        }
      }
    });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div>
      <div
        className="col col-full style-background-container"
        style={{ height: "107vh" }}
      >
        {loader ? (
          <div className="align-item-ct">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="col col-full">
              <PostFilterForm
                onSubmit={handleFilterChange}
                value={filter.keyword}
              />
            </div>
            <div>
              {employeeListState?.results?.map((employee, index) => {
                return (
                  <div key={index} className="col col-5 pd-8">
                    <EmployeeTag
                      avatarUrl={employee.profile.avatar}
                      slug={employee.profile?.public_id}
                      name={employee.first_name + " " + employee.last_name}
                      email={employee.email}
                      phone={employee.profile?.phone}
                    />
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
    </div>
  );
};
export default React.memo(EmployeePage);
