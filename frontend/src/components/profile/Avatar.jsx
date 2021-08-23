import React, { useState } from "react";
import avatar from "../../assets/images/user/default-user.png";
import Button from "../common/Button";
const Avatar = (props) => {
  const { avatarUrl, changeAvatar } = props;
  const [selectedFile, setSelectedFile] = useState({
    imageLink: avatarUrl ? avatarUrl : avatar,
    isDiasble: true,
  });

  function selectFile(event) {
    const file = event.target.files[0];
    if (file) {
      let imageURL = URL.createObjectURL(file);
      setSelectedFile({
        imageLink: imageURL,
        imageFile: file,
        isDiasble: false,
      });
    }
  }

  function save(file) {
    changeAvatar(file);
    setSelectedFile({ ...selectedFile, isDiasble: true });
  }

  return (
    <div className="col style-profile-avatar mt-24">
      <img src={selectedFile.imageLink} alt="avatar" />
      <div className="style-edit-avatar">
        <input
          type="file"
          style={{ display: "none" }}
          id="edit-avatar"
          accept="image/png, image/jpeg"
          onChange={selectFile}
        />
        <label htmlFor="edit-avatar">
          <i className="fi-rr-edit" style={{ cursor: "pointer" }}></i>
        </label>
      </div>
      <div className="col col-full ml-48 mt-8 pl-8">
        <Button
          type="normal-blue"
          content="Save"
          onClick={() => save(selectedFile.imageFile)}
          isDisable={selectedFile.isDiasble}
        />
      </div>
    </div>
  );
};
export default Avatar;
