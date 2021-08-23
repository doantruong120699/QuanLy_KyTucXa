import React from "react";
const Annotation = () => {
  return (
    <div className="col col-full display-flex-space-between">
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#37c6f7" }}
        ></div>
        <p className="col">Phòng nam</p>
      </div>
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#f775f4" }}
        ></div>
        <p className="col">Phòng nữ</p>
      </div>
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#f7cb73" }}
        ></div>
        <p className="col">Phòng SH chung</p>
      </div>
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#09bd3d" }}
        >
          <i className="fi-sr-user text-is-white" />
        </div>
        <p className="col">Giường trống</p>
      </div>
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#ffaa2b" }}
        >
          <i className="fi-sr-user text-is-white" />
        </div>
        <p className="col">Đang chờ</p>
      </div>
      <div className="col align-item-ct">
        <div
          className="col style-room-bed"
          style={{ backgroundColor: "#fd5353" }}
        >
          <i className="fi-sr-user text-is-white" />
        </div>
        <p className="col">Giường đã SD</p>
      </div>
    </div>
  );
};
export default Annotation;
