import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEmployees } from "../redux/actions/employeePage";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as Titlelist from "../utilities/constants/titles";
import EmployeeTag from "../components/employeePage/EmployeeTag";
const EmployeePage = () => {
  const [employeeListState, setEmployeeList] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchTitleNavigation(Titlelist.NAVIGATION_TITLE[3].title));
    getEmployees((output) => {
      if (output) {
        setEmployeeList(output);
      }
    });
  }, []);
  return (
    <div className="col col-full style-background-container">
      {employeeListState &&
        employeeListState.results.map((employee, index) => {
          return (
            <div key={index} className="col col-5 pd-8">
              <EmployeeTag
                name={employee.first_name + " " + employee.last_name}
                email={employee.email}
                phone={employee.profile.phone}
              />
            </div>
          );
        })}
    </div>
  );
};
export default React.memo(EmployeePage);
