import { useHistory } from "react-router";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import * as route from "../utilities/constants/router";
const Profile = () => {
  var history = useHistory();
  var info = {
    email: "user@gmail.com",
    firstname: "Bean",
    lastname: "MR",
    id: 2,
    group: "sinhvien_group",
    profile: {
      birthday: "20/02/1999",
      address: "60 Ngô Sĩ Liên - Kí túc xá Bách Khoa",
      identifyCard: "123456789",
      gender: "Nam",
      faculty: null,
      position: {
        id: 5,
        name: "Trưởng khu",
      },
      area: {
        id: 8,
        name: "C",
      },
    },
  };

  var user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="style-myProfile-container">
      <div className="col col-full">
        <div className="col col-third align-items-center pr-16">
          <Avatar />
        </div>
        <div>
          <SummaryInfo
            username={user.username}
            firstname={user.first_name}
            address={info.profile.address}
            email={info.email}
            birthday={info.profile.birthday}
            gender={info.profile.gender}
            identifyCard={info.profile.identifyCard}
            onClick={() => history.push(route.ROUTE_FORGOT_PASSWORD)}
          />
        </div>
      </div>
      {info.profile.faculty !== null ? (
        <div className=" col col-full pt-24">
          <div className="col col-half pt-24 pr-12">
            <div className="col col-full pd-24 style-summaryInfo">
              <div className="col col-full">
                <span className="style-notiTitle">Phòng thuê</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-building"></i>
                <span>Khu </span>
                <span>A</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-home"></i>
                <span>Phòng </span>
                <span>A102</span>
              </div>
            </div>
          </div>
          <div className="col col-half pt-24 pl-12">
            <div className="col col-full pd-24 style-summaryInfo">
              <div className="col col-full">
                <span className="style-notiTitle">Thông tin học tập</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-backpack"></i>
                <span>Lớp </span>
                <span>17T1</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-star"></i>
                <span>{info.profile.faculty.name}</span>
              </div>
              <div className="col col-full mt-8">
                <i className="fi-rr-school"></i>
                <span>Trường ĐHBK</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col col-full pt-48">
          <div className="col col-full style-summaryInfo">
            <div className="col col-full">
              <span className="style-notiTitle">Thông tin làm việc</span>
            </div>
            <div className="col col-full mt-8">
              <i className="fi-rr-star"></i>
              <span>Chức vụ {info.profile.position.name}</span>
            </div>
            <div className="col col-full mt-8">
              <i className="fi-rr-building"></i>
              <span>Khu </span>
              <span>A</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
