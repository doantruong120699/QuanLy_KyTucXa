const StudyInfo = (props) => {
  const { id, grade, faculty } = props;

  return (
    <div className="col col-full style-lg-box bg-color-white">
      <span className="style-notiTitle">Thông tin học tập</span>
      <div className="col col-full">
        <span className="text-is-bold">Mã số sinh viên: </span>
        <span>{id}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Lớp: </span>
        <span>{grade}</span>
      </div>
      <div className="col col-full">
        <span className="text-is-bold">Ngành: </span>
        <span>{faculty}</span>
      </div>
    </div>
  );
};
export default StudyInfo;
