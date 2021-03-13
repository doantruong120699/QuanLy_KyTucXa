import className from "classnames";

const Button = (props) => {
  const { type, content, onClick, isDisable } = props;
  const btnStyle = className(
    "btn-custom",
    `${type === "normal-blue" ? "btn-bg-blue" : ""}`,
    `${type === "normal-yellow" ? "btn-bg-yello" : ""}`,
    `${type === "normal-ubg" ? "btn-ubg" : ""}`
  );
  return (
    <button className={btnStyle} onClick={onClick} disabled={isDisable}>
      {content}
    </button>
  );
};
export default Button;
