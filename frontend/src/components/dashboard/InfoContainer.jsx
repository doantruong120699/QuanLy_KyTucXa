const InfoContainer = (props) => {
  const { number, title, iconStyle, color, increasedPercent } = props;
  return (
    <div
      className="style-infoContainer style-lg-box"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="style-valueInfo">
        <p className="style-numberInfo">{number}</p>
        <p className="style-titleInfo">{title}</p>
        {increasedPercent !== null && (
          <p className="style-increasedPercent">
            Thêm tháng này: {increasedPercent}
          </p>
        )}
      </div>
      <div className="style-iconInfo">
        <i className={iconStyle} />
      </div>
    </div>
  );
};
export default InfoContainer;
