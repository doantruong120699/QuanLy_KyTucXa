import React, { useState, useEffect } from "react";
import { getEmployees } from "../redux/actions/employeePage";
import EmployeeTag from "../components/employeePage/EmployeeTag";
const EmployeePage = () => {
  const [employeeListState, setEmployeeList] = useState();

  useEffect(() => {
    getEmployees((output) => {
      if (output) {
        console.log(output);
        setEmployeeList(output);
      }
    });
  }, []);
  return (
    <div className="col col-full style-employee-container">
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
