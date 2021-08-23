import React from "react";
import Popup from "reactjs-popup";
import Button from "../common/Button";

const AreaMap = (props) => {
  const { open, onClose, imgUrl } = props;

  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div>
        <div className="col area-map-box bg-color-white text-align-ct">
          <img src={imgUrl} alt="map" />
          <div className="col col-full">
            <Button type="normal-red" content="Đóng" onClick={onClose} />
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default AreaMap;
