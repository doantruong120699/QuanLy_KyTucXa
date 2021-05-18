import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailedStudent } from "../../redux/actions/studentPage";
import avatar from "../../assets/images/user/default-user.png";
import moment from "moment";

const DetailStudent = () => {
  const { studentID } = useParams();

  const [studentState, setStudent] = useState();

  useEffect(() => {
    getDetailedStudent(studentID, (output) => {
      if (output) {
        setStudent(output);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="style-background-container">
      {studentState && (
        <div>
          <div className="col col-third justify-content-ct">
            <div className="col style-profile-avatar mt-16">
              <img src={avatar} alt="avatar" />
            </div>
          </div>
          <div className="col col-two-third style-lg-box bg-color-white">
            <div className="col col-full align-item-ct">
              <div className="col col-half pl-16">
                <h2 className="pt-8 pb-8">Thông tin sinh viên</h2>
                <div className="col col-full">
                  <span className="text-is-purple-gradient style-profile-name">
                    {studentState.first_name} {studentState.last_name}
                  </span>
                </div>
                <div className="col col-full mt-8">
                  <i className="fi-rr-heart pr-16"></i>
                  <span>
                    {studentState.profile.gender === true ? "Nam" : "Nữ"}
                  </span>
                </div>
                <div className="col col-full mt-8">
                  <i className="fi-rr-marker pr-16"></i>
                  <span>{studentState.profile.address}</span>
                </div>
                <div className="col col-full mt-8">
                  <i className="fi-rr-envelope pr-16"></i>
                  <span>{studentState.email}</span>
                </div>
                <div className="col col-full mt-8">
                  <i className="fi-rr-bold pr-16"></i>
                  <span>
                    {moment(new Date(studentState.profile.birthday)).format(
                      "DD-MM-YYYY"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-full style-lg-box bg-color-white style-profile-room mt-48 pd-24">
            <h2 className="">Thông tin công việc</h2>
            <div className="col col-full pt-8">
              <span className="text-is-bold">Mã số sinh viên: </span>
              <span>{studentState.username}</span>
            </div>
            <div className="col col-full pt-8">
              <span className="text-is-bold">Lớp: </span>
              <span>{studentState.profile.my_class.name}</span>
            </div>
            <div className="col col-full pt-8">
              <span className="text-is-bold">Khoa: </span>
              <span>{studentState.profile.faculty.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailStudent;
