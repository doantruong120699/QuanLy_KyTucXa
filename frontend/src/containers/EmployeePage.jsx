import React from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import avatar from "../assets/images/user/default-avatar.png";
import { employees } from "../components/employees/Data";
import Employee from "../components/employees/Employee";
const EmployeePage = () => {
  return (
    <div className="style-background">
      <div>
        <div className="col col-half">
          <div className="col col-two-third pd-8">
            <InputField
              name="searchInput"
              type="text"
              isValid={true}
              placeholder="Tìm nhân viên"
              autocomplete="off"
            />
          </div>
          <div className="col col-third pd-8">
            <Button type="normal-blue" content="Tìm kiếm" isDisable={false} />
          </div>
        </div>
      </div>
      <div className="col col-full style-box style-employeesBox mt-16">
        {employees.map((employee, index) => {
          return (
            <Employee
              key={index}
              name={employee.name}
              avatar={avatar}
              subject={employee.subject}
              phone={employee.phone}
              email={employee.email}
            />
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(EmployeePage);
