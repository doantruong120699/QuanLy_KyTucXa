import "./InputField.css";
import className from "classnames";
const InputField = (props) => {
  const {
    id,
    name,
    isValid,
    type,
    placeholder,
    onBlur,
    onChange,
    autocomplete,
  } = props;

  const inputStyle = className(
    "form-control",
    `${isValid ? null : "input-error"}`
  );
  
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      autoComplete={autocomplete}
      className={inputStyle}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};
export default InputField;
