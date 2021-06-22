import className from "classnames";
const TextArea = (props) => {
  const {
    id,
    name,
    isValid,
    type,
    value,
    placeholder,
    onBlur,
    onChange,
    autocomplete,
    disabled,
    rows,
    cols,
  } = props;

  const inputStyle = className(
    "form-area-control",
    `${isValid ? null : "input-error"}`
  );

  return (
    <textarea
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      autoComplete={autocomplete}
      className={inputStyle}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      cols={cols}
    />
  );
};
export default TextArea;
