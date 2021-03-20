const Avatar = (props) => {
  return (
    <div className="style-avatar">
      <div className="style-editAvatar">
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <i className="fi-rr-edit"></i>
        </label>
      </div>
    </div>
  );
};
export default Avatar;
