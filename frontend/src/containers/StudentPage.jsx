import React, { useEffect, useState } from "react";
import { Router, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStudents } from "../redux/actions/studentPage";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as Titlelist from "../utilities/constants/titles";
import * as ROUTER from "../utilities/constants/router";
const StudentPage = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [studentListState, setStudentList] = useState();

  useEffect(() => {
    dispatch(actFetchTitleNavigation(Titlelist.NAVIGATION_TITLE[2].title));
    getStudents((output) => {
      if (output) {
        setStudentList(output);
      }
    });
  }, []);
  return (
    <div className="style-background-container">
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
                      <input
                        type="checkbox"
                        value={student.profile.gender}
                        className="style-gender-checkbox"
                        defaultChecked={student.profile.gender}
                      />
                    </td>
                    <td className="col col-4 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.profile.faculty.name}
                    </td>
                    <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                      {student.profile.my_class.name}
                    </td>
                    <td className="col col-15 text-align-ct bold-text text-20 pl-4 pr-4 pt-16 pb-16">
                      <i
                        className="fi-rr-search-alt"
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
    </div>
  );
};
export default React.memo(StudentPage);
