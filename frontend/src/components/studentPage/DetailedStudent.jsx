import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailedStudent } from "../../redux/actions/studentPage";
import avatar from "../../assets/images/user/default-user.png";

const DetailStudent = () => {
  const { studentID } = useParams();

  const [studentState, setStudent] = useState();

  useEffect(() => {
    getDetailedStudent(studentID, (output) => {
      if (output) {
        setStudent(output);
      }
    });
  }, []);
  return (
    <div className="style-background-container">
      {studentState && (
        <div className="col col-full style-lg-box bg-color-white">
          {console.log(studentState)}
          <h2 className="pd-16">Thông tin sinh viên</h2>
          <div className="col col-full align-item-ct">
            <div className="col col-third justify-content-ct">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="col col-two-third pl-16">
              <div className="col col-full ml-8">
                <span className="text-is-purple-gradient style-profile-name">
                  {studentState.first_name} {studentState.last_name}
                </span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-heart pr-16"></i>
                <span>{studentState.profile.gender ? "Nam" : "Nữ"}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-marker pr-16"></i>
                <span>{}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-envelope pr-16"></i>
                <span>{}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-bold pr-16"></i>
                <span>{}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-smartphone pr-16"></i>
                <span>{}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-fingerprint pr-16"></i>
                <span>{}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailStudent;
