
const InfoContainer = (props) => {
  const { number, title, iconStyle, color, increasedPercent } = props;
  return (
    <div
      className="style-infoContainer"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="style-valueInfo">
        <p className="style-numberInfo">{number}</p>
        <p className="style-titleInfo">Total {title}</p>
        <p className="style-increasedPercent">
          {increasedPercent}% than last month
        </p>
      </div>
      <div className="style-iconInfo">
        <i class={iconStyle} />
      </div>
    </div>
  );
};
export default InfoContainer;