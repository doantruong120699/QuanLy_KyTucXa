const Employee = (props) => {
  const { avatar, name, subject, phone, email } = props;
  return (
    <div className="col col-5 pd-8">
      <div className="col col-full style-smBox">
        <div className="col col-full text-center">
          <div className="style-avatarEmployee">
            <img src={avatar} alt="" width="75" height="75" />
          </div>
          <p className="style-nameEmployee pt-12">{name}</p>
          <p className="style-subject pd-8">{subject}</p>
        </div>
        <div className="col col-full mt-8">
          <p className="style-contactInfo pd-4">
            <i className="fi-sr-smartphone pr-12"></i>
            <span>{phone}</span>
          </p>
          <p className="style-contactInfo pd-4">
            <i className="fi-sr-envelope pr-12"></i>
            <span>{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Employee;
