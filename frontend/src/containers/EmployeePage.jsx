import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEmployees } from "../redux/actions/employeePage";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as Titlelist from "../utilities/constants/titles";
import EmployeeTag from "../components/employeePage/EmployeeTag";
import Pagination from "../components/common/Pagination";
import PostFilterForm from "../components/common/PostFilterForm";
import queryString from "query-string";

const EmployeePage = () => {
  const [employeeListState, setEmployeeList] = useState();

  const dispatch = useDispatch();

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

    dispatch(actFetchTitleNavigation(Titlelist.NAVIGATION_TITLE[3].title));

    getEmployees(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };
        setEmployeeList(output);
        setPagination(pagination);
      }
    });
  }, []);
  return (
    <div>
      <div className="col col-full style-background-container">
        <div className="col col-full">
          <PostFilterForm onSubmit={handleFilterChange} />
        </div>
        <div>
          {employeeListState &&
            employeeListState.results.map((employee, index) => {
              return (
                <div key={index} className="col col-5 pd-8">
                  <EmployeeTag
                    slug={employee.profile.public_id}
                    name={employee.first_name + " " + employee.last_name}
                    email={employee.email}
                    phone={employee.profile.phone}
                  />
                </div>
              );
            })}
        </div>
        <div className="col col-full">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};
export default React.memo(EmployeePage);
