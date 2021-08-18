import React, { useState } from "react";
import Popup from "reactjs-popup";
import InputField from "../../../../components/common/InputField";
import moment from "moment";
import { openRegistrationTime } from "../../../../redux/actions/humanResource";
import Button from "../../../../components/common/Button";
import { ToastContainer, toast } from "react-toastify";

const OpenRegistration = ({ open, onClose, school_year }) => {
  const [data, setData] = useState({
    stage1_started_at: moment(new Date()).format("YYYY-MM-DD"),
    stage1_ended_at: moment(new Date() + 1).format("YYYY-MM-DD"),
    stage2_started_at: moment(new Date()).format("YYYY-MM-DD"),
    stage2_ended_at: moment(new Date() + 1).format("YYYY-MM-DD"),
    stage3_started_at: moment(new Date()).format("YYYY-MM-DD"),
    stage3_ended_at: moment(new Date() + 1).format("YYYY-MM-DD"),
    semester: 1,
    school_year: 1,
    name: "",
  });
  const semester = [
    {
      id: 1,
      label: "Học kì 1",
    },
    {
      id: 2,
      label: "Học kì 2",
    },
    {
      id: 3,
      label: "Học kì hè",
    },
  ];
  const isValidatedAll = () => {
    if (
      checkValid("stage1_started_at") &&
      checkValid("stage1_ended_at") &&
      checkValid("stage2_started_at") &&
      checkValid("stage2_ended_at") &&
      checkValid("stage3_started_at") &&
      checkValid("stage3_ended_at")
    ) {
      return true;
    } else return false;
  };
  function onChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }
  function checkValid(name, value) {
    switch (name) {
      case "stage1_started_at":
        if (
          moment(data.stage1_started_at).isAfter(
            moment(data.stage1_ended_at)
          ) ||
          moment(data.stage1_started_at).isAfter(
            moment(data.stage2_started_at)
          ) ||
          moment(data.stage1_started_at).isAfter(
            moment(data.stage2_ended_at)
          ) ||
          moment(data.stage1_started_at).isAfter(
            moment(data.stage3_started_at)
          ) ||
          moment(data.stage1_started_at).isAfter(moment(data.stage3_ended_at))
        ) {
          return false;
        }
        break;

      case "stage1_ended_at":
        if (
          moment(data.stage1_ended_at).isBefore(
            moment(data.stage1_started_at)
          ) ||
          moment(data.stage1_ended_at).isAfter(
            moment(data.stage2_started_at)
          ) ||
          moment(data.stage1_ended_at).isAfter(moment(data.stage2_ended_at)) ||
          moment(data.stage1_ended_at).isAfter(
            moment(data.stage3_started_at)
          ) ||
          moment(data.stage1_ended_at).isAfter(moment(data.stage3_ended_at))
        ) {
          return false;
        }
        break;

      case "stage2_started_at":
        if (
          moment(data.stage2_started_at).isBefore(
            moment(data.stage1_ended_at)
          ) ||
          moment(data.stage2_started_at).isBefore(
            moment(data.stage1_started_at)
          ) ||
          moment(data.stage2_started_at).isAfter(
            moment(data.stage2_ended_at)
          ) ||
          moment(data.stage2_started_at).isAfter(
            moment(data.stage3_started_at)
          ) ||
          moment(data.stage2_started_at).isAfter(moment(data.stage3_ended_at))
        ) {
          return false;
        }
        break;

      case "stage2_ended_at":
        if (
          moment(data.stage2_ended_at).isBefore(
            moment(data.stage1_started_at)
          ) ||
          moment(data.stage2_ended_at).isBefore(moment(data.stage1_ended_at)) ||
          moment(data.stage2_ended_at).isAfter(moment(data.stage2_ended_at)) ||
          moment(data.stage2_ended_at).isAfter(
            moment(data.stage3_started_at)
          ) ||
          moment(data.stage2_ended_at).isAfter(moment(data.stage3_ended_at))
        ) {
          return false;
        }
        break;

      case "stage3_started_at":
        if (
          moment(data.stage3_started_at).isBefore(
            moment(data.stage1_ended_at)
          ) ||
          moment(data.stage3_started_at).isBefore(
            moment(data.stage1_started_at)
          ) ||
          moment(data.stage3_started_at).isBefore(
            moment(data.stage2_ended_at)
          ) ||
          moment(data.stage3_started_at).isBefore(
            moment(data.stage2_started_at)
          ) ||
          moment(data.stage3_started_at).isAfter(moment(data.stage3_ended_at))
        ) {
          return false;
        }
        break;

      case "stage3_ended_at":
        if (
          moment(data.stage3_ended_at).isBefore(
            moment(data.stage1_started_at)
          ) ||
          moment(data.stage3_ended_at).isBefore(
            moment(data.stage2_started_at)
          ) ||
          moment(data.stage3_ended_at).isBefore(moment(data.stage2_ended_at)) ||
          moment(data.stage3_ended_at).isBefore(
            moment(data.stage3_started_at)
          ) ||
          moment(data.stage3_ended_at).isBefore(moment(data.stage3_started_at))
        ) {
          return false;
        }
        break;

      default:
        return true;
    }
    return true;
  }
  const onClick = () => {
    console.log("data", data);
    const temp_name = `Đăng ký phòng ${
      semester.find((index) => index.id == data.semester)?.label
    } năm học ${
      school_year.find((index) => index.id == data.school_year)?.label
    }`;
    const dataSend = {
      stage1_started_at: data.stage1_started_at,
      stage1_ended_at: data.stage1_ended_at,
      stage2_started_at: data.stage2_started_at,
      stage2_ended_at: data.stage2_ended_at,
      stage3_started_at: data.stage3_started_at,
      stage3_ended_at: data.stage3_ended_at,
      semester: data.semester,
      school_year: data.school_year,
      name: temp_name,
    };
    console.log("dataSend", dataSend);
    openRegistrationTime(dataSend, (output) => {
      if (output.status === "success") {
        toast("Mở giai đoạn đăng kí thành công!");
        setTimeout(onClose, 4000);
      } else {
        toast(output.notification);
      }
    });
  };
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
        <div className="col modal style-lg-box bg-color-white text-align-ct">
          <div>
            <div>Năm học</div>
            <select
              className="form-control"
              name="school_year"
              value={data.school_year}
              onChange={onChange}
            >
              {school_year.map((index) => {
                return <option value={index.id}>{index.label}</option>;
              })}
            </select>
          </div>
          <div>
            <div>Kì học</div>
            <select
              className="form-control"
              name="semester"
              value={data.semester}
              onChange={onChange}
            >
              {semester.map((index) => {
                return <option value={index.id}>{index.label}</option>;
              })}
            </select>
          </div>
          <div style={{ display: "flex", margin: "20px 0 20px 35px" }}>
            <div style={{ marginTop: "10px" }}>Giai đoạn 1</div>
            <div style={{ marginLeft: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  name="stage1_started_at"
                  isValid={checkValid("stage1_started_at")}
                  value={data.stage1_started_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
              <div>
                <InputField
                  name="stage1_ended_at"
                  isValid={checkValid("stage1_ended_at")}
                  value={data.stage1_ended_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", margin: "20px 0 20px 35px" }}>
            <div style={{ marginTop: "10px" }}>Giai đoạn 2</div>
            <div style={{ marginLeft: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  name="stage2_started_at"
                  isValid={checkValid("stage2_started_at")}
                  value={data.stage2_started_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
              <div>
                <InputField
                  name="stage2_ended_at"
                  isValid={checkValid("stage2_ended_at")}
                  value={data.stage2_ended_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", margin: "20px 0 20px 35px" }}>
            <div style={{ marginTop: "10px" }}>Giai đoạn 3</div>
            <div style={{ marginLeft: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  name="stage3_started_at"
                  isValid={checkValid("stage3_started_at")}
                  value={data.stage3_started_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
              <div>
                <InputField
                  name="stage3_ended_at"
                  isValid={checkValid("stage3_ended_at")}
                  value={data.stage3_ended_at}
                  type={"date"}
                  placeholder={"mm/dd/yyyy"}
                  onChange={onChange}
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
          <div className={`col col-half`}>
            <Button
              type="normal-red"
              content="Đóng"
              onClick={onClose}
              isDisable={false}
            />
          </div>
          {
            <div className="col col-half">
              <Button
                type="normal-blue"
                content="Tạo"
                onClick={onClick}
                isDisable={!isValidatedAll()}
              />
            </div>
          }
          <ToastContainer />
        </div>
      </Popup>
    </div>
  );
};
export default OpenRegistration;
