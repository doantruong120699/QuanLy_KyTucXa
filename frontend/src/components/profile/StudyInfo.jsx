const StudyInfo = (props) => {
  const { mssv, className, position, faculty } = props;
  return (
    <div className="col col-full style-lg-box bg-color-white">
      <span className="style-notiTitle">Thông tin học tập</span>
      <div className="col col-full">
        <span className="text-is-bold">Chức vụ: </span>
        <span>{position}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Mã số sinh viên: </span>
        <span>{mssv}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Lớp: </span>
        <span>{className}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Ngành: </span>
        <span>{faculty}</span>
      </div>
    </div>
  );
};
export default StudyInfo;
